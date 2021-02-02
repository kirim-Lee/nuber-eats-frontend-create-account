/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleSubscribeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ToggleSubscription
// ====================================================

export interface ToggleSubscription_toggleSubscribe {
  __typename: "ToggleSubscribeOutput";
  ok: boolean;
  error: string | null;
}

export interface ToggleSubscription {
  toggleSubscribe: ToggleSubscription_toggleSubscribe;
}

export interface ToggleSubscriptionVariables {
  input: ToggleSubscribeInput;
}
