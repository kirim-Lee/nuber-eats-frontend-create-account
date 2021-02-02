import { gql } from '@apollo/client';

export const PODCAST_FRAGMENT = gql`
  fragment PodcastPart on Podcast {
    id
    title
    updatedAt
    rating
    category
    creator {
      email
    }
  }
`;
