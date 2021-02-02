/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarkEpisodeAsPlayedInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MarkEpisodePlayed
// ====================================================

export interface MarkEpisodePlayed_markEpisodeAsPlayed {
  __typename: "MarkEpisodeAsPlayedOutput";
  ok: boolean;
}

export interface MarkEpisodePlayed {
  markEpisodeAsPlayed: MarkEpisodePlayed_markEpisodeAsPlayed;
}

export interface MarkEpisodePlayedVariables {
  input: MarkEpisodeAsPlayedInput;
}
