import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { Button } from '../components/button';
import { InputFile } from '../components/input-file';
import { SelectCategory } from '../components/select-category';
import { Category, UpdatePodcastPayload } from '../__generated__/globalTypes';
import {
  MyPodcastQuery,
  MyPodcastQueryVariables,
} from '../__generated__/MyPodcastQuery';
import {
  UpdatePodcastMutation,
  UpdatePodcastMutationVariables,
} from '../__generated__/UpdatePodcastMutation';
import { MYPODCAST_QUERY } from './my-podcast';

const UPDATE_PODCAST = gql`
  mutation UpdatePodcastMutation($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      ok
      error
    }
  }
`;

type ParamType = { id: string };

interface IFormType {
  title: string;
  category: Category;
  description: string;
  file?: FileList;
}
export const EditPodcast = () => {
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const [uploading, setUploading] = useState(false);

  const onCompleted = (result: UpdatePodcastMutation) => {
    if (result.updatePodcast?.ok) {
      history.goBack();
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const { data } = useQuery<MyPodcastQuery, MyPodcastQueryVariables>(
    MYPODCAST_QUERY,
    {
      variables: { input: { id: Number(id) } },
    }
  );

  const [updatePodcast, { loading }] = useMutation<
    UpdatePodcastMutation,
    UpdatePodcastMutationVariables
  >(UPDATE_PODCAST, {
    onCompleted,
    onError,
    refetchQueries: [
      { query: MYPODCAST_QUERY, variables: { input: { id: Number(id) } } },
    ],
  });

  const {
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    trigger,
  } = useForm<IFormType>({
    mode: 'onChange',
  });

  const file = watch('file');

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

      data['coverImg'] = url;
      delete data.file;

      setUploading(false);
      handleMutate(data);
    } else {
      delete data.file;
      handleMutate(data);
    }
  };

  const handleMutate = (payload: UpdatePodcastPayload) => {
    updatePodcast({ variables: { input: { id: Number(id), payload } } });
  };

  useEffect(() => {
    if (data) {
      const { title, description, category } = data.myPodcast?.podcast;
      setValue('title', title);
      setValue('description', description);
      setValue('category', category);
      trigger();
    }
  }, [data]);

  return (
    <div className="container flex justify-center items-start mt-4 h-screen">
      <div className="rounded-xl max-w-screen-md w-10/12 bg-blue-100 px-5 py-3 box-content shadow-md">
        <h2 className="text-xl text-gray-600 text-center font-medium pt-3">
          Edit Podcast
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
            <SelectCategory register={register} />
            <textarea
              className="input-text"
              name="description"
              placeholder="description"
              ref={register({ required: true })}
            />
            <p className="text-sm text-blue-500 text-left">
              {data.myPodcast?.podcast?.coverImg?.split('/').splice(-1)}
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
