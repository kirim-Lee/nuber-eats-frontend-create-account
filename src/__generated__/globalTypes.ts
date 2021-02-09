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

export interface CreatePodcastInput {
  title: string;
  category: Category;
  coverImg?: string | null;
  description: string;
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

export interface ToggleSubscribeInput {
  podcastId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
