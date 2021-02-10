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
import { MyPodcastBox } from '../components/my-podcast-box';

const ALL_PODCASTS = gql`
  query allPodcastQuery {
    getAllPodcasts {
      ok
      error
      podcasts {
        ...PodcastPart
        creator {
          email
        }
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
      <div className="overflow-y-auto px-5 py-3 rounded bg-rose-100 bg-opacity-50 mx-2">
        {data?.getAllPodcasts.podcasts?.map((podcast: Podcast) => {
          return (
            <Link
              to={`/podcast/${podcast.id}`}
              className="block border-b py-2 border-red-300"
              key={podcast.id}
            >
              <MyPodcastBox podcast={podcast} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
