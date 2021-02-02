import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { authTokenVar } from '../apollo';
import { PODCAST_FRAGMENT } from '../fragment';
import { meQuery } from '../__generated__/meQuery';

const ME = gql`
  query meQuery {
    me {
      id
      email
      role
      subsriptions {
        ...PodcastPart
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const useUserInfo = () => {
  const token = authTokenVar() || '';
  const { data, loading, error, refetch } = useQuery<meQuery>(ME);

  useEffect(() => {
    refetch();
  }, [token]);

  return { data, loading, error, refetch };
};
