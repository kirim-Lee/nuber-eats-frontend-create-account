/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me_subsriptions {
  __typename: "Podcast";
  id: number;
}

export interface meQuery_me_playedEpisodes {
  __typename: "Episode";
  id: number;
}

export interface meQuery_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  subsriptions: meQuery_me_subsriptions[];
  playedEpisodes: meQuery_me_playedEpisodes[];
}

export interface meQuery {
  me: meQuery_me;
}
