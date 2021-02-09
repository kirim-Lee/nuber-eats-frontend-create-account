/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEpisodeMutation
// ====================================================

export interface UpdateEpisodeMutation_updateEpisode {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface UpdateEpisodeMutation {
  updateEpisode: UpdateEpisodeMutation_updateEpisode;
}

export interface UpdateEpisodeMutationVariables {
  input: UpdateEpisodeInput;
}
