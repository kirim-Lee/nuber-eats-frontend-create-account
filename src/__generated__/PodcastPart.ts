/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Category } from "./globalTypes";

// ====================================================
// GraphQL fragment: PodcastPart
// ====================================================

export interface PodcastPart {
  __typename: "Podcast";
  id: number;
  title: string;
  updatedAt: any;
  rating: number;
  category: Category;
  coverImg: string | null;
  description: string;
}
