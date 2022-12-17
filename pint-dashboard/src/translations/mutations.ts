import { gql } from "@apollo/client";

export const updateInitiativeTranslations = gql`
  mutation UpdateInitiativeTranslations(
    $id: ID!
    $input: TranslationInput!
    $language: LanguageCodeEnum!
  ) {
    initiativeTranslate(id: $id, input: $input, languageCode: $language) {
      errors {
        ...InitiativeTranslateErrorFragment
      }
      initiative {
        id
        title
        description
        seoDescription
        seoTitle
        translation(languageCode: $language) {
          id
          description
          language {
            code
            language
          }
          title
          seoDescription
          seoTitle
        }
      }
    }
  }
`;
