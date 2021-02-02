import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
  createAccount,
  createAccountVariables,
} from '../__generated__/createAccount';

import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { useHistory } from 'react-router-dom';
import { EMAIL_PATTERN } from '../constants';
import { CreateAccountInput, UserRole } from '../__generated__/globalTypes';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

export const CreateAccount = () => {
  const history = useHistory();

  const onCompleted = (result: createAccount) => {
    if (result.createAccount.ok) {
      history.push('/');
    }
  };

  const onError = (e: any) => {
    console.log('error', e);
  };

  const [createAccount, { data: createAccountResult, loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted, onError });

  const {
    register,
    handleSubmit,
    formState,
    errors,
  } = useForm<CreateAccountInput>({ mode: 'onChange' });

  const onValid = (input: CreateAccountInput) => {
    console.log(input);
    createAccount({ variables: { input } });
  };
  console.log(errors);
  return (
    <div className="w-full h-screen flex flex-col bg-blue-100">
      <h2 className="text-center pt-10 text-2xl text-blue-800">
        Create Account
      </h2>
      <h3 className="text-center text-sm p-2">here Podcast service</h3>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col items-center px-5"
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          ref={register({
            required: 'email is required',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'email is not fit a pattern',
            },
          })}
          className="border border-gray-300 focus:outline-none px-5 py-3 focus:border-gray-500 transition-colors duration-500 w-full rounded"
        />
        {errors?.email?.message && <FormError error={errors.email.message} />}
        <input
          type="password"
          name="password"
          placeholder="password"
          ref={register({ required: 'password is required' })}
          className="border border-gray-300 focus:outline-none px-5 py-3 focus:border-gray-500 transition-colors duration-500 w-full rounded mt-2"
        />
        {errors.password?.message && (
          <FormError error={errors.password.message} />
        )}
        <select
          ref={register}
          name="role"
          className="border border-gray-300 focus:outline-none px-5 py-3 focus:border-gray-500 transition-colors duration-500 w-full rounded mt-2"
        >
          {Object.keys(UserRole).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <Button
          isValid={formState.isValid}
          loading={loading}
          text="Create"
          className="w-full mt-2"
        />
      </form>
      {createAccountResult?.createAccount.error && (
        <FormError error={createAccountResult.createAccount.error} />
      )}
    </div>
  );
};
