import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useUserInfo } from '../hooks/useUserInfo';
import { meQuery_me_subsriptions } from '../__generated__/meQuery';
import {
  ToggleSubscription,
  ToggleSubscriptionVariables,
} from '../__generated__/ToggleSubscription';
import { ALL_PODCASTS } from '../pages/podcasts';
interface IProps {
  podcastId: number;
}

const TOGGLE_SUBSCRIPTION = gql`
  mutation ToggleSubscription($input: ToggleSubscribeInput!) {
    toggleSubscribe(input: $input) {
      ok
      error
    }
  }
`;

export const SubscriptionButton = ({ podcastId }: IProps) => {
  const { data: userInfo } = useUserInfo();
  const [isSubscribe, setSubscribe] = useState(
    isSubscription(podcastId, userInfo?.me?.subsriptions)
  );

  const onCompleted = (res: ToggleSubscription) => {
    if (res.toggleSubscribe.ok) {
      setSubscribe((boolean) => !boolean);
    }
  };

  const [toggleSubscribe, { loading }] = useMutation<
    ToggleSubscription,
    ToggleSubscriptionVariables
  >(TOGGLE_SUBSCRIPTION, {
    onCompleted,
    refetchQueries: [{ query: ALL_PODCASTS }],
  });

  const handleToggle = () => {
    toggleSubscribe({ variables: { input: { podcastId } } });
  };

  useEffect(() => {
    setSubscribe(isSubscription(podcastId, userInfo?.me?.subsriptions));
  }, [userInfo]);

  return isSubscribe ? (
    <button
      className="text-xs rounded-full border border-pink-500 px-3 py-1 mt-2 text-gray-800 shadow"
      onClick={handleToggle}
      disabled={loading}
    >
      {loading ? 'loading...' : 'unsubscribe -'}
    </button>
  ) : (
    <button
      className="text-xs rounded-full bg-pink-500 px-3 py-1 mt-2 text-white shadow"
      onClick={handleToggle}
      disabled={loading}
    >
      {loading ? 'loading...' : 'subscribe +'}
    </button>
  );
};

const isSubscription = (
  subscriptionId: number,
  subscriptions: meQuery_me_subsriptions[] | undefined
) => {
  return !!(subscriptions || []).find(
    (podcast) => podcast?.id === subscriptionId
  );
};
