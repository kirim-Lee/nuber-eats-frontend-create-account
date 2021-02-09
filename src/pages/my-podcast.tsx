import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MyPodcastBox } from '../components/my-podcast-box';
import { WHOLE_PODCAST_FRAGMENT } from '../fragment';
import {
  MyPodcastQuery,
  MyPodcastQueryVariables,
} from '../__generated__/MyPodcastQuery';

const MYPODCAST_QUERY = gql`
  query MyPodcastQuery($input: MyPodcastInput!) {
    myPodcast(input: $input) {
      ok
      error
      podcast {
        ...WholePodcastPart
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
  const { data, loading, error } = useQuery<
    MyPodcastQuery,
    MyPodcastQueryVariables
  >(MYPODCAST_QUERY, {
    variables: { input: { id: Number(id) } },
  });

  console.log(data);

  const podcast = data?.myPodcast?.podcast;
  return (
    <div className="container flex justify-center items-start mt-4 h-screen">
      <div className="rounded-xl max-w-screen-md w-10/12 bg-blue-100 px-5 py-3 box-content shadow-md">
        <h2 className="text-xl text-gray-600 text-center font-medium pt-3">
          My Podcast
        </h2>
        {podcast && (
          <>
            <MyPodcastBox podcast={podcast} />
            <div className="mt-5">
              <div className="flex justify-between">
                <h5 className="text-md font-light">Episodes</h5>
                <Link to={`/podcast/${id}/create-episode`} className="button">
                  Create Episode
                </Link>
              </div>
              {podcast.episodes?.map((episode) => (
                <div key={episode.id}>{episode.title}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
