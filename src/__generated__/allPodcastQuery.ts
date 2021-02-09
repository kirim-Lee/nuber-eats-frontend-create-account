/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: allPodcastQuery
// ====================================================

export interface allPodcastQuery_getAllPodcasts_podcasts_creator {
  __typename: "User";
  email: string;
}

export interface allPodcastQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  updatedAt: any;
  rating: number;
  category: Category;
  coverImg: string | null;
  description: string;
  creator: allPodcastQuery_getAllPodcasts_podcasts_creator;
}

export interface allPodcastQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: allPodcastQuery_getAllPodcasts_podcasts[] | null;
}

export interface allPodcastQuery {
  getAllPodcasts: allPodcastQuery_getAllPodcasts;
}
