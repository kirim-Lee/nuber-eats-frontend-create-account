import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { Button } from '../components/button';
import { InputFile } from '../components/input-file';
import { GetEpisode, GetEpisodeVariables } from '../__generated__/GetEpisode';
import { Category, UpdateEpisodeInput } from '../__generated__/globalTypes';
import {
  UpdateEpisodeMutation,
  UpdateEpisodeMutationVariables,
} from '../__generated__/UpdateEpisodeMutation';

interface IParamType {
  podcastId: string;
  episodeId: string;
}
const GET_EPISODE = gql`
  query GetEpisode($input: GetEpisodeInput!) {
    getEpisode(input: $input) {
      ok
      error
      episode {
        id
        title
        createdAt
        category
        file
        fileSize
      }
    }
  }
`;

const UPDATE_EPISODE = gql`
  mutation UpdateEpisodeMutation($input: UpdateEpisodeInput!) {
    updateEpisode(input: $input) {
      ok
      error
    }
  }
`;

interface IFormType extends Pick<UpdateEpisodeInput, 'title' | 'category'> {
  file?: FileList;
}

export const EditEpisode = () => {
  const history = useHistory();
  const { podcastId, episodeId } = useParams<IParamType>();
  const [uploading, setUploading] = useState(false);
  const { data } = useQuery<GetEpisode, GetEpisodeVariables>(GET_EPISODE, {
    variables: { input: { episodeId: Number(episodeId) } },
  });

  const onCompleted = (result: UpdateEpisodeMutation) => {
    if (result?.updateEpisode?.ok) {
      history.goBack();
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const [updateEpisode, { loading }] = useMutation<
    UpdateEpisodeMutation,
    UpdateEpisodeMutationVariables
  >(UPDATE_EPISODE, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_EPISODE,
        variables: { input: { episodeId: Number(episodeId) } },
      },
    ],
  });

  const {
    register,
    formState,
    setValue,
    watch,
    handleSubmit,
    trigger,
  } = useForm<IFormType>({ mode: 'onChange' });

  const file = watch('file');

  useEffect(() => {
    if (data?.getEpisode?.episode) {
      const { title, category } = data?.getEpisode?.episode;
      setValue('title', title);
      setValue('category', category);
      trigger();
    }
  }, [data]);

  const onSubmit = async (data: IFormType) => {
    if (data.file && data.file[0]) {
      const form = new FormData();
      form.append('file', file[0]);
      setUploading(true);

      const { url } = await (
        await fetch('http://localhost:4000/uploads', {
          method: 'POST',
          body: form,
        })
      ).json();

      const newData: UpdateEpisodeInput = {
        ...data,
        file: url,
        fileSize: data.file[0].size,
        podcastId: Number(podcastId),
        episodeId: Number(episodeId),
      };

      setUploading(false);
      handleMuatate(newData);
    } else {
      const newData: UpdateEpisodeInput = {
        ...data,
        podcastId: Number(podcastId),
        episodeId: Number(episodeId),
        file: null,
      };

      delete newData.file;

      handleMuatate(newData);
    }
  };

  const handleMuatate = (input: UpdateEpisodeInput) => {
    updateEpisode({ variables: { input } });
  };

  return (
    <div className="container flex justify-center items-start mt-4 h-screen">
      <div className="rounded-xl max-w-screen-md w-10/12 bg-blue-100 px-5 py-3 box-content shadow-md">
        <h2 className="text-xl text-gray-600 text-center font-medium pt-3">
          Eidt Episode
        </h2>
        {data && (
          <form
            className="grid grid-cols-1 gap-2 max-w-screen-sm items-center text-center mx-auto mt-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              className="input-text"
              name="title"
              placeholder="title"
              ref={register({ required: true })}
            />
            <select ref={register} name="category" className="input-text">
              {Object.keys(Category).map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            <p className="text-sm text-blue-500 text-left">
              {data.getEpisode?.episode?.file?.split('/').splice(-1)}
            </p>
            <InputFile file={file} register={register} />
            <Button
              isValid={formState.isValid}
              loading={loading || uploading}
              text={'Edit Episode'}
            />
          </form>
        )}
      </div>
    </div>
  );
};
