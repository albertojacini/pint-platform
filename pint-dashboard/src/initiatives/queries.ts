import { gql } from "@apollo/client";


export const initiativeListQuery = gql`
  query InitiativeList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: InitiativeFilterInput
    $sort: InitiativeOrder
  ) {
    initiatives(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...Initiative
          updatedAt
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;
export const initiativeCountQuery = gql`
  query InitiativeCount($filter: InitiativeFilterInput) {
    initiatives(filter: $filter) {
      totalCount
    }
  }
`;

export const initiativeDetailsQuery = gql`
  query InitiativeDetails(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    initiative(id: $id) {
      ...Initiative
    }
  }
`;

export const initiativeMediaQuery = gql`
  query InitiativeMediaById($initiativeId: ID!, $mediaId: ID!) {
    initiative(id: $initiativeId) {
      id
      title
      mainImage: mediaById(id: $mediaId) {
        id
        alt
        url
        type
        oembedData
      }
      media {
        id
        url(size: 48)
        alt
        type
        oembedData
      }
    }
  }
`;
