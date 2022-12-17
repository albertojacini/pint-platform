import { gql } from "@apollo/client";


export const searchCatalog = gql`
  query SearchCatalog($first: Int!, $query: String!) {
    initiatives(first: $first, filter: { search: $query }) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
