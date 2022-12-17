import { gql } from "@apollo/client";
import {
  SearchInitiativesDocument,
  SearchInitiativesQuery,
  SearchInitiativesQueryVariables,
} from "@saleor/graphql";
import makeTopLevelSearch from "@saleor/hooks/makeTopLevelSearch";

export const searchInitiatives = gql`
  query SearchInitiatives($after: String, $first: Int!, $query: String!) {
    search: initiatives(after: $after, first: $first, filter: { search: $query }) {
      edges {
        node {
          id
          title
          thumbnail {
            url
          }
        }
      }
    }
  }
`;

export default makeTopLevelSearch<
  SearchInitiativesQuery,
  SearchInitiativesQueryVariables
>(SearchInitiativesDocument);
