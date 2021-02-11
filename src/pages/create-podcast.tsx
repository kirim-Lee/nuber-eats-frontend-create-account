import { fromError, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { InputFile } from '../components/input-file';
import {
  CreatePodcastMutation,
  CreatePodcastMutationVariables,
} from '../__generated__/CreatePodcastMutation';

import { Category, CreatePodcastInput } from '../__generated__/globalTypes';
import { MYPODCAST } from './my-podcasts';

const CREATE_PODCAST = gql`
  mutation CreatePodcastMutation($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      ok
      error
      id
    }
  }
`;

type FormType = CreatePodcastInput & { file?: FileList };

export const CreatePodcast = () => {
  const history = useHistory();
  const onCompleted = (result: CreatePodcastMutation) => {
    if (result?.createPodcast?.ok && result?.createPodcast?.id) {
      history.push(`/podcast/${result.createPodcast.id}`);
    }
  };

  const [uploading, setUploading] = useState(false);

  const onError = (error) => {
    console.log(error);
  };

  const [creatPodcast, { data, loading }] = useMutation<
    CreatePodcastMutation,
    CreatePodcastMutationVariables
  >(CREATE_PODCAST, {
    onCompleted,
    onError,
    refetchQueries: [{ query: MYPODCAST }],
  });

  const { watch, register, handleSubmit, formState } = useForm<FormType>({
    mode: 'onChange',
  });

  const file: FileList = watch('file');

  const onSubmit = async (data: FormType) => {
    if (data.file && data.file[0]) {
      const form = new FormData();
      form.append('file', file[0]);
      setUploading(true);

      const { url } = await (
        await fetch('https://nuber-eats-assignment.herokuapp.com/uploads', {
          method: 'POST',
          body: form,
        })
      ).json();

      data.coverImg = url;
      delete data.file;

      setUploading(false);
      handleMuatate(data);
    } else {
      handleMuatate(data);
    }
  };

  const handleMuatate = (data: FormType) => {
    creatPodcast({ variables: { input: data } });
  };

  return (
    <div className="container flex justify-center items-center h-screen">
      <div className="rounded-xl max-w-screen-md w-8/12 bg-blue-100 px-5 py-3 box-content shadow-md">
        <h2 className="text-xl text-gray-600 text-center font-medium pt-3">
          Creat Podcast
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 max-w-screen-sm items-center text-center mx-auto mt-3"
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
          <textarea
            className="input-text"
            name="description"
            placeholder="description"
            ref={register({ required: true })}
          />

          <InputFile file={file} register={register} />

          <Button
            isValid={formState.isValid}
            loading={loading || uploading}
            text={'Create Podcast'}
          />
          {data?.createPodcast?.error && (
            <FormError error={data.createPodcast.error} />
          )}
        </form>
      </div>
    </div>
  );
};
