import { gql } from '@apollo/client';

export const PODCAST_FRAGMENT = gql`
  fragment PodcastPart on Podcast {
    id
    title
    updatedAt
    rating
    category
    coverImg
    description
  }
`;

export const WHOLE_PODCAST_FRAGMENT = gql`
  fragment WholePodcastPart on Podcast {
    ...PodcastPart
    episodes {
      id
      title
      category
      createdAt
      file
      fileSize
    }
    reviews {
      id
      title
      text
      rating
      createdAt
      creator {
        email
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;
