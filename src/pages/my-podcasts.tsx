import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { MyPodcastBox } from '../components/my-podcast-box';
import { WHOLE_PODCAST_FRAGMENT } from '../fragment';
import { getTimeAgo } from '../util';
import { GetAllMyPodcastQuery } from '../__generated__/GetAllMyPodcastQuery';

const MYPODCAST = gql`
  query GetAllMyPodcastQuery {
    getAllMyPodcasts {
      ok
      error
      podcasts {
        ...WholePodcastPart
      }
    }
  }
  ${WHOLE_PODCAST_FRAGMENT}
`;
export const MyPodcasts = () => {
  const { data } = useQuery<GetAllMyPodcastQuery>(MYPODCAST);
  return (
    <div className="container flex justify-center items-start mt-4 h-screen">
      <div className="rounded-xl max-w-screen-md w-10/12 bg-blue-100 px-5 py-3 box-content shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-600 text-center font-medium pt-3">
            My Podcasts
          </h2>
          <Link to="/create-podcast" className="button">
            Create podcast
          </Link>
        </div>
        <div className="mt-5">
          {data?.getAllMyPodcasts?.podcasts?.map((podcast) => (
            <Link
              to={`/podcast/${podcast.id}`}
              className="block rounded-md bg-white pb-3 pt-1 px-4 mb-3 hover:bg-purple-50 transition-colors"
            >
              <MyPodcastBox key={podcast.id} podcast={podcast} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
