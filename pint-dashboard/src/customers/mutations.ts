import { gql } from "@apollo/client";

export const updateCustomer = gql`
  mutation UpdateCustomer($id: ID!, $input: CustomerInput!) {
    customerUpdate(id: $id, input: $input) {
      errors {
        ...AccountError
      }
      user {
        ...CustomerDetails
      }
    }
  }
`;

export const createCustomer = gql`
  mutation CreateCustomer($input: UserCreateInput!) {
    customerCreate(input: $input) {
      errors {
        ...AccountError
      }
      user {
        id
      }
    }
  }
`;

export const removeCustomer = gql`
  mutation RemoveCustomer($id: ID!) {
    customerDelete(id: $id) {
      errors {
        ...AccountError
      }
    }
  }
`;

export const bulkRemoveCustomers = gql`
  mutation BulkRemoveCustomers($ids: [ID!]!) {
    customerBulkDelete(ids: $ids) {
      errors {
        ...AccountError
      }
    }
  }
`;
