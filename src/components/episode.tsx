import { gql, useMutation } from '@apollo/client';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useUserInfo } from '../hooks/useUserInfo';
import { getTimeAgo } from '../util';
import {
  MarkEpisodePlayed,
  MarkEpisodePlayedVariables,
} from '../__generated__/MarkEpisodePlayed';
import { meQuery_me_playedEpisodes } from '../__generated__/meQuery';
import { PodcastQuery_getPodcast_podcast_episodes } from '../__generated__/PodcastQuery';
import { EditEpisode } from './edit-episode';

interface IProps {
  episode: PodcastQuery_getPodcast_podcast_episodes;
  podcastId: string;
  edit?: boolean;
}

const MARK_EPISODE_PLAYED = gql`
  mutation MarkEpisodePlayed($input: MarkEpisodeAsPlayedInput!) {
    markEpisodeAsPlayed(input: $input) {
      ok
    }
  }
`;

interface IAudio {
  duration: number;
  currentTime: number;
}

const InitialAudio: IAudio = { duration: 0, currentTime: 0 };

export const Episode = ({ episode, edit, podcastId }: IProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [audioInfo, setAudioInfo] = useState<IAudio>(InitialAudio);

  const { data: userInfo } = useUserInfo();
  const [marked, setMarked] = useState(
    isMarked(episode.id, userInfo?.me?.playedEpisodes)
  );

  const onCompleted = (res: MarkEpisodePlayed) => {
    if (res.markEpisodeAsPlayed.ok) {
      setMarked(true);
    }
  };

  const [markPlayed, { loading }] = useMutation<
    MarkEpisodePlayed,
    MarkEpisodePlayedVariables
  >(MARK_EPISODE_PLAYED, { onCompleted });

  const handleClickPlayButton = () => {
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      const newAudio = new Audio(episode.file);

      setAudio(newAudio);
      setAudioInfo({ currentTime: 0, duration: newAudio.duration });
      newAudio.play();
    }

    if (!edit) {
      // just listener
      markPlayed({ variables: { input: { id: episode.id } } });
    }
  };

  useEffect(() => {
    const timeUpdateEvent = () => {
      setAudioInfo({
        currentTime: audio?.currentTime ?? 0,
        duration: audio?.duration ?? 0,
      });
    };
    if (audio) {
      audio.addEventListener('timeupdate', timeUpdateEvent);
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('timeupdate', timeUpdateEvent);
      }
    };
  }, [audio]);

  return (
    <div
      key={episode.id}
      className={`relative rounded-md border-b border-gray-300 py-4 ${
        marked ? 'opacity-70' : ''
      }`}
    >
      <h4 className="font-light">{episode.title}</h4>
      <h5 className="text-xs text-gray-500">
        {episode.category} &middot; {getTimeAgo(episode.createdAt)}
      </h5>
      {marked && <p className="text-gray-400 text-xs">you had played..</p>}
      <button
        className="absolute right-2 top-5 focus:outline-none text-white rounded-full w-8 h-8 text-center flex justify-center items-center bg-pink-500 focus:bg-yellow-500 shadow-md transform scale-75"
        onClick={handleClickPlayButton}
        disabled={loading}
      >
        {audio && audio.paused ? (
          <FontAwesomeIcon icon={faPause} className="text-xs" />
        ) : (
          <FontAwesomeIcon icon={faPlay} className="text-xs" />
        )}
      </button>
      {audio && (
        <div className="mt-2">
          <div className="pt-1 rounded-full bg-gray-400 relative">
            <span
              className="pt-1 absolute left-0 top-0 bg-pink-400 rounded-full"
              style={{ width: `${getAudioPlayed(audioInfo)}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">
            <span className="text-pink-400">
              {getPlayTime(audioInfo.currentTime)}
            </span>{' '}
            / {getPlayTime(audioInfo.duration)}
          </span>
        </div>
      )}
      {edit && (
        <EditEpisode episodeId={episode.id} podcastId={Number(podcastId)} />
      )}
    </div>
  );
};

const getAudioPlayed = ({ duration, currentTime }: IAudio): number => {
  if (!currentTime || !duration) {
    return 0;
  }

  return Number((currentTime / duration).toFixed(2)) * 100;
};

const getPlayTime = (duration: number): string => {
  const second = Math.ceil(duration);
  const min = Math.floor(second / 60);

  return !duration
    ? '0 sec'
    : `${min ? `${min} min` : ''} ${second - min * 60} sec`;
};

const isMarked = (
  episodeId: number,
  episodes: meQuery_me_playedEpisodes[] | undefined
) => {
  return !!(episodes || []).find((episode) => episode?.id === episodeId);
};
