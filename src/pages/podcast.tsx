import { gql, useQuery } from '@apollo/client';
import { faArrowLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/error';
import { Loading } from '../components/loading';
import { Stars } from '../components/start';
import { PODCAST_FRAGMENT } from '../fragment';
import { useUserInfo } from '../hooks/useUserInfo';
import { getTimeAgo } from '../util';
import {
  PodcastQuery,
  PodcastQueryVariables,
  PodcastQuery_getPodcast_podcast,
} from '../__generated__/PodcastQuery';
import { SubscriptionButton } from '../components/subscription-button';
import { Episode } from '../components/episode';

const PODCAST = gql`
  query PodcastQuery($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        ...PodcastPart
        episodes {
          id
          title
          category
          createdAt
        }
        reviews {
          id
          title
          text
          creator {
            email
          }
        }
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

type ParamType = {
  id: string;
};

type PodcastType = PodcastQuery_getPodcast_podcast | null;

export const Podcast = () => {
  const { data: userInfo } = useUserInfo();
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const { data, loading, error } = useQuery<
    PodcastQuery,
    PodcastQueryVariables
  >(PODCAST, {
    variables: { input: { id: Number(id) } },
  });

  if (loading) {
    return <Loading />;
  }

  if (error?.message) {
    return <ErrorMessage message={error.message} />;
  }

  const podcast: PodcastType = data?.getPodcast?.podcast ?? null;

  const recentReview = data?.getPodcast.podcast?.reviews?.reverse()[0];

  return podcast ? (
    <div className="h-screen flex flex-col bg-gradient-to-bl from-pink-200 via-gray-100 to-gray-100">
      <div className="text-left px-2">
        <button onClick={history.goBack} className="p-2">
          <FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" />
        </button>
      </div>

      <div className="p-5 ">
        <h1 className="text-2xl font-light">{podcast.title}</h1>
        <p className="opacity-70 text-xs pt-1">
          <span className="text-indigo-500">{podcast.category}</span> &middot;{' '}
          {podcast.creator.email} &middot; {getTimeAgo(podcast.updatedAt)}
        </p>
        <p>
          <Stars rating={podcast.rating} />
        </p>
        <SubscriptionButton podcastId={podcast.id} />
      </div>
      <div className="border-b border-gray-800 opacity-20 mx-5" />

      {recentReview ? (
        <p className="p-5 text-sm font-light text-gray-800">
          {recentReview?.text} ...
          <span className="text-xs text-gray-600">
            by {recentReview?.creator?.email}
          </span>
        </p>
      ) : (
        <p className="text-center text-sm p-10 text-gray-600 font-light">
          no reviews...
        </p>
      )}

      <div className="border-b border-gray-800 opacity-20 mx-5" />

      <div className="overflow-y-auto mx-5 py-5 px-2">
        <h4 className="text-sm text-gray-600">
          <span className="text-pink-500 ">{podcast.episodes.length}</span>{' '}
          <span className="text-xs">episodes...</span>
        </h4>
        {podcast.episodes.map((episode) => {
          return <Episode key={episode.id} episode={episode} />;
        })}
      </div>
    </div>
  ) : (
    <div>podcast info is not exist</div>
  );
};
