import { useSubscription } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import {
  episodedAdded,
  episodedAddedVariables,
} from '../__generated__/episodedAdded';

const SUBSCRIPTION = gql`
  subscription episodedAdded($input: SubcribeInput!) {
    episodeAdded(input: $input) {
      id
      title
      podcast {
        id
        title
      }
    }
  }
`;

export const UserHeader = () => {
  const [show, setShow] = useState(false);
  const me = useUserInfo();

  const podcastIds =
    me?.data?.me?.subsriptions?.map((podcast) => podcast.id) || [];

  const { data: subscribeData } = useSubscription<
    episodedAdded,
    episodedAddedVariables
  >(SUBSCRIPTION, {
    variables: {
      input: {
        ids: podcastIds,
      },
    },
  });

  useEffect(() => {
    let timeD;
    if (subscribeData) {
      setShow(true);

      timeD = setTimeout(() => {
        setShow(false);
      }, 6000);
    }
    return () => {
      clearTimeout(timeD);
      setShow(false);
    };
  }, [subscribeData]);

  const handleClcik = () => setShow(false);

  return (
    <Link
      to={`/podcast/${subscribeData?.episodeAdded.podcast.id}`}
      className={`fixed left-0 w-screen z-50 transition-all ${
        show ? 'opacity-100 top-0' : 'opacity-0 -top-20'
      }`}
      onClick={handleClcik}
    >
      <div className="px-4 bg-gradient-to-tr from-rose-400 to-orange-300 text-white bg-opacity-100 rounded-b w-10/12 mx-auto shadow  py-2 box-content">
        <h1 className="text-sm">New episode added!</h1>
        <h2 className="font-thin">
          {subscribeData?.episodeAdded.podcast.title}
        </h2>
        <div className="flex justify-between">
          <p className="text-xs">{subscribeData?.episodeAdded.title}</p>
          <p className="text-xs font-mono">go now</p>
        </div>
      </div>
    </Link>
  );
};
