/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me_subsriptions_creator {
  __typename: "User";
  email: string;
}

export interface meQuery_me_subsriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  updatedAt: any;
  rating: number;
  category: string;
  creator: meQuery_me_subsriptions_creator;
}

export interface meQuery_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  subsriptions: meQuery_me_subsriptions[];
}

export interface meQuery {
  me: meQuery_me;
}
