/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllMyPodcastQuery
// ====================================================

export interface GetAllMyPodcastQuery_getAllMyPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: Category;
  createdAt: any;
}

export interface GetAllMyPodcastQuery_getAllMyPodcasts_podcasts_reviews_creator {
  __typename: "User";
  email: string;
}

export interface GetAllMyPodcastQuery_getAllMyPodcasts_podcasts_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
  creator: GetAllMyPodcastQuery_getAllMyPodcasts_podcasts_reviews_creator;
}

export interface GetAllMyPodcastQuery_getAllMyPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  updatedAt: any;
  rating: number;
  category: Category;
  coverImg: string | null;
  description: string;
  episodes: GetAllMyPodcastQuery_getAllMyPodcasts_podcasts_episodes[];
  reviews: GetAllMyPodcastQuery_getAllMyPodcasts_podcasts_reviews[];
}

export interface GetAllMyPodcastQuery_getAllMyPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: GetAllMyPodcastQuery_getAllMyPodcasts_podcasts[] | null;
}

export interface GetAllMyPodcastQuery {
  getAllMyPodcasts: GetAllMyPodcastQuery_getAllMyPodcasts;
}
