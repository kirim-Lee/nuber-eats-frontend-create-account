import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { Button } from '../components/button';
import { InputFile } from '../components/input-file';
import {
  CreateEpisodeMutation,
  CreateEpisodeMutationVariables,
} from '../__generated__/CreateEpisodeMutation';
import { Category, CreateEpisodeInput } from '../__generated__/globalTypes';

type ParamType = {
  id: string;
};

const CREATE_EPISODE = gql`
  mutation CreateEpisodeMutation($input: CreateEpisodeInput!) {
    createEpisode(input: $input) {
      ok
      error
      id
    }
  }
`;

interface IForm extends Pick<CreateEpisodeInput, 'title' | 'category'> {
  file: FileList;
}

export const CreateEpisode = () => {
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const [uploading, setUploading] = useState(false);

  const onCompleted = (result: CreateEpisodeMutation) => {
    if (result?.createEpisode?.ok && result.createEpisode.id) {
      history.push(`/podcast/${id}`);
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const [createEpisode, { loading }] = useMutation<
    CreateEpisodeMutation,
    CreateEpisodeMutationVariables
  >(CREATE_EPISODE, { onCompleted, onError });

  const { register, watch, formState, handleSubmit } = useForm<IForm>({
    mode: 'onChange',
  });
  const file = watch('file');

  const onSubmit = async (data: IForm) => {
    if (data.file && data.file[0]) {
      const form = new FormData();
      form.append('file', file[0]);
      setUploading(true);

      const { url } = await // await fetch('http://localhost:4000/uploads', {
      (
        await fetch('https://nuber-eats-assignment.herokuapp.com/uploads', {
          method: 'POST',
          body: form,
        })
      ).json();

      const mutationData: CreateEpisodeInput = {
        ...data,
        file: url,
        fileSize: data.file[0].size,

        podcastId: Number(id),
      };

      handleMuatate(mutationData);
    } else {
      const mutationData: CreateEpisodeInput = {
        ...data,
        podcastId: Number(id),
        file: null,
      };
      delete mutationData.file;
      handleMuatate(mutationData);
    }
  };

  const handleMuatate = (data: CreateEpisodeInput) => {
    createEpisode({ variables: { input: data } });
  };

  return (
    <div className="container flex justify-center items-start mt-4 h-screen">
      <div className="rounded-xl max-w-screen-md w-10/12 bg-blue-100 px-5 py-3 box-content shadow-md">
        <h2 className="text-xl text-gray-600 text-center font-medium pt-3">
          Create Episode
        </h2>
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
          <InputFile file={file} register={register} />
          <Button
            isValid={formState.isValid}
            loading={loading || uploading}
            text={'Create Podcast'}
          />
        </form>
      </div>
    </div>
  );
};
