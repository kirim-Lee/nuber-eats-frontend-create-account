/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Category {
  ECONOMY = "ECONOMY",
  LANGUAGE = "LANGUAGE",
  MUSIC = "MUSIC",
  NONE = "NONE",
}

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface CreateEpisodeInput {
  title: string;
  category: Category;
  file: string;
  fileSize?: number | null;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  category: Category;
  coverImg?: string | null;
  description: string;
}

export interface CreateReviewInput {
  title: string;
  text: string;
  rating: number;
  podcastId: number;
}

export interface EpisodesSearchInput {
  podcastId: number;
  episodeId: number;
}

export interface GetEpisodeInput {
  episodeId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MarkEpisodeAsPlayedInput {
  id: number;
}

export interface MyPodcastInput {
  id: number;
}

export interface PodcastSearchInput {
  id: number;
}

export interface SearchPodcastsInput {
  page?: number | null;
  titleQuery: string;
  category?: Category | null;
}

export interface ToggleSubscribeInput {
  podcastId: number;
}

export interface UpdateEpisodeInput {
  title?: string | null;
  category?: Category | null;
  file?: string | null;
  fileSize?: number | null;
  podcastId: number;
  episodeId: number;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  title?: string | null;
  category?: Category | null;
  rating?: number | null;
  coverImg?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
