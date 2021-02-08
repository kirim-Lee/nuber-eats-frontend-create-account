import { fromError, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import {
  CreatePodcastMutation,
  CreatePodcastMutationVariables,
} from '../__generated__/CreatePodcastMutation';

import { Category, CreatePodcastInput } from '../__generated__/globalTypes';

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

  const onError = (error) => {
    console.log(error);
  };

  const [creatPodcast, { data, loading }] = useMutation<
    CreatePodcastMutation,
    CreatePodcastMutationVariables
  >(CREATE_PODCAST, { onCompleted, onError });

  const { watch, register, handleSubmit, formState } = useForm<FormType>({
    mode: 'onChange',
  });

  const file: FileList = watch('file');

  const onSubmit = async (data: FormType) => {
    if (data.file) {
      const form = new FormData();
      form.append('file', file[0]);

      const { url } = await (
        await fetch('http://localhost:4000/uploads', {
          method: 'POST',
          body: form,
        })
      ).json();

      data.coverImg = url;
      delete data.file;

      handleMuatate(data);
    } else {
      handleMuatate(data);
    }
  };

  const handleMuatate = (data: FormType) => {
    creatPodcast({ variables: { input: data } });
  };

  console.log(file);
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
          <input
            type="text"
            className="input-text"
            name="description"
            placeholder="description"
            ref={register({ required: true })}
          />

          <div className="relative">
            <input
              type="file"
              className="hidden"
              name="file"
              id="file"
              ref={register}
            />
            <label
              htmlFor="file"
              className="rounded-full bg-blue-500 text-white py-2 px-5 text-sm absolute right-0 top-0 shadow-md"
            >
              add file
            </label>
            <input
              type="text"
              className="py-2 bg-blue-300 rounded-md float-left pl-3 pr-10 text-sm text-white"
              readOnly
              value={file?.[0]?.name ?? ''}
            />
          </div>
          <Button
            isValid={formState.isValid}
            loading={loading}
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
