import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/error';
import { Loading } from '../components/loading';
import { PODCAST_FRAGMENT } from '../fragment';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { MyPodcastBox } from '../components/my-podcast-box';
import { Category, SearchPodcastsInput } from '../__generated__/globalTypes';

import {
  allPodcastQuery,
  allPodcastQuery_getAllPodcasts_podcasts,
  allPodcastQuery_subscriptions,
} from '../__generated__/allPodcastQuery';
import {
  searchPodcastsQuery,
  searchPodcastsQueryVariables,
} from '../__generated__/searchPodcastsQuery';
import { useForm } from 'react-hook-form';

export const ALL_PODCASTS = gql`
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

    subscriptions {
      ...PodcastPart
    }
  }

  ${PODCAST_FRAGMENT}
`;

const SEARCH_PODCASTS = gql`
  query searchPodcastsQuery($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
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

type SearchType = { search: string };

export const Podcasts = () => {
  const { data, error, loading } = useQuery<allPodcastQuery>(ALL_PODCASTS);
  const [searchPodcast, { data: searchData }] = useLazyQuery<
    searchPodcastsQuery,
    searchPodcastsQueryVariables
  >(SEARCH_PODCASTS);

  const [selected, setSelected] = useState<Category>(null);

  const { register, handleSubmit, getValues } = useForm<SearchType>({
    mode: 'onChange',
  });

  const handleSelected = (category: Category) => () => {
    let input: SearchPodcastsInput = { titleQuery: getValues().search };

    if (category === selected) {
      setSelected(null);
    } else {
      setSelected(category);
      input.category = category;
    }

    searchPodcast({ variables: { input } });
  };

  const onSubmit = (data: SearchType) => {
    if (data.search) {
      searchPodcast({
        variables: { input: { titleQuery: data.search, category: selected } },
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error?.message) {
    return <ErrorMessage message={error.message} />;
  }

  const displayDatas =
    !selected && !getValues().search
      ? data?.getAllPodcasts?.podcasts
      : searchData?.searchPodcasts?.podcasts;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-pink-300 to-yellow-400 pb-2">
      <h1 className="text-4xl p-5 font-medium">
        Podcasts <FontAwesomeIcon icon={faMeteor} className="text-yellow-600" />
      </h1>
      <div className="text-right px-4 relative -mt-12 text-xs">
        <div className="float-right bg-white py-1 px-2 rounded-md shadow-xl opacity-80">
          of <span className="text-sm">{displayDatas?.length} </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gird-flow-col grid-cols-4 gap-2 w-full mt-4 px-3"
      >
        <input
          type="text"
          className="rounded-full bg-white py-1 px-4 focus:outline-none col-span-3 w-full"
          placeholder="search title"
          ref={register}
          name="search"
        />
        <button className="rounded-full bg-black text-white py-1 px-3 col-span-1 text-sm focus:outline-none focus:bg-rose-300">
          search
        </button>
      </form>

      <div className="px-3 mb-3 mt-4">
        <h3 className="text-md font-thin">Categories</h3>
        {Object.values(Category).map((category) => (
          <button
            className={`${
              selected === category
                ? 'bg-red-400 text-white'
                : 'border border-red-400'
            } py-1 px-3 rounded-full text-xs font-mono focus:outline-none mx-1`}
            key={category}
            onClick={handleSelected(category)}
          >
            {category.toLowerCase()}
          </button>
        ))}
      </div>
      <div className="mb-3 rounded-md py-2 px-3 mx-2 border border-rose-200 ">
        <h3 className="text-md font-thin mb-2">My Subscriptions</h3>
        <div className="pb-1">
          {data?.subscriptions?.map(
            (podcast: allPodcastQuery_subscriptions) => {
              return (
                <Link
                  to={`/podcast/${podcast.id}`}
                  className="block py-2 px-3 bg-white bg-opacity-40 rounded-md my-1"
                  key={podcast.id}
                >
                  <MyPodcastBox podcast={podcast} />
                </Link>
              );
            }
          )}
        </div>
      </div>
      <div className="px-5 py-3 rounded bg-rose-100 bg-opacity-50 mx-2">
        {displayDatas?.map((podcast: Podcast) => {
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
        {!displayDatas?.length ? (
          <div className="py-8 text-sm font-thin text-violet-700 text-center">
            no contents here!
          </div>
        ) : null}
      </div>
    </div>
  );
};
