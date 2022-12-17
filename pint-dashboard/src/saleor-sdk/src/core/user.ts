import {
  CONFIRM_ACCOUNT,
  CONFIRM_EMAIL_CHANGE,
  DELETE_ACCOUNT,
  REQUEST_DELETE_ACCOUNT,
  REQUEST_EMAIL_CHANGE,
  UPDATE_ACCOUNT,
} from "../apollo/mutations";
import {
  AccountConfirmMutation,
  AccountConfirmMutationVariables,
  AccountDeleteMutation,
  AccountDeleteMutationVariables,
  AccountRequestDeletionMutation,
  AccountRequestDeletionMutationVariables,
  AccountUpdateMutation,
  AccountUpdateMutationVariables,
  ConfirmEmailChangeMutation,
  ConfirmEmailChangeMutationVariables,
  RequestEmailChangeMutation,
  RequestEmailChangeMutationVariables,
} from "../apollo/types";
import { auth } from "./auth";
import {
  AccountDeleteResult,
  AccountRequestDeletionResult,
  ConfirmAccountOpts,
  ConfirmAccountResult,
  ConfirmEmailChangeResult,
  RequestEmailChangeResult,
  SaleorClientMethodsProps,
  UpdateAccountResult,
} from "./types";
import {
  RequestEmailChangeOpts,
  UpdateAccountOpts,
} from "./types";

export interface UserSDK {
  /**
   * Remove user account.
   *
   * @param token - A one-time token required to remove account. Sent by email using AccountRequestDeletion mutation.
   * @returns Deleted user's account data and errors.
   */
  accountDelete: (token: string) => Promise<AccountDeleteResult>;
  /**
   * Sends an email with the account removal link for the logged-in user.
   *
   * @param redirectUrl - URL of a view where users should be redirected to delete their account. URL in RFC 1808 format.
   * @returns Errors if there are some.
   */
  accountRequestDeletion: (
    redirectUrl: string
  ) => Promise<AccountRequestDeletionResult>;
  /**
   * Confirm the email change of the logged-in user.
   *
   * @param token - A one-time token required to change the email.
   * @returns A user instance with a new email and errors.
   */
  confirmEmailChange: (token: string) => Promise<ConfirmEmailChangeResult>;
  /**
   * Request email change of the logged in user.
   *
   * @param opts - Object with new user email, user's password and URL of a view where users should be redirected to update the email address.
   * @returns A user instance and errors.
   */
  requestEmailChange: (
    opts: RequestEmailChangeOpts
  ) => Promise<RequestEmailChangeResult>;
  /**
   * Updates the account of the logged-in account.
   *
   * @param opts - Fields required to update the account of the logged-in account.
   * @returns Updated user account.
   */
  updateAccount: (opts: UpdateAccountOpts) => Promise<UpdateAccountResult>;
  /**
   * Confirms user account with token sent by email during registration.
   *
   * @param opts - Object with email of the user and one-time token required to confirm the account.
   * @returns Confirmed user account.
   */
  confirmAccount: (opts: ConfirmAccountOpts) => Promise<ConfirmAccountResult>;
}

export const user = ({
  apolloClient: client,
  channel,
}: SaleorClientMethodsProps): UserSDK => {
  const _auth = auth({ apolloClient: client, channel });

  const accountDelete: UserSDK["accountDelete"] = async token => {
    const result = await client.mutate<
      AccountDeleteMutation,
      AccountDeleteMutationVariables
    >({
      mutation: DELETE_ACCOUNT,
      variables: { token },
    });

    _auth.logout();

    return result;
  };

  const accountRequestDeletion: UserSDK["accountRequestDeletion"] = async redirectUrl => {
    const result = await client.mutate<
      AccountRequestDeletionMutation,
      AccountRequestDeletionMutationVariables
    >({
      mutation: REQUEST_DELETE_ACCOUNT,
      variables: { channel, redirectUrl },
    });

    return result;
  };

  const confirmEmailChange: UserSDK["confirmEmailChange"] = async token => {
    const result = await client.mutate<
      ConfirmEmailChangeMutation,
      ConfirmEmailChangeMutationVariables
    >({
      mutation: CONFIRM_EMAIL_CHANGE,
      variables: { channel, token },
    });

    return result;
  };

  const requestEmailChange: UserSDK["requestEmailChange"] = async opts => {
    const result = await client.mutate<
      RequestEmailChangeMutation,
      RequestEmailChangeMutationVariables
    >({
      mutation: REQUEST_EMAIL_CHANGE,
      variables: { ...opts, channel: opts.channel || channel },
    });

    return result;
  };

  const updateAccount: UserSDK["updateAccount"] = async opts => {
    const result = await client.mutate<
      AccountUpdateMutation,
      AccountUpdateMutationVariables
    >({
      mutation: UPDATE_ACCOUNT,
      variables: { ...opts },
    });

    return result;
  };

  const confirmAccount: UserSDK["confirmAccount"] = async opts => {
    const result = await client.mutate<
      AccountConfirmMutation,
      AccountConfirmMutationVariables
    >({
      mutation: CONFIRM_ACCOUNT,
      variables: { ...opts },
    });

    return result;
  };

  return {
    accountDelete,
    accountRequestDeletion,
    confirmEmailChange,
    requestEmailChange,
    updateAccount,
    confirmAccount,
  };
};
