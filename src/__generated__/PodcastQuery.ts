/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: PodcastQuery
// ====================================================

export interface PodcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: Category;
  createdAt: any;
}

export interface PodcastQuery_getPodcast_podcast_reviews_creator {
  __typename: "User";
  email: string;
}

export interface PodcastQuery_getPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
  creator: PodcastQuery_getPodcast_podcast_reviews_creator;
}

export interface PodcastQuery_getPodcast_podcast_creator {
  __typename: "User";
  email: string;
}

export interface PodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  updatedAt: any;
  rating: number;
  category: Category;
  coverImg: string | null;
  description: string;
  episodes: PodcastQuery_getPodcast_podcast_episodes[];
  reviews: PodcastQuery_getPodcast_podcast_reviews[];
  creator: PodcastQuery_getPodcast_podcast_creator;
}

export interface PodcastQuery_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: PodcastQuery_getPodcast_podcast | null;
}

export interface PodcastQuery {
  getPodcast: PodcastQuery_getPodcast;
}

export interface PodcastQueryVariables {
  input: PodcastSearchInput;
}
