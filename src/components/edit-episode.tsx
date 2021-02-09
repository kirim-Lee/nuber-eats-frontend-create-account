import { useMutation } from '@apollo/client';
import { React } from '@ungap/global-this';
import gql from 'graphql-tag';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MYPODCAST_QUERY } from '../pages/my-podcast';
import {
  DeleteEpisodeMutation,
  DeleteEpisodeMutationVariables,
} from '../__generated__/DeleteEpisodeMutation';
import { Confirm } from './confirm';

interface IProps {
  episodeId: number;
  podcastId: number;
}

const DELETE_EPISODE = gql`
  mutation DeleteEpisodeMutation($input: EpisodesSearchInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;
export const EditEpisode: React.FC<IProps> = ({ episodeId, podcastId }) => {
  const [show, setShow] = useState(false);

  const onError = (err) => {
    console.log(err);
  };

  const [deleteEpisode] = useMutation<
    DeleteEpisodeMutation,
    DeleteEpisodeMutationVariables
  >(DELETE_EPISODE, {
    onError,
    refetchQueries: [
      { query: MYPODCAST_QUERY, variables: { input: { id: podcastId } } },
    ],
  });

  const handlDelete = () => {
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleConfirm = () => {
    deleteEpisode({ variables: { input: { episodeId, podcastId } } });
  };

  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      <Link
        className="button-black"
        to={`/podcast/${podcastId}/episode/${episodeId}/edit`}
      >
        Edit Epiosid
      </Link>
      <button className="button-black" onClick={handlDelete}>
        Delete
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
