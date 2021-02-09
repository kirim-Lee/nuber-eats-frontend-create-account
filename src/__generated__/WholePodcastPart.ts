/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Category } from "./globalTypes";

// ====================================================
// GraphQL fragment: WholePodcastPart
// ====================================================

export interface WholePodcastPart_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: Category;
  createdAt: any;
}

export interface WholePodcastPart_reviews_creator {
  __typename: "User";
  email: string;
}

export interface WholePodcastPart_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
  rating: number;
  createdAt: any;
  creator: WholePodcastPart_reviews_creator;
}

export interface WholePodcastPart {
  __typename: "Podcast";
  id: number;
  title: string;
  updatedAt: any;
  rating: number;
  category: Category;
  coverImg: string | null;
  description: string;
  episodes: WholePodcastPart_episodes[];
  reviews: WholePodcastPart_reviews[];
}
