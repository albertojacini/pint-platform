import { gql } from "@apollo/client";


export const initiativeTranslations = gql`
  query InitiativeTranslations(
    $language: LanguageCodeEnum!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(
      kind: INITIATIVE
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...InitiativeTranslation
        }
      }
    }
  }
`;

export const initiativeTranslationDetails = gql`
  query InitiativeTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
    translation(kind: INITIATIVE, id: $id) {
      ...InitiativeTranslation
    }
  }
`;
