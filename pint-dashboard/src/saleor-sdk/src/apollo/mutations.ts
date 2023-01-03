import { gql } from "@apollo/client";

import {
  accountErrorFragment,
  userBaseFragment,
  userDetailsFragment,
} from "@saleor/fragments/auth"

export const LOGIN_WITHOUT_DETAILS = gql`
  ${accountErrorFragment}
  ${userBaseFragment}
  mutation loginWithoutDetails($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      csrfToken
      token
      errors {
        ...AccountErrorFragment
      }
      user {
        ...UserBaseFragment
      }
    }
  }
`;

export const LOGIN = gql`
  ${accountErrorFragment}
  ${userDetailsFragment}
  mutation login($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      csrfToken
      token
      errors {
        ...AccountErrorFragment
      }
      user {
        ...UserDetailsFragment
      }
    }
  }
`;

export const REGISTER = gql`
  ${accountErrorFragment}
  mutation register($input: AccountRegisterInput!) {
    accountRegister(input: $input) {
      errors {
        ...AccountErrorFragment
      }
      requiresConfirmation
    }
  }
`;

export const REFRESH_TOKEN = gql`
  ${accountErrorFragment}
  mutation refreshToken($csrfToken: String!) {
    tokenRefresh(csrfToken: $csrfToken) {
      token
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;

// separate mutation so the request payload is minimal when user is not needed
// used for initial authentication
export const REFRESH_TOKEN_WITH_USER = gql`
  ${accountErrorFragment}
  ${userDetailsFragment}
  mutation refreshTokenWithUser($csrfToken: String!) {
    tokenRefresh(csrfToken: $csrfToken) {
      token
      user {
        ...UserDetailsFragment
      }
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;

export const VERIFY_TOKEN = gql`
  ${accountErrorFragment}
  ${userDetailsFragment}
  mutation verifyToken($token: String!) {
    tokenVerify(token: $token) {
      isValid
      payload
      user {
        ...UserDetailsFragment
      }
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  ${accountErrorFragment}
  mutation passwordChange($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  ${accountErrorFragment}
  mutation requestPasswordReset(
    $email: String!
    $redirectUrl: String!
    $channel: String!
  ) {
    requestPasswordReset(
      email: $email
      redirectUrl: $redirectUrl
      channel: $channel
    ) {
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;

export const SET_PASSWORD = gql`
  ${userDetailsFragment}
  ${accountErrorFragment}
  mutation setPassword($token: String!, $email: String!, $password: String!) {
    setPassword(token: $token, email: $email, password: $password) {
      errors {
        ...AccountErrorFragment
      }
      token
      csrfToken
      user {
        ...UserDetailsFragment
      }
    }
  }
`;

export const REQUEST_EMAIL_CHANGE = gql`
  ${userDetailsFragment}
  ${accountErrorFragment}
  mutation requestEmailChange(
    $channel: String!
    $newEmail: String!
    $password: String!
    $redirectUrl: String!
  ) {
    requestEmailChange(
      channel: $channel
      newEmail: $newEmail
      password: $password
      redirectUrl: $redirectUrl
    ) {
      errors {
        ...AccountErrorFragment
      }
      user {
        ...UserDetailsFragment
      }
    }
  }
`;

export const CONFIRM_EMAIL_CHANGE = gql`
  ${userDetailsFragment}
  ${accountErrorFragment}
  mutation confirmEmailChange($channel: String!, $token: String!) {
    confirmEmailChange(channel: $channel, token: $token) {
      errors {
        ...AccountErrorFragment
      }
      user {
        ...UserDetailsFragment
      }
    }
  }
`;

export const REQUEST_DELETE_ACCOUNT = gql`
  ${accountErrorFragment}
  mutation accountRequestDeletion($channel: String!, $redirectUrl: String!) {
    accountRequestDeletion(channel: $channel, redirectUrl: $redirectUrl) {
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  ${userDetailsFragment}
  ${accountErrorFragment}
  mutation accountDelete($token: String!) {
    accountDelete(token: $token) {
      errors {
        ...AccountErrorFragment
      }
      user {
        ...UserDetailsFragment
      }
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  ${userDetailsFragment}
  ${accountErrorFragment}
  mutation accountUpdate($input: AccountInput!) {
    accountUpdate(input: $input) {
      errors {
        ...AccountErrorFragment
      }
      user {
        ...UserDetailsFragment
      }
    }
  }
`;

export const CONFIRM_ACCOUNT = gql`
  ${userDetailsFragment}
  ${accountErrorFragment}
  mutation accountConfirm($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      user {
        ...UserDetailsFragment
      }
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;
