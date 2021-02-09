import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  deletePodcastMutation,
  deletePodcastMutationVariables,
} from '../__generated__/deletePodcastMutation';
import { Confirm } from './confirm';
import { MYPODCAST } from '../pages/my-podcasts';
import { MYPODCAST_QUERY } from '../pages/my-podcast';

interface IProps {
  podcastId: number;
}

const DELETE_PODCAST = gql`
  mutation deletePodcastMutation($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
      ok
      error
    }
  }
`;

export const EditPodcast: React.FC<IProps> = ({ podcastId }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const onCompleted = (result: deletePodcastMutation) => {
    if (result?.deletePodcast?.ok) {
      history.goBack();
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const [deletePodcast] = useMutation<
    deletePodcastMutation,
    deletePodcastMutationVariables
  >(DELETE_PODCAST, {
    onCompleted,
    onError,
    refetchQueries: [
      { query: MYPODCAST },
      {
        query: MYPODCAST_QUERY,
        variables: { input: { id: podcastId } },
      },
    ],
  });

  const handlDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleConfirm = () => {
    deletePodcast({ variables: { input: { id: podcastId } } });
  };

  return (
    <div>
      <Link
        to={`/podcast/${podcastId}/edit`}
        className="button-black-line mr-2"
      >
        edit
      </Link>
      <button className="button-black-line" onClick={handlDelete}>
        delete
      </button>
      {show && (
        <Confirm
          text="Are you sure delete?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
