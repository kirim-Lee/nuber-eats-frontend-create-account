import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/error';
import { Loading } from '../components/loading';
import { PODCAST_FRAGMENT } from '../fragment';
import {
  allPodcastQuery,
  allPodcastQuery_getAllPodcasts_podcasts,
} from '../__generated__/allPodcastQuery';

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

const getTimeAgo = (date: string) => {
  const now = new Date().getTime();
  const from = new Date(date).getTime();
  const diff = (now - from) / 1000;
  const day = 24 * 60 * 60;
  const hour = 60 * 60;
  const minute = 60;

  if (diff > day) {
    const days = Math.ceil(diff / day);
    return days > 7 ? 'more 7 days ago' : Math.ceil(diff / day) + 'days ago';
  } else if (diff > hour) {
    return Math.ceil(diff / hour) + 'hours ago';
  } else if (diff > minute) {
    return Math.ceil(diff / minute) + 'minutes ago';
  } else {
    return 'few second ago';
  }
};

export const Podcasts = () => {
  const { data, error, loading } = useQuery<allPodcastQuery>(ALL_PODCASTS);

  if (loading) {
    return <Loading />;
  }

  if (error?.message) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      <h1>podcasts</h1>
      {data?.getAllPodcasts.podcasts?.length}
      {data?.getAllPodcasts.podcasts?.map((podcast: Podcast) => {
        return (
          <Link key={podcast.id} to={`/podcast/${podcast.id}`}>
            <div>
              <h4>{podcast.title}</h4>
              <h5>{getTimeAgo(podcast.updatedAt)}</h5>
              <h5>rating: {podcast.rating}</h5>
              <h5>category: {podcast.category}</h5>
              <h5>{podcast.creator.email}</h5>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
