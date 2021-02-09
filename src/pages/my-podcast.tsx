import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Episode } from '../components/episode';
import { MyPodcastBox } from '../components/my-podcast-box';
import { WHOLE_PODCAST_FRAGMENT } from '../fragment';
import {
  MyPodcastQuery,
  MyPodcastQueryVariables,
} from '../__generated__/MyPodcastQuery';
import { Review } from '../components/review';

export const MYPODCAST_QUERY = gql`
  query MyPodcastQuery($input: MyPodcastInput!) {
    myPodcast(input: $input) {
      ok
      error
      podcast {
        ...WholePodcastPart
        subscribers {
          email
        }
      }
    }
  }
  ${WHOLE_PODCAST_FRAGMENT}
`;

type ParamType = {
  id: string;
};
export const MyPodcast = () => {
  const { id } = useParams<ParamType>();
  const { data } = useQuery<MyPodcastQuery, MyPodcastQueryVariables>(
    MYPODCAST_QUERY,
    {
      variables: { input: { id: Number(id) } },
    }
  );

  const podcast = data?.myPodcast?.podcast;
  return (
    <div className="container flex justify-center items-start mt-4 h-screen">
      <div className="rounded-xl max-w-screen-md w-10/12 bg-blue-100 px-5 py-3 box-content shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-600 text-center font-medium pt-3">
            My Podcast
          </h2>
        </div>
        {podcast && (
          <>
            <MyPodcastBox podcast={podcast} edit={true} />
            <div className="mt-5 py-3 px-3 -mx-2 bg-white rounded-md">
              <div className="flex justify-between mb-2 shadow-sm p-2 pt-0">
                <h5 className="text-md font-light">Episodes</h5>
                <Link to={`/podcast/${id}/create-episode`} className="button">
                  Create Episode
                </Link>
              </div>
              {podcast.episodes?.map((episode) => (
                <Episode
                  podcastId={id}
                  episode={episode}
                  key={episode.id}
                  edit={true}
                />
              ))}
            </div>
            {/** listener */}
            <div className="mt-5 py-3 px-3 -mx-2 bg-white rounded-md">
              <h5 className="text-md font-light">
                Listeners
                <span className="text-xs text-gray-500">
                  ({podcast.subscribers?.length || 0})
                </span>
              </h5>
              {podcast.subscribers?.map((subscriber, index) => (
                <p key={subscriber.email} className="text-xs text-gray-400">
                  {subscriber.email} {index ? <>&middot;</> : null}
                </p>
              ))}
            </div>

            {/**reviews */}
            <div className="mt-5 py-3 px-3 -mx-2 rounded-md bg-white">
              <h5 className="text-md font-light mb-3">Recent Reivews</h5>
              {podcast?.reviews?.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
