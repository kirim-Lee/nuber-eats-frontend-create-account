/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubcribeInput } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: episodedAdded
// ====================================================

export interface episodedAdded_episodeAdded_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
}

export interface episodedAdded_episodeAdded {
  __typename: "Episode";
  id: number;
  title: string;
  podcast: episodedAdded_episodeAdded_podcast;
}

export interface episodedAdded {
  episodeAdded: episodedAdded_episodeAdded;
}

export interface episodedAddedVariables {
  input: SubcribeInput;
}
