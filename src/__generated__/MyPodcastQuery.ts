/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyPodcastInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: MyPodcastQuery
// ====================================================

export interface MyPodcastQuery_myPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: Category;
  createdAt: any;
}

export interface MyPodcastQuery_myPodcast_podcast_reviews_creator {
  __typename: "User";
  email: string;
}

export interface MyPodcastQuery_myPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
  rating: number;
  createdAt: any;
  creator: MyPodcastQuery_myPodcast_podcast_reviews_creator;
}

export interface MyPodcastQuery_myPodcast_podcast_subscribers {
  __typename: "User";
  email: string;
}

export interface MyPodcastQuery_myPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  updatedAt: any;
  rating: number;
  category: Category;
  coverImg: string | null;
  description: string;
  episodes: MyPodcastQuery_myPodcast_podcast_episodes[];
  reviews: MyPodcastQuery_myPodcast_podcast_reviews[];
  subscribers: MyPodcastQuery_myPodcast_podcast_subscribers[];
}

export interface MyPodcastQuery_myPodcast {
  __typename: "MyPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: MyPodcastQuery_myPodcast_podcast | null;
}

export interface MyPodcastQuery {
  myPodcast: MyPodcastQuery_myPodcast;
}

export interface MyPodcastQueryVariables {
  input: MyPodcastInput;
}
