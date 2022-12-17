import { gql } from "@apollo/client";

export const initiativeMediaCreateMutation = gql`
  mutation InitiativeMediaCreate(
    $initiative: ID!
    $image: Upload
    $alt: String
    $mediaUrl: String
  ) {
    initiativeMediaCreate(
      input: {
        alt: $alt
        image: $image
        initiative: $initiative
        mediaUrl: $mediaUrl
      }
    ) {
      errors {
        ...InitiativeError
      }
      initiative {
        id
        media {
          ...InitiativeMedia
        }
      }
    }
  }
`;

export const initiativeDeleteMutation = gql`
  mutation InitiativeDelete($id: ID!) {
    initiativeDelete(id: $id) {
      errors {
        ...InitiativeError
      }
      initiative {
        id
      }
    }
  }
`;

export const initiativeMediaReorder = gql`
  mutation InitiativeMediaReorder($initiativeId: ID!, $mediaIds: [ID!]!) {
    initiativeMediaReorder(initiativeId: $initiativeId, mediaIds: $mediaIds) {
      errors {
        ...InitiativeError
      }
      initiative {
        id
        media {
          id
          alt
          sortOrder
          url
        }
      }
    }
  }
`;

export const initiativeUpdateMutation = gql`
  mutation InitiativeUpdate($id: ID!, $input: InitiativeInput!) {
    initiativeUpdate(id: $id, input: $input) {
      errors {
        ...InitiativeError
      }
    }
  }
`;

export const initiativeCreateMutation = gql`
  mutation InitiativeCreate($input: InitiativeCreateInput!) {
    initiativeCreate(input: $input) {
      errors {
        ...InitiativeError
      }
      initiative {
        id
      }
    }
  }
`;

export const initiativeMediaDeleteMutation = gql`
  mutation InitiativeMediaDelete($id: ID!) {
    initiativeMediaDelete(id: $id) {
      errors {
        ...InitiativeError
      }
      initiative {
        id
        media {
          id
        }
      }
    }
  }
`;

export const initiativeMediaUpdateMutation = gql`
  mutation InitiativeMediaUpdate($id: ID!, $alt: String!) {
    initiativeMediaUpdate(id: $id, input: { alt: $alt }) {
      errors {
        ...InitiativeError
      }
      initiative {
        id
        media {
          ...InitiativeMedia
        }
      }
    }
  }
`;

export const initiativeBulkDeleteMutation = gql`
  mutation initiativeBulkDelete($ids: [ID!]!) {
    initiativeBulkDelete(ids: $ids) {
      errors {
        ...InitiativeError
      }
    }
  }
`;

export const initiativeExportMutation = gql`
  mutation InitiativeExport($input: ExportInitiativesInput!) {
    exportInitiatives(input: $input) {
      exportFile {
        ...ExportFile
      }
      errors {
        ...ExportError
      }
    }
  }
`;
