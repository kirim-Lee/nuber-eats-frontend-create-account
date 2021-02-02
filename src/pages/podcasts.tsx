import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/error';
import { Loading } from '../components/loading';
import { PODCAST_FRAGMENT } from '../fragment';
import {
  allPodcastQuery,
  allPodcastQuery_getAllPodcasts_podcasts,
} from '../__generated__/allPodcastQuery';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Stars } from '../components/start';
import { getTimeAgo } from '../util';

const ALL_PODCASTS = gql`
  query allPodcastQuery {
    getAllPodcasts {
      ok
      error
      podcasts {
        ...PodcastPart
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

type Podcast = allPodcastQuery_getAllPodcasts_podcasts;

export const Podcasts = () => {
  const { data, error, loading } = useQuery<allPodcastQuery>(ALL_PODCASTS);

  if (loading) {
    return <Loading />;
  }

  if (error?.message) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-100 via-pink-300 to-yellow-400 ">
      <h1 className="text-4xl p-5 font-medium">
        Podcasts <FontAwesomeIcon icon={faMeteor} className="text-yellow-600" />
      </h1>
      <div className="text-right px-4 relative -top-12 text-xs">
        <div className="float-right bg-white py-1 px-2 rounded-md shadow-xl opacity-80">
          of{' '}
          <span className="text-sm">
            {data?.getAllPodcasts.podcasts?.length}{' '}
          </span>
        </div>
      </div>
      <div className="overflow-y-auto">
        {data?.getAllPodcasts.podcasts?.map((podcast: Podcast) => {
          return <PodcastCard podcast={podcast} key={podcast.id} />;
        })}
      </div>
    </div>
  );
};

interface IPodcastCard {
  podcast: Podcast;
}
const PodcastCard: React.FC<IPodcastCard> = ({ podcast }) => (
  <Link
    key={podcast.id}
    to={`/podcast/${podcast.id}`}
    className="mx-5 my-2 py-3 px-5 bg-white rounded-md shadow-md opacity-80 hover:opacity-100 transition-opacity block"
  >
    <div>
      <h4 className="text-xl font-light pb-2 mb-2 border-b border-gray-200">
        {podcast.title}
      </h4>
      <div className="opacity-70 text-xs">
        <span className="text-red-400">{podcast.category}</span> &middot;{' '}
        <span>{podcast.creator.email}</span> &middot;{' '}
        <span>{getTimeAgo(podcast.updatedAt)}</span>
      </div>
      <div>
        <Stars rating={podcast.rating} />
      </div>
    </div>
  </Link>
);
