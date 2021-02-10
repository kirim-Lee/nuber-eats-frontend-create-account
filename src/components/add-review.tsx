import { useMutation } from '@apollo/client';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PODCAST } from '../pages/podcast';
import {
  createReviewMutation,
  createReviewMutationVariables,
} from '../__generated__/createReviewMutation';
import { CreateReviewInput } from '../__generated__/globalTypes';
import { Button } from './button';
import { FormError } from './form-error';
import { Stars } from './stars';

const CREATE_REVIEW = gql`
  mutation createReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      error
      id
    }
  }
`;

interface IForm extends Omit<CreateReviewInput, 'podcastId'> {}
interface IProps {
  podcastId: number;
}

export const AddReview = ({ podcastId }: IProps) => {
  const [showReview, setShowReview] = useState(false);

  const handleReviewShow = () => setShowReview((current) => !current);

  const onCompleted = (result: createReviewMutation) => {
    if (result?.createReview?.ok) {
      setShowReview(false);
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const [createReviewMutation, { loading, data: resultData }] = useMutation<
    createReviewMutation,
    createReviewMutationVariables
  >(CREATE_REVIEW, {
    onCompleted,
    onError,
    refetchQueries: [
      { query: PODCAST, variables: { input: { id: podcastId } } },
    ],
  });

  const { register, formState, control, handleSubmit } = useForm<IForm>({
    mode: 'onChange',
  });

  const handleChangeRating = (onChange) => (rating: number) => {
    onChange(rating);
  };

  const onSubmit = (data: IForm) => {
    createReviewMutation({
      variables: {
        input: { ...data, podcastId },
      },
    });
  };

  return (
    <div className="px-3 py-2">
      <div className="flex justify-end">
        <button
          className={`${!showReview ? 'button-black' : 'button-gray'}`}
          onClick={handleReviewShow}
        >
          {showReview ? 'collapse' : 'Add Review'}
        </button>
      </div>
      {showReview && (
        <form
          className="grid grid-cols-1 gap-2 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-items-start">
            <Controller
              control={control}
              name="rating"
              render={({ value, onChange }) => (
                <Stars
                  onClick={handleChangeRating(onChange)}
                  rating={value ?? 0}
                />
              )}
            ></Controller>
          </div>
          <input
            type="text"
            name="title"
            ref={register({ required: true })}
            className="input-text"
            placeholder="title"
          />
          <textarea
            name="text"
            className="input-text"
            ref={register({ required: true })}
            placeholder="comment this podcast!!"
          />
          <button
            className="button-pink"
            disabled={loading || !formState.isValid}
          >
            {loading ? 'loading...' : 'commit'}
          </button>
          {resultData?.createReview?.error && (
            <FormError error={resultData.createReview.error} />
          )}
        </form>
      )}
    </div>
  );
};
