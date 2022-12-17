import { gql } from "@apollo/client";

export const initiativeTranslationFragment = gql`
  fragment InitiativeTranslation on InitiativeTranslatableContent {
    initiative {
      id
      title
      description
      seoDescription
      seoTitle
    }
    translation(languageCode: $language) {
      id
      seoTitle
      seoDescription
      title
      description
      language {
        code
        language
      }
    }
  }
`;
