import { gql, useQuery } from '@apollo/client';
import { faArrowLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
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
import { meQuery_me_subsriptions } from '../__generated__/meQuery';

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
        {isSubscription(podcast.id, userInfo?.me?.subsriptions ?? []) ? (
          <button className="text-xs rounded-full border border-pink-500 px-3 py-1 mt-2 text-gray-800 shadow">
            subscribe +
          </button>
        ) : (
          <button className="text-xs rounded-full bg-pink-500 px-3 py-1 mt-2 text-white shadow">
            unsubscribe -
          </button>
        )}
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
          return (
            <div
              key={episode.id}
              className="relative rounded-md border-b border-gray-300 py-4"
            >
              <h4 className="font-light">{episode.title}</h4>
              <h5 className="text-xs text-gray-500">
                {episode.category} &middot; {getTimeAgo(episode.createdAt)}
              </h5>
              <button className="absolute right-2 top-5 focus:outline-none text-white rounded-full w-8 h-8 text-center flex justify-center items-center bg-pink-500 focus:bg-yellow-500 shadow-md transform scale-75">
                <FontAwesomeIcon icon={faPlay} className="text-xs" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div>podcast info is not exist</div>
  );
};

const isSubscription = (
  subscriptionId: number,
  subscriptions: meQuery_me_subsriptions[]
) => {
  return !!subscriptions.find((podcast) => podcast?.id === subscriptionId);
};
