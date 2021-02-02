import { gql, useMutation } from '@apollo/client';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useUserInfo } from '../hooks/useUserInfo';
import { getTimeAgo } from '../util';
import {
  MarkEpisodePlayed,
  MarkEpisodePlayedVariables,
} from '../__generated__/MarkEpisodePlayed';
import { meQuery_me_playedEpisodes } from '../__generated__/meQuery';
import { PodcastQuery_getPodcast_podcast_episodes } from '../__generated__/PodcastQuery';

interface IProps {
  episode: PodcastQuery_getPodcast_podcast_episodes;
}

const MARK_EPISODE_PLAYED = gql`
  mutation MarkEpisodePlayed($input: MarkEpisodeAsPlayedInput!) {
    markEpisodeAsPlayed(input: $input) {
      ok
    }
  }
`;

export const Episode = ({ episode }: IProps) => {
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

  const handleMark = () => {
    markPlayed({ variables: { input: { id: episode.id } } });
  };

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
        onClick={handleMark}
        disabled={marked || loading}
      >
        <FontAwesomeIcon icon={faPlay} className="text-xs" />
      </button>
    </div>
  );
};

const isMarked = (
  episodeId: number,
  episodes: meQuery_me_playedEpisodes[] | undefined
) => {
  return !!(episodes || []).find((episode) => episode?.id === episodeId);
};
