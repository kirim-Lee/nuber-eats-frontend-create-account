/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEpisodeInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetEpisode
// ====================================================

export interface GetEpisode_getEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  category: Category;
  file: string;
  fileSize: number | null;
}

export interface GetEpisode_getEpisode {
  __typename: "GetEpisodeOutput";
  ok: boolean;
  error: string | null;
  episode: GetEpisode_getEpisode_episode | null;
}

export interface GetEpisode {
  getEpisode: GetEpisode_getEpisode;
}

export interface GetEpisodeVariables {
  input: GetEpisodeInput;
}
