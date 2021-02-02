/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastPart
// ====================================================

export interface PodcastPart_creator {
  __typename: "User";
  email: string;
}

export interface PodcastPart {
  __typename: "Podcast";
  id: number;
  title: string;
  updatedAt: any;
  rating: number;
  category: string;
  creator: PodcastPart_creator;
}
