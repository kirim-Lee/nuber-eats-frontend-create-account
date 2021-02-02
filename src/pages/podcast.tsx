import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/error';
import { Loading } from '../components/loading';
import { PODCAST_FRAGMENT } from '../fragment';
import {
  PodcastQuery,
  PodcastQueryVariables,
  PodcastQuery_getPodcast_podcast,
} from '../__generated__/PodcastQuery';

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

  const podcast: PodcastType = useMemo(() => {
    return data?.getPodcast.podcast ?? null;
  }, [data]);

  const recentReview = useMemo(() => {
    return data?.getPodcast.podcast?.reviews?.reverse()[0];
  }, [data?.getPodcast.podcast?.reviews]);

  return podcast ? (
    <div>
      <h1>{podcast.title}</h1>
      <p>{podcast.creator.email}</p>
      <p>{podcast.rating}</p>
      <button>subscribe</button>
      {recentReview?.text}
      {podcast.episodes.map((episode) => {
        return (
          <div key={episode.id}>
            <h4>{episode.title}</h4>
            <h5>{episode.category}</h5>
          </div>
        );
      })}
    </div>
  ) : (
    <div>podcast info is not exist</div>
  );
};
