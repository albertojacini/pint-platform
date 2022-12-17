import { gql } from "@apollo/client";

export const customerFragment = gql`
  fragment Customer on User {
    id
    email
    firstName
    lastName
  }
`;

export const customerDetailsFragment = gql`
  fragment CustomerDetails on User {
    ...Customer
    ...Metadata
    dateJoined
    lastLogin
    note
    isActive
  }
`;
