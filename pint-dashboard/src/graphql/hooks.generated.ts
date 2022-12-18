/* eslint-disable */
import * as Types from './types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@saleor/hooks/graphql';
const defaultOptions = {} as const;
export const WebhookFragmentDoc = gql`
    fragment Webhook on Webhook {
  id
  name
  isActive
  app {
    id
    name
  }
}
    `;
export const AppFragmentDoc = gql`
    fragment App on App {
  id
  name
  created
  isActive
  type
  homepageUrl
  appUrl
  manifestUrl
  configurationUrl
  supportUrl
  version
  accessToken
  privateMetadata {
    key
    value
  }
  metadata {
    key
    value
  }
  tokens {
    authToken
    id
    name
  }
  webhooks {
    ...Webhook
  }
}
    ${WebhookFragmentDoc}`;
export const AppPermissionFragmentDoc = gql`
    fragment AppPermission on Permission {
  name
  code
}
    `;
export const AppListItemFragmentDoc = gql`
    fragment AppListItem on App {
  id
  name
  isActive
  type
  appUrl
  manifestUrl
  permissions {
    ...AppPermission
  }
}
    ${AppPermissionFragmentDoc}`;
export const UserPermissionFragmentDoc = gql`
    fragment UserPermission on UserPermission {
  code
  name
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  firstName
  lastName
  isStaff
  userPermissions {
    ...UserPermission
  }
  avatar {
    url
  }
}
    ${UserPermissionFragmentDoc}`;
export const UserBaseFragmentDoc = gql`
    fragment UserBase on User {
  id
  firstName
  lastName
}
    `;
export const AccountErrorFragmentFragmentDoc = gql`
    fragment AccountErrorFragment on AccountError {
  code
  field
  message
}
    `;
export const UserBaseFragmentFragmentDoc = gql`
    fragment UserBaseFragment on User {
  id
  email
  firstName
  lastName
  isStaff
}
    `;
export const UserDetailsFragmentFragmentDoc = gql`
    fragment UserDetailsFragment on User {
  ...UserBaseFragment
  metadata {
    key
    value
  }
}
    ${UserBaseFragmentFragmentDoc}`;
export const CustomerFragmentDoc = gql`
    fragment Customer on User {
  id
  email
  firstName
  lastName
}
    `;
export const MetadataItemFragmentDoc = gql`
    fragment MetadataItem on MetadataItem {
  key
  value
}
    `;
export const MetadataFragmentDoc = gql`
    fragment Metadata on ObjectWithMetadata {
  metadata {
    ...MetadataItem
  }
  privateMetadata {
    ...MetadataItem
  }
}
    ${MetadataItemFragmentDoc}`;
export const CustomerDetailsFragmentDoc = gql`
    fragment CustomerDetails on User {
  ...Customer
  ...Metadata
  dateJoined
  lastLogin
  note
  isActive
}
    ${CustomerFragmentDoc}
${MetadataFragmentDoc}`;
export const InitiativeErrorFragmentDoc = gql`
    fragment InitiativeError on InitiativeError {
  code
  field
  message
}
    `;
export const AccountErrorFragmentDoc = gql`
    fragment AccountError on AccountError {
  code
  field
  message
}
    `;
export const PermissionGroupErrorFragmentDoc = gql`
    fragment PermissionGroupError on PermissionGroupError {
  code
  field
  message
}
    `;
export const StaffErrorFragmentDoc = gql`
    fragment StaffError on StaffError {
  code
  field
  message
}
    `;
export const WebhookErrorFragmentDoc = gql`
    fragment WebhookError on WebhookError {
  code
  field
  message
}
    `;
export const AppErrorFragmentDoc = gql`
    fragment AppError on AppError {
  field
  message
  code
  permissions
}
    `;
export const ExportErrorFragmentDoc = gql`
    fragment ExportError on ExportError {
  code
  field
  message
}
    `;
export const MetadataErrorFragmentDoc = gql`
    fragment MetadataError on MetadataError {
  code
  field
  message
}
    `;
export const UploadErrorFragmentDoc = gql`
    fragment UploadError on UploadError {
  code
  field
  message
}
    `;
export const InitiativeTypeDeleteErrorFragmentFragmentDoc = gql`
    fragment InitiativeTypeDeleteErrorFragment on InitiativeError {
  code
  field
  message
}
    `;
export const InitiativeTypeBulkDeleteErrorFragmentFragmentDoc = gql`
    fragment InitiativeTypeBulkDeleteErrorFragment on InitiativeError {
  code
  field
  message
}
    `;
export const InitiativeTypeBulkUpdateErrorFragmentFragmentDoc = gql`
    fragment InitiativeTypeBulkUpdateErrorFragment on InitiativeError {
  code
  field
  message
}
    `;
export const InitiativeAttributeAssignErrorFragmentFragmentDoc = gql`
    fragment InitiativeAttributeAssignErrorFragment on InitiativeError {
  code
  field
  message
}
    `;
export const InitiativeAttributeUnassignErrorFragmentFragmentDoc = gql`
    fragment InitiativeAttributeUnassignErrorFragment on InitiativeError {
  code
  field
  message
}
    `;
export const InitiativeTypeCreateErrorFragmentFragmentDoc = gql`
    fragment InitiativeTypeCreateErrorFragment on InitiativeError {
  code
  field
  message
}
    `;
export const InitiativeTypeReorderAttributesErrorFragmentFragmentDoc = gql`
    fragment InitiativeTypeReorderAttributesErrorFragment on InitiativeError {
  code
  field
  message
}
    `;
export const InitiativeAttributeAssignmentUpdateErrorFragmentFragmentDoc = gql`
    fragment InitiativeAttributeAssignmentUpdateErrorFragment on InitiativeError {
  code
  field
  message
  attributes
}
    `;
export const InitiativeTranslateErrorFragmentFragmentDoc = gql`
    fragment InitiativeTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const InitiativeVariantTranslateErrorFragmentFragmentDoc = gql`
    fragment InitiativeVariantTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const CategoryTranslateErrorFragmentFragmentDoc = gql`
    fragment CategoryTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const CollectionTranslateErrorFragmentFragmentDoc = gql`
    fragment CollectionTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const PageTranslateErrorFragmentFragmentDoc = gql`
    fragment PageTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const VoucherTranslateErrorFragmentFragmentDoc = gql`
    fragment VoucherTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const SaleTranslateErrorFragmentFragmentDoc = gql`
    fragment SaleTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const AttributeTranslateErrorFragmentFragmentDoc = gql`
    fragment AttributeTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const AttributeValueTranslateErrorFragmentFragmentDoc = gql`
    fragment AttributeValueTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const ShippingPriceTranslateErrorFragmentFragmentDoc = gql`
    fragment ShippingPriceTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const FileFragmentDoc = gql`
    fragment File on File {
  url
  contentType
}
    `;
export const InitiativeWithChannelListingsFragmentDoc = gql`
    fragment InitiativeWithChannelListings on Initiative {
  id
  title
  thumbnail {
    url
  }
}
    `;
export const InitiativeMediaFragmentDoc = gql`
    fragment InitiativeMedia on InitiativeMedia {
  id
  alt
  sortOrder
  url
  type
  oembedData
}
    `;
export const InitiativeFragmentDoc = gql`
    fragment Initiative on Initiative {
  ...Metadata
  title
  slug
  description
  seoTitle
  seoDescription
  media {
    ...InitiativeMedia
  }
}
    ${MetadataFragmentDoc}
${InitiativeMediaFragmentDoc}`;
export const ExportFileFragmentDoc = gql`
    fragment ExportFile on ExportFile {
  id
  status
  url
}
    `;
export const PermissionGroupFragmentDoc = gql`
    fragment PermissionGroup on Group {
  id
  name
  userCanManage
  users {
    id
    firstName
    lastName
  }
}
    `;
export const PermissionFragmentDoc = gql`
    fragment Permission on Permission {
  code
  name
}
    `;
export const StaffMemberFragmentDoc = gql`
    fragment StaffMember on User {
  id
  email
  firstName
  isActive
  lastName
}
    `;
export const PermissionGroupMemberFragmentDoc = gql`
    fragment PermissionGroupMember on User {
  ...StaffMember
  avatar(size: 48) {
    url
  }
}
    ${StaffMemberFragmentDoc}`;
export const PermissionGroupDetailsFragmentDoc = gql`
    fragment PermissionGroupDetails on Group {
  ...PermissionGroup
  permissions {
    ...Permission
  }
  users {
    ...PermissionGroupMember
  }
}
    ${PermissionGroupFragmentDoc}
${PermissionFragmentDoc}
${PermissionGroupMemberFragmentDoc}`;
export const StaffMemberDetailsFragmentDoc = gql`
    fragment StaffMemberDetails on User {
  ...StaffMember
  permissionGroups {
    id
    name
    userCanManage
  }
  userPermissions {
    code
    name
  }
  avatar(size: 120) {
    url
  }
}
    ${StaffMemberFragmentDoc}`;
export const InitiativeTranslationFragmentDoc = gql`
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
export const WebhooksDetailsFragmentDoc = gql`
    fragment WebhooksDetails on Webhook {
  ...Webhook
}
    ${WebhookFragmentDoc}`;
export const AppCreateDocument = gql`
    mutation AppCreate($input: AppInput!) {
  appCreate(input: $input) {
    authToken
    app {
      ...App
    }
    errors {
      ...AppError
    }
  }
}
    ${AppFragmentDoc}
${AppErrorFragmentDoc}`;
export type AppCreateMutationFn = Apollo.MutationFunction<Types.AppCreateMutation, Types.AppCreateMutationVariables>;

/**
 * __useAppCreateMutation__
 *
 * To run a mutation, you first call `useAppCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appCreateMutation, { data, loading, error }] = useAppCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAppCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppCreateMutation, Types.AppCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppCreateMutation, Types.AppCreateMutationVariables>(AppCreateDocument, options);
      }
export type AppCreateMutationHookResult = ReturnType<typeof useAppCreateMutation>;
export type AppCreateMutationResult = Apollo.MutationResult<Types.AppCreateMutation>;
export type AppCreateMutationOptions = Apollo.BaseMutationOptions<Types.AppCreateMutation, Types.AppCreateMutationVariables>;
export const AppDeleteDocument = gql`
    mutation AppDelete($id: ID!) {
  appDelete(id: $id) {
    app {
      ...App
    }
    errors {
      ...AppError
    }
  }
}
    ${AppFragmentDoc}
${AppErrorFragmentDoc}`;
export type AppDeleteMutationFn = Apollo.MutationFunction<Types.AppDeleteMutation, Types.AppDeleteMutationVariables>;

/**
 * __useAppDeleteMutation__
 *
 * To run a mutation, you first call `useAppDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appDeleteMutation, { data, loading, error }] = useAppDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAppDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppDeleteMutation, Types.AppDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppDeleteMutation, Types.AppDeleteMutationVariables>(AppDeleteDocument, options);
      }
export type AppDeleteMutationHookResult = ReturnType<typeof useAppDeleteMutation>;
export type AppDeleteMutationResult = Apollo.MutationResult<Types.AppDeleteMutation>;
export type AppDeleteMutationOptions = Apollo.BaseMutationOptions<Types.AppDeleteMutation, Types.AppDeleteMutationVariables>;
export const AppDeleteFailedInstallationDocument = gql`
    mutation AppDeleteFailedInstallation($id: ID!) {
  appDeleteFailedInstallation(id: $id) {
    appInstallation {
      id
      status
      appName
      message
    }
    errors {
      ...AppError
    }
  }
}
    ${AppErrorFragmentDoc}`;
export type AppDeleteFailedInstallationMutationFn = Apollo.MutationFunction<Types.AppDeleteFailedInstallationMutation, Types.AppDeleteFailedInstallationMutationVariables>;

/**
 * __useAppDeleteFailedInstallationMutation__
 *
 * To run a mutation, you first call `useAppDeleteFailedInstallationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppDeleteFailedInstallationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appDeleteFailedInstallationMutation, { data, loading, error }] = useAppDeleteFailedInstallationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAppDeleteFailedInstallationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppDeleteFailedInstallationMutation, Types.AppDeleteFailedInstallationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppDeleteFailedInstallationMutation, Types.AppDeleteFailedInstallationMutationVariables>(AppDeleteFailedInstallationDocument, options);
      }
export type AppDeleteFailedInstallationMutationHookResult = ReturnType<typeof useAppDeleteFailedInstallationMutation>;
export type AppDeleteFailedInstallationMutationResult = Apollo.MutationResult<Types.AppDeleteFailedInstallationMutation>;
export type AppDeleteFailedInstallationMutationOptions = Apollo.BaseMutationOptions<Types.AppDeleteFailedInstallationMutation, Types.AppDeleteFailedInstallationMutationVariables>;
export const AppFetchDocument = gql`
    mutation AppFetch($manifestUrl: String!) {
  appFetchManifest(manifestUrl: $manifestUrl) {
    manifest {
      identifier
      version
      about
      name
      appUrl
      configurationUrl
      tokenTargetUrl
      dataPrivacy
      dataPrivacyUrl
      homepageUrl
      supportUrl
      permissions {
        code
        name
      }
    }
    errors {
      ...AppError
    }
  }
}
    ${AppErrorFragmentDoc}`;
export type AppFetchMutationFn = Apollo.MutationFunction<Types.AppFetchMutation, Types.AppFetchMutationVariables>;

/**
 * __useAppFetchMutation__
 *
 * To run a mutation, you first call `useAppFetchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppFetchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appFetchMutation, { data, loading, error }] = useAppFetchMutation({
 *   variables: {
 *      manifestUrl: // value for 'manifestUrl'
 *   },
 * });
 */
export function useAppFetchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppFetchMutation, Types.AppFetchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppFetchMutation, Types.AppFetchMutationVariables>(AppFetchDocument, options);
      }
export type AppFetchMutationHookResult = ReturnType<typeof useAppFetchMutation>;
export type AppFetchMutationResult = Apollo.MutationResult<Types.AppFetchMutation>;
export type AppFetchMutationOptions = Apollo.BaseMutationOptions<Types.AppFetchMutation, Types.AppFetchMutationVariables>;
export const AppInstallDocument = gql`
    mutation AppInstall($input: AppInstallInput!) {
  appInstall(input: $input) {
    appInstallation {
      id
      status
      appName
      manifestUrl
    }
    errors {
      ...AppError
    }
  }
}
    ${AppErrorFragmentDoc}`;
export type AppInstallMutationFn = Apollo.MutationFunction<Types.AppInstallMutation, Types.AppInstallMutationVariables>;

/**
 * __useAppInstallMutation__
 *
 * To run a mutation, you first call `useAppInstallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppInstallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appInstallMutation, { data, loading, error }] = useAppInstallMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAppInstallMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppInstallMutation, Types.AppInstallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppInstallMutation, Types.AppInstallMutationVariables>(AppInstallDocument, options);
      }
export type AppInstallMutationHookResult = ReturnType<typeof useAppInstallMutation>;
export type AppInstallMutationResult = Apollo.MutationResult<Types.AppInstallMutation>;
export type AppInstallMutationOptions = Apollo.BaseMutationOptions<Types.AppInstallMutation, Types.AppInstallMutationVariables>;
export const AppRetryInstallDocument = gql`
    mutation AppRetryInstall($id: ID!) {
  appRetryInstall(id: $id) {
    appInstallation {
      id
      status
      appName
      manifestUrl
    }
    errors {
      ...AppError
    }
  }
}
    ${AppErrorFragmentDoc}`;
export type AppRetryInstallMutationFn = Apollo.MutationFunction<Types.AppRetryInstallMutation, Types.AppRetryInstallMutationVariables>;

/**
 * __useAppRetryInstallMutation__
 *
 * To run a mutation, you first call `useAppRetryInstallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppRetryInstallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appRetryInstallMutation, { data, loading, error }] = useAppRetryInstallMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAppRetryInstallMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppRetryInstallMutation, Types.AppRetryInstallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppRetryInstallMutation, Types.AppRetryInstallMutationVariables>(AppRetryInstallDocument, options);
      }
export type AppRetryInstallMutationHookResult = ReturnType<typeof useAppRetryInstallMutation>;
export type AppRetryInstallMutationResult = Apollo.MutationResult<Types.AppRetryInstallMutation>;
export type AppRetryInstallMutationOptions = Apollo.BaseMutationOptions<Types.AppRetryInstallMutation, Types.AppRetryInstallMutationVariables>;
export const AppUpdateDocument = gql`
    mutation AppUpdate($id: ID!, $input: AppInput!) {
  appUpdate(id: $id, input: $input) {
    app {
      ...App
      permissions {
        code
        name
      }
    }
    errors {
      ...AppError
      message
      permissions
    }
  }
}
    ${AppFragmentDoc}
${AppErrorFragmentDoc}`;
export type AppUpdateMutationFn = Apollo.MutationFunction<Types.AppUpdateMutation, Types.AppUpdateMutationVariables>;

/**
 * __useAppUpdateMutation__
 *
 * To run a mutation, you first call `useAppUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appUpdateMutation, { data, loading, error }] = useAppUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAppUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppUpdateMutation, Types.AppUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppUpdateMutation, Types.AppUpdateMutationVariables>(AppUpdateDocument, options);
      }
export type AppUpdateMutationHookResult = ReturnType<typeof useAppUpdateMutation>;
export type AppUpdateMutationResult = Apollo.MutationResult<Types.AppUpdateMutation>;
export type AppUpdateMutationOptions = Apollo.BaseMutationOptions<Types.AppUpdateMutation, Types.AppUpdateMutationVariables>;
export const AppTokenCreateDocument = gql`
    mutation AppTokenCreate($input: AppTokenInput!) {
  appTokenCreate(input: $input) {
    appToken {
      name
      authToken
      id
    }
    authToken
    errors {
      ...AppError
    }
  }
}
    ${AppErrorFragmentDoc}`;
export type AppTokenCreateMutationFn = Apollo.MutationFunction<Types.AppTokenCreateMutation, Types.AppTokenCreateMutationVariables>;

/**
 * __useAppTokenCreateMutation__
 *
 * To run a mutation, you first call `useAppTokenCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppTokenCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appTokenCreateMutation, { data, loading, error }] = useAppTokenCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAppTokenCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppTokenCreateMutation, Types.AppTokenCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppTokenCreateMutation, Types.AppTokenCreateMutationVariables>(AppTokenCreateDocument, options);
      }
export type AppTokenCreateMutationHookResult = ReturnType<typeof useAppTokenCreateMutation>;
export type AppTokenCreateMutationResult = Apollo.MutationResult<Types.AppTokenCreateMutation>;
export type AppTokenCreateMutationOptions = Apollo.BaseMutationOptions<Types.AppTokenCreateMutation, Types.AppTokenCreateMutationVariables>;
export const AppTokenDeleteDocument = gql`
    mutation AppTokenDelete($id: ID!) {
  appTokenDelete(id: $id) {
    appToken {
      name
      authToken
      id
    }
    errors {
      ...AppError
    }
  }
}
    ${AppErrorFragmentDoc}`;
export type AppTokenDeleteMutationFn = Apollo.MutationFunction<Types.AppTokenDeleteMutation, Types.AppTokenDeleteMutationVariables>;

/**
 * __useAppTokenDeleteMutation__
 *
 * To run a mutation, you first call `useAppTokenDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppTokenDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appTokenDeleteMutation, { data, loading, error }] = useAppTokenDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAppTokenDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppTokenDeleteMutation, Types.AppTokenDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppTokenDeleteMutation, Types.AppTokenDeleteMutationVariables>(AppTokenDeleteDocument, options);
      }
export type AppTokenDeleteMutationHookResult = ReturnType<typeof useAppTokenDeleteMutation>;
export type AppTokenDeleteMutationResult = Apollo.MutationResult<Types.AppTokenDeleteMutation>;
export type AppTokenDeleteMutationOptions = Apollo.BaseMutationOptions<Types.AppTokenDeleteMutation, Types.AppTokenDeleteMutationVariables>;
export const AppActivateDocument = gql`
    mutation AppActivate($id: ID!) {
  appActivate(id: $id) {
    errors {
      ...AppError
    }
  }
}
    ${AppErrorFragmentDoc}`;
export type AppActivateMutationFn = Apollo.MutationFunction<Types.AppActivateMutation, Types.AppActivateMutationVariables>;

/**
 * __useAppActivateMutation__
 *
 * To run a mutation, you first call `useAppActivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppActivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appActivateMutation, { data, loading, error }] = useAppActivateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAppActivateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppActivateMutation, Types.AppActivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppActivateMutation, Types.AppActivateMutationVariables>(AppActivateDocument, options);
      }
export type AppActivateMutationHookResult = ReturnType<typeof useAppActivateMutation>;
export type AppActivateMutationResult = Apollo.MutationResult<Types.AppActivateMutation>;
export type AppActivateMutationOptions = Apollo.BaseMutationOptions<Types.AppActivateMutation, Types.AppActivateMutationVariables>;
export const AppDeactivateDocument = gql`
    mutation AppDeactivate($id: ID!) {
  appDeactivate(id: $id) {
    errors {
      ...AppError
    }
  }
}
    ${AppErrorFragmentDoc}`;
export type AppDeactivateMutationFn = Apollo.MutationFunction<Types.AppDeactivateMutation, Types.AppDeactivateMutationVariables>;

/**
 * __useAppDeactivateMutation__
 *
 * To run a mutation, you first call `useAppDeactivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppDeactivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appDeactivateMutation, { data, loading, error }] = useAppDeactivateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAppDeactivateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AppDeactivateMutation, Types.AppDeactivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AppDeactivateMutation, Types.AppDeactivateMutationVariables>(AppDeactivateDocument, options);
      }
export type AppDeactivateMutationHookResult = ReturnType<typeof useAppDeactivateMutation>;
export type AppDeactivateMutationResult = Apollo.MutationResult<Types.AppDeactivateMutation>;
export type AppDeactivateMutationOptions = Apollo.BaseMutationOptions<Types.AppDeactivateMutation, Types.AppDeactivateMutationVariables>;
export const AppsListDocument = gql`
    query AppsList($before: String, $after: String, $first: Int, $last: Int, $sort: AppSortingInput, $filter: AppFilterInput) {
  apps(
    before: $before
    after: $after
    first: $first
    last: $last
    sortBy: $sort
    filter: $filter
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      node {
        ...AppListItem
      }
    }
  }
}
    ${AppListItemFragmentDoc}`;

/**
 * __useAppsListQuery__
 *
 * To run a query within a React component, call `useAppsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppsListQuery({
 *   variables: {
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAppsListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.AppsListQuery, Types.AppsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.AppsListQuery, Types.AppsListQueryVariables>(AppsListDocument, options);
      }
export function useAppsListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.AppsListQuery, Types.AppsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.AppsListQuery, Types.AppsListQueryVariables>(AppsListDocument, options);
        }
export type AppsListQueryHookResult = ReturnType<typeof useAppsListQuery>;
export type AppsListLazyQueryHookResult = ReturnType<typeof useAppsListLazyQuery>;
export type AppsListQueryResult = Apollo.QueryResult<Types.AppsListQuery, Types.AppsListQueryVariables>;
export const AppsInstallationsDocument = gql`
    query AppsInstallations {
  appsInstallations {
    status
    message
    appName
    manifestUrl
    id
  }
}
    `;

/**
 * __useAppsInstallationsQuery__
 *
 * To run a query within a React component, call `useAppsInstallationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppsInstallationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppsInstallationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppsInstallationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.AppsInstallationsQuery, Types.AppsInstallationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.AppsInstallationsQuery, Types.AppsInstallationsQueryVariables>(AppsInstallationsDocument, options);
      }
export function useAppsInstallationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.AppsInstallationsQuery, Types.AppsInstallationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.AppsInstallationsQuery, Types.AppsInstallationsQueryVariables>(AppsInstallationsDocument, options);
        }
export type AppsInstallationsQueryHookResult = ReturnType<typeof useAppsInstallationsQuery>;
export type AppsInstallationsLazyQueryHookResult = ReturnType<typeof useAppsInstallationsLazyQuery>;
export type AppsInstallationsQueryResult = Apollo.QueryResult<Types.AppsInstallationsQuery, Types.AppsInstallationsQueryVariables>;
export const AppDocument = gql`
    query App($id: ID!) {
  app(id: $id) {
    ...App
    aboutApp
    permissions {
      code
      name
    }
    dataPrivacy
    dataPrivacyUrl
  }
}
    ${AppFragmentDoc}`;

/**
 * __useAppQuery__
 *
 * To run a query within a React component, call `useAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAppQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.AppQuery, Types.AppQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.AppQuery, Types.AppQueryVariables>(AppDocument, options);
      }
export function useAppLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.AppQuery, Types.AppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.AppQuery, Types.AppQueryVariables>(AppDocument, options);
        }
export type AppQueryHookResult = ReturnType<typeof useAppQuery>;
export type AppLazyQueryHookResult = ReturnType<typeof useAppLazyQuery>;
export type AppQueryResult = Apollo.QueryResult<Types.AppQuery, Types.AppQueryVariables>;
export const ExtensionListDocument = gql`
    query ExtensionList($filter: AppExtensionFilterInput!) {
  appExtensions(filter: $filter, first: 100) {
    edges {
      node {
        id
        label
        url
        mount
        target
        accessToken
        permissions {
          code
        }
        app {
          id
          appUrl
        }
      }
    }
  }
}
    `;

/**
 * __useExtensionListQuery__
 *
 * To run a query within a React component, call `useExtensionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useExtensionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExtensionListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExtensionListQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.ExtensionListQuery, Types.ExtensionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ExtensionListQuery, Types.ExtensionListQueryVariables>(ExtensionListDocument, options);
      }
export function useExtensionListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ExtensionListQuery, Types.ExtensionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ExtensionListQuery, Types.ExtensionListQueryVariables>(ExtensionListDocument, options);
        }
export type ExtensionListQueryHookResult = ReturnType<typeof useExtensionListQuery>;
export type ExtensionListLazyQueryHookResult = ReturnType<typeof useExtensionListLazyQuery>;
export type ExtensionListQueryResult = Apollo.QueryResult<Types.ExtensionListQuery, Types.ExtensionListQueryVariables>;
export const UserDetailsDocument = gql`
    query UserDetails {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserDetailsQuery__
 *
 * To run a query within a React component, call `useUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>(UserDetailsDocument, options);
      }
export function useUserDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>(UserDetailsDocument, options);
        }
export type UserDetailsQueryHookResult = ReturnType<typeof useUserDetailsQuery>;
export type UserDetailsLazyQueryHookResult = ReturnType<typeof useUserDetailsLazyQuery>;
export type UserDetailsQueryResult = Apollo.QueryResult<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>;
export const SearchCatalogDocument = gql`
    query SearchCatalog($first: Int!, $query: String!) {
  initiatives(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useSearchCatalogQuery__
 *
 * To run a query within a React component, call `useSearchCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCatalogQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchCatalogQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>(SearchCatalogDocument, options);
      }
export function useSearchCatalogLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>(SearchCatalogDocument, options);
        }
export type SearchCatalogQueryHookResult = ReturnType<typeof useSearchCatalogQuery>;
export type SearchCatalogLazyQueryHookResult = ReturnType<typeof useSearchCatalogLazyQuery>;
export type SearchCatalogQueryResult = Apollo.QueryResult<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>;
export const UpdateCustomerDocument = gql`
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
    ${AccountErrorFragmentDoc}
${CustomerDetailsFragmentDoc}`;
export type UpdateCustomerMutationFn = Apollo.MutationFunction<Types.UpdateCustomerMutation, Types.UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateCustomerMutation, Types.UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateCustomerMutation, Types.UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<Types.UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<Types.UpdateCustomerMutation, Types.UpdateCustomerMutationVariables>;
export const CreateCustomerDocument = gql`
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
    ${AccountErrorFragmentDoc}`;
export type CreateCustomerMutationFn = Apollo.MutationFunction<Types.CreateCustomerMutation, Types.CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.CreateCustomerMutation, Types.CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.CreateCustomerMutation, Types.CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<Types.CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<Types.CreateCustomerMutation, Types.CreateCustomerMutationVariables>;
export const RemoveCustomerDocument = gql`
    mutation RemoveCustomer($id: ID!) {
  customerDelete(id: $id) {
    errors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type RemoveCustomerMutationFn = Apollo.MutationFunction<Types.RemoveCustomerMutation, Types.RemoveCustomerMutationVariables>;

/**
 * __useRemoveCustomerMutation__
 *
 * To run a mutation, you first call `useRemoveCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCustomerMutation, { data, loading, error }] = useRemoveCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.RemoveCustomerMutation, Types.RemoveCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.RemoveCustomerMutation, Types.RemoveCustomerMutationVariables>(RemoveCustomerDocument, options);
      }
export type RemoveCustomerMutationHookResult = ReturnType<typeof useRemoveCustomerMutation>;
export type RemoveCustomerMutationResult = Apollo.MutationResult<Types.RemoveCustomerMutation>;
export type RemoveCustomerMutationOptions = Apollo.BaseMutationOptions<Types.RemoveCustomerMutation, Types.RemoveCustomerMutationVariables>;
export const BulkRemoveCustomersDocument = gql`
    mutation BulkRemoveCustomers($ids: [ID!]!) {
  customerBulkDelete(ids: $ids) {
    errors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type BulkRemoveCustomersMutationFn = Apollo.MutationFunction<Types.BulkRemoveCustomersMutation, Types.BulkRemoveCustomersMutationVariables>;

/**
 * __useBulkRemoveCustomersMutation__
 *
 * To run a mutation, you first call `useBulkRemoveCustomersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveCustomersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveCustomersMutation, { data, loading, error }] = useBulkRemoveCustomersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkRemoveCustomersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.BulkRemoveCustomersMutation, Types.BulkRemoveCustomersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.BulkRemoveCustomersMutation, Types.BulkRemoveCustomersMutationVariables>(BulkRemoveCustomersDocument, options);
      }
export type BulkRemoveCustomersMutationHookResult = ReturnType<typeof useBulkRemoveCustomersMutation>;
export type BulkRemoveCustomersMutationResult = Apollo.MutationResult<Types.BulkRemoveCustomersMutation>;
export type BulkRemoveCustomersMutationOptions = Apollo.BaseMutationOptions<Types.BulkRemoveCustomersMutation, Types.BulkRemoveCustomersMutationVariables>;
export const FileUploadDocument = gql`
    mutation FileUpload($file: Upload!) {
  fileUpload(file: $file) {
    uploadedFile {
      ...File
    }
    errors {
      ...UploadError
    }
  }
}
    ${FileFragmentDoc}
${UploadErrorFragmentDoc}`;
export type FileUploadMutationFn = Apollo.MutationFunction<Types.FileUploadMutation, Types.FileUploadMutationVariables>;

/**
 * __useFileUploadMutation__
 *
 * To run a mutation, you first call `useFileUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFileUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fileUploadMutation, { data, loading, error }] = useFileUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useFileUploadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.FileUploadMutation, Types.FileUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.FileUploadMutation, Types.FileUploadMutationVariables>(FileUploadDocument, options);
      }
export type FileUploadMutationHookResult = ReturnType<typeof useFileUploadMutation>;
export type FileUploadMutationResult = Apollo.MutationResult<Types.FileUploadMutation>;
export type FileUploadMutationOptions = Apollo.BaseMutationOptions<Types.FileUploadMutation, Types.FileUploadMutationVariables>;
export const InitiativeMediaCreateDocument = gql`
    mutation InitiativeMediaCreate($initiative: ID!, $image: Upload, $alt: String, $mediaUrl: String) {
  initiativeMediaCreate(
    input: {alt: $alt, image: $image, initiative: $initiative, mediaUrl: $mediaUrl}
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
    ${InitiativeErrorFragmentDoc}
${InitiativeMediaFragmentDoc}`;
export type InitiativeMediaCreateMutationFn = Apollo.MutationFunction<Types.InitiativeMediaCreateMutation, Types.InitiativeMediaCreateMutationVariables>;

/**
 * __useInitiativeMediaCreateMutation__
 *
 * To run a mutation, you first call `useInitiativeMediaCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiativeMediaCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiativeMediaCreateMutation, { data, loading, error }] = useInitiativeMediaCreateMutation({
 *   variables: {
 *      initiative: // value for 'initiative'
 *      image: // value for 'image'
 *      alt: // value for 'alt'
 *      mediaUrl: // value for 'mediaUrl'
 *   },
 * });
 */
export function useInitiativeMediaCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.InitiativeMediaCreateMutation, Types.InitiativeMediaCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.InitiativeMediaCreateMutation, Types.InitiativeMediaCreateMutationVariables>(InitiativeMediaCreateDocument, options);
      }
export type InitiativeMediaCreateMutationHookResult = ReturnType<typeof useInitiativeMediaCreateMutation>;
export type InitiativeMediaCreateMutationResult = Apollo.MutationResult<Types.InitiativeMediaCreateMutation>;
export type InitiativeMediaCreateMutationOptions = Apollo.BaseMutationOptions<Types.InitiativeMediaCreateMutation, Types.InitiativeMediaCreateMutationVariables>;
export const InitiativeDeleteDocument = gql`
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
    ${InitiativeErrorFragmentDoc}`;
export type InitiativeDeleteMutationFn = Apollo.MutationFunction<Types.InitiativeDeleteMutation, Types.InitiativeDeleteMutationVariables>;

/**
 * __useInitiativeDeleteMutation__
 *
 * To run a mutation, you first call `useInitiativeDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiativeDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiativeDeleteMutation, { data, loading, error }] = useInitiativeDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInitiativeDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.InitiativeDeleteMutation, Types.InitiativeDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.InitiativeDeleteMutation, Types.InitiativeDeleteMutationVariables>(InitiativeDeleteDocument, options);
      }
export type InitiativeDeleteMutationHookResult = ReturnType<typeof useInitiativeDeleteMutation>;
export type InitiativeDeleteMutationResult = Apollo.MutationResult<Types.InitiativeDeleteMutation>;
export type InitiativeDeleteMutationOptions = Apollo.BaseMutationOptions<Types.InitiativeDeleteMutation, Types.InitiativeDeleteMutationVariables>;
export const InitiativeMediaReorderDocument = gql`
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
    ${InitiativeErrorFragmentDoc}`;
export type InitiativeMediaReorderMutationFn = Apollo.MutationFunction<Types.InitiativeMediaReorderMutation, Types.InitiativeMediaReorderMutationVariables>;

/**
 * __useInitiativeMediaReorderMutation__
 *
 * To run a mutation, you first call `useInitiativeMediaReorderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiativeMediaReorderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiativeMediaReorderMutation, { data, loading, error }] = useInitiativeMediaReorderMutation({
 *   variables: {
 *      initiativeId: // value for 'initiativeId'
 *      mediaIds: // value for 'mediaIds'
 *   },
 * });
 */
export function useInitiativeMediaReorderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.InitiativeMediaReorderMutation, Types.InitiativeMediaReorderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.InitiativeMediaReorderMutation, Types.InitiativeMediaReorderMutationVariables>(InitiativeMediaReorderDocument, options);
      }
export type InitiativeMediaReorderMutationHookResult = ReturnType<typeof useInitiativeMediaReorderMutation>;
export type InitiativeMediaReorderMutationResult = Apollo.MutationResult<Types.InitiativeMediaReorderMutation>;
export type InitiativeMediaReorderMutationOptions = Apollo.BaseMutationOptions<Types.InitiativeMediaReorderMutation, Types.InitiativeMediaReorderMutationVariables>;
export const InitiativeUpdateDocument = gql`
    mutation InitiativeUpdate($id: ID!, $input: InitiativeInput!) {
  initiativeUpdate(id: $id, input: $input) {
    errors {
      ...InitiativeError
    }
  }
}
    ${InitiativeErrorFragmentDoc}`;
export type InitiativeUpdateMutationFn = Apollo.MutationFunction<Types.InitiativeUpdateMutation, Types.InitiativeUpdateMutationVariables>;

/**
 * __useInitiativeUpdateMutation__
 *
 * To run a mutation, you first call `useInitiativeUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiativeUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiativeUpdateMutation, { data, loading, error }] = useInitiativeUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInitiativeUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.InitiativeUpdateMutation, Types.InitiativeUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.InitiativeUpdateMutation, Types.InitiativeUpdateMutationVariables>(InitiativeUpdateDocument, options);
      }
export type InitiativeUpdateMutationHookResult = ReturnType<typeof useInitiativeUpdateMutation>;
export type InitiativeUpdateMutationResult = Apollo.MutationResult<Types.InitiativeUpdateMutation>;
export type InitiativeUpdateMutationOptions = Apollo.BaseMutationOptions<Types.InitiativeUpdateMutation, Types.InitiativeUpdateMutationVariables>;
export const InitiativeCreateDocument = gql`
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
    ${InitiativeErrorFragmentDoc}`;
export type InitiativeCreateMutationFn = Apollo.MutationFunction<Types.InitiativeCreateMutation, Types.InitiativeCreateMutationVariables>;

/**
 * __useInitiativeCreateMutation__
 *
 * To run a mutation, you first call `useInitiativeCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiativeCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiativeCreateMutation, { data, loading, error }] = useInitiativeCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInitiativeCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.InitiativeCreateMutation, Types.InitiativeCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.InitiativeCreateMutation, Types.InitiativeCreateMutationVariables>(InitiativeCreateDocument, options);
      }
export type InitiativeCreateMutationHookResult = ReturnType<typeof useInitiativeCreateMutation>;
export type InitiativeCreateMutationResult = Apollo.MutationResult<Types.InitiativeCreateMutation>;
export type InitiativeCreateMutationOptions = Apollo.BaseMutationOptions<Types.InitiativeCreateMutation, Types.InitiativeCreateMutationVariables>;
export const InitiativeMediaDeleteDocument = gql`
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
    ${InitiativeErrorFragmentDoc}`;
export type InitiativeMediaDeleteMutationFn = Apollo.MutationFunction<Types.InitiativeMediaDeleteMutation, Types.InitiativeMediaDeleteMutationVariables>;

/**
 * __useInitiativeMediaDeleteMutation__
 *
 * To run a mutation, you first call `useInitiativeMediaDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiativeMediaDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiativeMediaDeleteMutation, { data, loading, error }] = useInitiativeMediaDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInitiativeMediaDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.InitiativeMediaDeleteMutation, Types.InitiativeMediaDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.InitiativeMediaDeleteMutation, Types.InitiativeMediaDeleteMutationVariables>(InitiativeMediaDeleteDocument, options);
      }
export type InitiativeMediaDeleteMutationHookResult = ReturnType<typeof useInitiativeMediaDeleteMutation>;
export type InitiativeMediaDeleteMutationResult = Apollo.MutationResult<Types.InitiativeMediaDeleteMutation>;
export type InitiativeMediaDeleteMutationOptions = Apollo.BaseMutationOptions<Types.InitiativeMediaDeleteMutation, Types.InitiativeMediaDeleteMutationVariables>;
export const InitiativeMediaUpdateDocument = gql`
    mutation InitiativeMediaUpdate($id: ID!, $alt: String!) {
  initiativeMediaUpdate(id: $id, input: {alt: $alt}) {
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
    ${InitiativeErrorFragmentDoc}
${InitiativeMediaFragmentDoc}`;
export type InitiativeMediaUpdateMutationFn = Apollo.MutationFunction<Types.InitiativeMediaUpdateMutation, Types.InitiativeMediaUpdateMutationVariables>;

/**
 * __useInitiativeMediaUpdateMutation__
 *
 * To run a mutation, you first call `useInitiativeMediaUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiativeMediaUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiativeMediaUpdateMutation, { data, loading, error }] = useInitiativeMediaUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      alt: // value for 'alt'
 *   },
 * });
 */
export function useInitiativeMediaUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.InitiativeMediaUpdateMutation, Types.InitiativeMediaUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.InitiativeMediaUpdateMutation, Types.InitiativeMediaUpdateMutationVariables>(InitiativeMediaUpdateDocument, options);
      }
export type InitiativeMediaUpdateMutationHookResult = ReturnType<typeof useInitiativeMediaUpdateMutation>;
export type InitiativeMediaUpdateMutationResult = Apollo.MutationResult<Types.InitiativeMediaUpdateMutation>;
export type InitiativeMediaUpdateMutationOptions = Apollo.BaseMutationOptions<Types.InitiativeMediaUpdateMutation, Types.InitiativeMediaUpdateMutationVariables>;
export const InitiativeBulkDeleteDocument = gql`
    mutation initiativeBulkDelete($ids: [ID!]!) {
  initiativeBulkDelete(ids: $ids) {
    errors {
      ...InitiativeError
    }
  }
}
    ${InitiativeErrorFragmentDoc}`;
export type InitiativeBulkDeleteMutationFn = Apollo.MutationFunction<Types.InitiativeBulkDeleteMutation, Types.InitiativeBulkDeleteMutationVariables>;

/**
 * __useInitiativeBulkDeleteMutation__
 *
 * To run a mutation, you first call `useInitiativeBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiativeBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiativeBulkDeleteMutation, { data, loading, error }] = useInitiativeBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useInitiativeBulkDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.InitiativeBulkDeleteMutation, Types.InitiativeBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.InitiativeBulkDeleteMutation, Types.InitiativeBulkDeleteMutationVariables>(InitiativeBulkDeleteDocument, options);
      }
export type InitiativeBulkDeleteMutationHookResult = ReturnType<typeof useInitiativeBulkDeleteMutation>;
export type InitiativeBulkDeleteMutationResult = Apollo.MutationResult<Types.InitiativeBulkDeleteMutation>;
export type InitiativeBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.InitiativeBulkDeleteMutation, Types.InitiativeBulkDeleteMutationVariables>;
export const InitiativeExportDocument = gql`
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
    ${ExportFileFragmentDoc}
${ExportErrorFragmentDoc}`;
export type InitiativeExportMutationFn = Apollo.MutationFunction<Types.InitiativeExportMutation, Types.InitiativeExportMutationVariables>;

/**
 * __useInitiativeExportMutation__
 *
 * To run a mutation, you first call `useInitiativeExportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiativeExportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiativeExportMutation, { data, loading, error }] = useInitiativeExportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInitiativeExportMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.InitiativeExportMutation, Types.InitiativeExportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.InitiativeExportMutation, Types.InitiativeExportMutationVariables>(InitiativeExportDocument, options);
      }
export type InitiativeExportMutationHookResult = ReturnType<typeof useInitiativeExportMutation>;
export type InitiativeExportMutationResult = Apollo.MutationResult<Types.InitiativeExportMutation>;
export type InitiativeExportMutationOptions = Apollo.BaseMutationOptions<Types.InitiativeExportMutation, Types.InitiativeExportMutationVariables>;
export const InitiativeListDocument = gql`
    query InitiativeList($first: Int, $after: String, $last: Int, $before: String, $filter: InitiativeFilterInput, $sort: InitiativeOrder) {
  initiatives(
    before: $before
    after: $after
    first: $first
    last: $last
    filter: $filter
    sortBy: $sort
  ) {
    edges {
      node {
        ...Initiative
        updatedAt
      }
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
  }
}
    ${InitiativeFragmentDoc}`;

/**
 * __useInitiativeListQuery__
 *
 * To run a query within a React component, call `useInitiativeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativeListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useInitiativeListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.InitiativeListQuery, Types.InitiativeListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.InitiativeListQuery, Types.InitiativeListQueryVariables>(InitiativeListDocument, options);
      }
export function useInitiativeListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.InitiativeListQuery, Types.InitiativeListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.InitiativeListQuery, Types.InitiativeListQueryVariables>(InitiativeListDocument, options);
        }
export type InitiativeListQueryHookResult = ReturnType<typeof useInitiativeListQuery>;
export type InitiativeListLazyQueryHookResult = ReturnType<typeof useInitiativeListLazyQuery>;
export type InitiativeListQueryResult = Apollo.QueryResult<Types.InitiativeListQuery, Types.InitiativeListQueryVariables>;
export const InitiativeCountDocument = gql`
    query InitiativeCount($filter: InitiativeFilterInput) {
  initiatives(filter: $filter) {
    totalCount
  }
}
    `;

/**
 * __useInitiativeCountQuery__
 *
 * To run a query within a React component, call `useInitiativeCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativeCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativeCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useInitiativeCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.InitiativeCountQuery, Types.InitiativeCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.InitiativeCountQuery, Types.InitiativeCountQueryVariables>(InitiativeCountDocument, options);
      }
export function useInitiativeCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.InitiativeCountQuery, Types.InitiativeCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.InitiativeCountQuery, Types.InitiativeCountQueryVariables>(InitiativeCountDocument, options);
        }
export type InitiativeCountQueryHookResult = ReturnType<typeof useInitiativeCountQuery>;
export type InitiativeCountLazyQueryHookResult = ReturnType<typeof useInitiativeCountLazyQuery>;
export type InitiativeCountQueryResult = Apollo.QueryResult<Types.InitiativeCountQuery, Types.InitiativeCountQueryVariables>;
export const InitiativeDetailsDocument = gql`
    query InitiativeDetails($id: ID!, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
  initiative(id: $id) {
    ...Initiative
  }
}
    ${InitiativeFragmentDoc}`;

/**
 * __useInitiativeDetailsQuery__
 *
 * To run a query within a React component, call `useInitiativeDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativeDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativeDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      firstValues: // value for 'firstValues'
 *      afterValues: // value for 'afterValues'
 *      lastValues: // value for 'lastValues'
 *      beforeValues: // value for 'beforeValues'
 *   },
 * });
 */
export function useInitiativeDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.InitiativeDetailsQuery, Types.InitiativeDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.InitiativeDetailsQuery, Types.InitiativeDetailsQueryVariables>(InitiativeDetailsDocument, options);
      }
export function useInitiativeDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.InitiativeDetailsQuery, Types.InitiativeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.InitiativeDetailsQuery, Types.InitiativeDetailsQueryVariables>(InitiativeDetailsDocument, options);
        }
export type InitiativeDetailsQueryHookResult = ReturnType<typeof useInitiativeDetailsQuery>;
export type InitiativeDetailsLazyQueryHookResult = ReturnType<typeof useInitiativeDetailsLazyQuery>;
export type InitiativeDetailsQueryResult = Apollo.QueryResult<Types.InitiativeDetailsQuery, Types.InitiativeDetailsQueryVariables>;
export const InitiativeMediaByIdDocument = gql`
    query InitiativeMediaById($initiativeId: ID!, $mediaId: ID!) {
  initiative(id: $initiativeId) {
    id
    title
    mainImage: mediaById(id: $mediaId) {
      id
      alt
      url
      type
      oembedData
    }
    media {
      id
      url(size: 48)
      alt
      type
      oembedData
    }
  }
}
    `;

/**
 * __useInitiativeMediaByIdQuery__
 *
 * To run a query within a React component, call `useInitiativeMediaByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativeMediaByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativeMediaByIdQuery({
 *   variables: {
 *      initiativeId: // value for 'initiativeId'
 *      mediaId: // value for 'mediaId'
 *   },
 * });
 */
export function useInitiativeMediaByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.InitiativeMediaByIdQuery, Types.InitiativeMediaByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.InitiativeMediaByIdQuery, Types.InitiativeMediaByIdQueryVariables>(InitiativeMediaByIdDocument, options);
      }
export function useInitiativeMediaByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.InitiativeMediaByIdQuery, Types.InitiativeMediaByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.InitiativeMediaByIdQuery, Types.InitiativeMediaByIdQueryVariables>(InitiativeMediaByIdDocument, options);
        }
export type InitiativeMediaByIdQueryHookResult = ReturnType<typeof useInitiativeMediaByIdQuery>;
export type InitiativeMediaByIdLazyQueryHookResult = ReturnType<typeof useInitiativeMediaByIdLazyQuery>;
export type InitiativeMediaByIdQueryResult = Apollo.QueryResult<Types.InitiativeMediaByIdQuery, Types.InitiativeMediaByIdQueryVariables>;
export const PermissionGroupDeleteDocument = gql`
    mutation PermissionGroupDelete($id: ID!) {
  permissionGroupDelete(id: $id) {
    errors {
      ...PermissionGroupError
    }
  }
}
    ${PermissionGroupErrorFragmentDoc}`;
export type PermissionGroupDeleteMutationFn = Apollo.MutationFunction<Types.PermissionGroupDeleteMutation, Types.PermissionGroupDeleteMutationVariables>;

/**
 * __usePermissionGroupDeleteMutation__
 *
 * To run a mutation, you first call `usePermissionGroupDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [permissionGroupDeleteMutation, { data, loading, error }] = usePermissionGroupDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePermissionGroupDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.PermissionGroupDeleteMutation, Types.PermissionGroupDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.PermissionGroupDeleteMutation, Types.PermissionGroupDeleteMutationVariables>(PermissionGroupDeleteDocument, options);
      }
export type PermissionGroupDeleteMutationHookResult = ReturnType<typeof usePermissionGroupDeleteMutation>;
export type PermissionGroupDeleteMutationResult = Apollo.MutationResult<Types.PermissionGroupDeleteMutation>;
export type PermissionGroupDeleteMutationOptions = Apollo.BaseMutationOptions<Types.PermissionGroupDeleteMutation, Types.PermissionGroupDeleteMutationVariables>;
export const PermissionGroupCreateDocument = gql`
    mutation PermissionGroupCreate($input: PermissionGroupCreateInput!) {
  permissionGroupCreate(input: $input) {
    errors {
      ...PermissionGroupError
    }
    group {
      ...PermissionGroupDetails
    }
  }
}
    ${PermissionGroupErrorFragmentDoc}
${PermissionGroupDetailsFragmentDoc}`;
export type PermissionGroupCreateMutationFn = Apollo.MutationFunction<Types.PermissionGroupCreateMutation, Types.PermissionGroupCreateMutationVariables>;

/**
 * __usePermissionGroupCreateMutation__
 *
 * To run a mutation, you first call `usePermissionGroupCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [permissionGroupCreateMutation, { data, loading, error }] = usePermissionGroupCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePermissionGroupCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.PermissionGroupCreateMutation, Types.PermissionGroupCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.PermissionGroupCreateMutation, Types.PermissionGroupCreateMutationVariables>(PermissionGroupCreateDocument, options);
      }
export type PermissionGroupCreateMutationHookResult = ReturnType<typeof usePermissionGroupCreateMutation>;
export type PermissionGroupCreateMutationResult = Apollo.MutationResult<Types.PermissionGroupCreateMutation>;
export type PermissionGroupCreateMutationOptions = Apollo.BaseMutationOptions<Types.PermissionGroupCreateMutation, Types.PermissionGroupCreateMutationVariables>;
export const PermissionGroupUpdateDocument = gql`
    mutation PermissionGroupUpdate($id: ID!, $input: PermissionGroupUpdateInput!) {
  permissionGroupUpdate(id: $id, input: $input) {
    errors {
      ...PermissionGroupError
    }
    group {
      ...PermissionGroupDetails
    }
  }
}
    ${PermissionGroupErrorFragmentDoc}
${PermissionGroupDetailsFragmentDoc}`;
export type PermissionGroupUpdateMutationFn = Apollo.MutationFunction<Types.PermissionGroupUpdateMutation, Types.PermissionGroupUpdateMutationVariables>;

/**
 * __usePermissionGroupUpdateMutation__
 *
 * To run a mutation, you first call `usePermissionGroupUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [permissionGroupUpdateMutation, { data, loading, error }] = usePermissionGroupUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePermissionGroupUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.PermissionGroupUpdateMutation, Types.PermissionGroupUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.PermissionGroupUpdateMutation, Types.PermissionGroupUpdateMutationVariables>(PermissionGroupUpdateDocument, options);
      }
export type PermissionGroupUpdateMutationHookResult = ReturnType<typeof usePermissionGroupUpdateMutation>;
export type PermissionGroupUpdateMutationResult = Apollo.MutationResult<Types.PermissionGroupUpdateMutation>;
export type PermissionGroupUpdateMutationOptions = Apollo.BaseMutationOptions<Types.PermissionGroupUpdateMutation, Types.PermissionGroupUpdateMutationVariables>;
export const PermissionGroupListDocument = gql`
    query PermissionGroupList($after: String, $before: String, $first: Int, $last: Int, $filter: PermissionGroupFilterInput, $sort: PermissionGroupSortingInput) {
  permissionGroups(
    after: $after
    before: $before
    first: $first
    last: $last
    filter: $filter
    sortBy: $sort
  ) {
    edges {
      node {
        ...PermissionGroup
      }
    }
  }
}
    ${PermissionGroupFragmentDoc}`;

/**
 * __usePermissionGroupListQuery__
 *
 * To run a query within a React component, call `usePermissionGroupListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePermissionGroupListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function usePermissionGroupListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>(PermissionGroupListDocument, options);
      }
export function usePermissionGroupListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>(PermissionGroupListDocument, options);
        }
export type PermissionGroupListQueryHookResult = ReturnType<typeof usePermissionGroupListQuery>;
export type PermissionGroupListLazyQueryHookResult = ReturnType<typeof usePermissionGroupListLazyQuery>;
export type PermissionGroupListQueryResult = Apollo.QueryResult<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>;
export const PermissionGroupDetailsDocument = gql`
    query PermissionGroupDetails($id: ID!, $userId: ID!) {
  permissionGroup(id: $id) {
    ...PermissionGroupDetails
  }
  user(id: $userId) {
    editableGroups {
      id
    }
    userPermissions {
      code
      sourcePermissionGroups(userId: $userId) {
        id
      }
    }
  }
}
    ${PermissionGroupDetailsFragmentDoc}`;

/**
 * __usePermissionGroupDetailsQuery__
 *
 * To run a query within a React component, call `usePermissionGroupDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePermissionGroupDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePermissionGroupDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>(PermissionGroupDetailsDocument, options);
      }
export function usePermissionGroupDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>(PermissionGroupDetailsDocument, options);
        }
export type PermissionGroupDetailsQueryHookResult = ReturnType<typeof usePermissionGroupDetailsQuery>;
export type PermissionGroupDetailsLazyQueryHookResult = ReturnType<typeof usePermissionGroupDetailsLazyQuery>;
export type PermissionGroupDetailsQueryResult = Apollo.QueryResult<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>;
export const LoginWithoutDetailsDocument = gql`
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
    ${AccountErrorFragmentFragmentDoc}
${UserBaseFragmentFragmentDoc}`;
export type LoginWithoutDetailsMutationFn = Apollo.MutationFunction<Types.LoginWithoutDetailsMutation, Types.LoginWithoutDetailsMutationVariables>;

/**
 * __useLoginWithoutDetailsMutation__
 *
 * To run a mutation, you first call `useLoginWithoutDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithoutDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithoutDetailsMutation, { data, loading, error }] = useLoginWithoutDetailsMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginWithoutDetailsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.LoginWithoutDetailsMutation, Types.LoginWithoutDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.LoginWithoutDetailsMutation, Types.LoginWithoutDetailsMutationVariables>(LoginWithoutDetailsDocument, options);
      }
export type LoginWithoutDetailsMutationHookResult = ReturnType<typeof useLoginWithoutDetailsMutation>;
export type LoginWithoutDetailsMutationResult = Apollo.MutationResult<Types.LoginWithoutDetailsMutation>;
export type LoginWithoutDetailsMutationOptions = Apollo.BaseMutationOptions<Types.LoginWithoutDetailsMutation, Types.LoginWithoutDetailsMutationVariables>;
export const LoginDocument = gql`
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
    ${AccountErrorFragmentFragmentDoc}
${UserDetailsFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<Types.LoginMutation, Types.LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.LoginMutation, Types.LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<Types.LoginMutation, Types.LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: AccountRegisterInput!) {
  accountRegister(input: $input) {
    errors {
      ...AccountErrorFragment
    }
    requiresConfirmation
  }
}
    ${AccountErrorFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<Types.RegisterMutation, Types.RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.RegisterMutation, Types.RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.RegisterMutation, Types.RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<Types.RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<Types.RegisterMutation, Types.RegisterMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($csrfToken: String!) {
  tokenRefresh(csrfToken: $csrfToken) {
    token
    errors {
      ...AccountErrorFragment
    }
  }
}
    ${AccountErrorFragmentFragmentDoc}`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<Types.RefreshTokenMutation, Types.RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      csrfToken: // value for 'csrfToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.RefreshTokenMutation, Types.RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.RefreshTokenMutation, Types.RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<Types.RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<Types.RefreshTokenMutation, Types.RefreshTokenMutationVariables>;
export const RefreshTokenWithUserDocument = gql`
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
    ${UserDetailsFragmentFragmentDoc}
${AccountErrorFragmentFragmentDoc}`;
export type RefreshTokenWithUserMutationFn = Apollo.MutationFunction<Types.RefreshTokenWithUserMutation, Types.RefreshTokenWithUserMutationVariables>;

/**
 * __useRefreshTokenWithUserMutation__
 *
 * To run a mutation, you first call `useRefreshTokenWithUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenWithUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenWithUserMutation, { data, loading, error }] = useRefreshTokenWithUserMutation({
 *   variables: {
 *      csrfToken: // value for 'csrfToken'
 *   },
 * });
 */
export function useRefreshTokenWithUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.RefreshTokenWithUserMutation, Types.RefreshTokenWithUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.RefreshTokenWithUserMutation, Types.RefreshTokenWithUserMutationVariables>(RefreshTokenWithUserDocument, options);
      }
export type RefreshTokenWithUserMutationHookResult = ReturnType<typeof useRefreshTokenWithUserMutation>;
export type RefreshTokenWithUserMutationResult = Apollo.MutationResult<Types.RefreshTokenWithUserMutation>;
export type RefreshTokenWithUserMutationOptions = Apollo.BaseMutationOptions<Types.RefreshTokenWithUserMutation, Types.RefreshTokenWithUserMutationVariables>;
export const VerifyTokenDocument = gql`
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
    ${UserDetailsFragmentFragmentDoc}
${AccountErrorFragmentFragmentDoc}`;
export type VerifyTokenMutationFn = Apollo.MutationFunction<Types.VerifyTokenMutation, Types.VerifyTokenMutationVariables>;

/**
 * __useVerifyTokenMutation__
 *
 * To run a mutation, you first call `useVerifyTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTokenMutation, { data, loading, error }] = useVerifyTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.VerifyTokenMutation, Types.VerifyTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.VerifyTokenMutation, Types.VerifyTokenMutationVariables>(VerifyTokenDocument, options);
      }
export type VerifyTokenMutationHookResult = ReturnType<typeof useVerifyTokenMutation>;
export type VerifyTokenMutationResult = Apollo.MutationResult<Types.VerifyTokenMutation>;
export type VerifyTokenMutationOptions = Apollo.BaseMutationOptions<Types.VerifyTokenMutation, Types.VerifyTokenMutationVariables>;
export const PasswordChangeDocument = gql`
    mutation passwordChange($newPassword: String!, $oldPassword: String!) {
  passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
    errors {
      ...AccountErrorFragment
    }
  }
}
    ${AccountErrorFragmentFragmentDoc}`;
export type PasswordChangeMutationFn = Apollo.MutationFunction<Types.PasswordChangeMutation, Types.PasswordChangeMutationVariables>;

/**
 * __usePasswordChangeMutation__
 *
 * To run a mutation, you first call `usePasswordChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePasswordChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [passwordChangeMutation, { data, loading, error }] = usePasswordChangeMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      oldPassword: // value for 'oldPassword'
 *   },
 * });
 */
export function usePasswordChangeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.PasswordChangeMutation, Types.PasswordChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.PasswordChangeMutation, Types.PasswordChangeMutationVariables>(PasswordChangeDocument, options);
      }
export type PasswordChangeMutationHookResult = ReturnType<typeof usePasswordChangeMutation>;
export type PasswordChangeMutationResult = Apollo.MutationResult<Types.PasswordChangeMutation>;
export type PasswordChangeMutationOptions = Apollo.BaseMutationOptions<Types.PasswordChangeMutation, Types.PasswordChangeMutationVariables>;
export const RequestPasswordResetDocument = gql`
    mutation requestPasswordReset($email: String!, $redirectUrl: String!, $channel: String!) {
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
    ${AccountErrorFragmentFragmentDoc}`;
export type RequestPasswordResetMutationFn = Apollo.MutationFunction<Types.RequestPasswordResetMutation, Types.RequestPasswordResetMutationVariables>;

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetMutation, { data, loading, error }] = useRequestPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *      redirectUrl: // value for 'redirectUrl'
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.RequestPasswordResetMutation, Types.RequestPasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.RequestPasswordResetMutation, Types.RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, options);
      }
export type RequestPasswordResetMutationHookResult = ReturnType<typeof useRequestPasswordResetMutation>;
export type RequestPasswordResetMutationResult = Apollo.MutationResult<Types.RequestPasswordResetMutation>;
export type RequestPasswordResetMutationOptions = Apollo.BaseMutationOptions<Types.RequestPasswordResetMutation, Types.RequestPasswordResetMutationVariables>;
export const SetPasswordDocument = gql`
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
    ${AccountErrorFragmentFragmentDoc}
${UserDetailsFragmentFragmentDoc}`;
export type SetPasswordMutationFn = Apollo.MutationFunction<Types.SetPasswordMutation, Types.SetPasswordMutationVariables>;

/**
 * __useSetPasswordMutation__
 *
 * To run a mutation, you first call `useSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordMutation, { data, loading, error }] = useSetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.SetPasswordMutation, Types.SetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.SetPasswordMutation, Types.SetPasswordMutationVariables>(SetPasswordDocument, options);
      }
export type SetPasswordMutationHookResult = ReturnType<typeof useSetPasswordMutation>;
export type SetPasswordMutationResult = Apollo.MutationResult<Types.SetPasswordMutation>;
export type SetPasswordMutationOptions = Apollo.BaseMutationOptions<Types.SetPasswordMutation, Types.SetPasswordMutationVariables>;
export const RequestEmailChangeDocument = gql`
    mutation requestEmailChange($channel: String!, $newEmail: String!, $password: String!, $redirectUrl: String!) {
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
    ${AccountErrorFragmentFragmentDoc}
${UserDetailsFragmentFragmentDoc}`;
export type RequestEmailChangeMutationFn = Apollo.MutationFunction<Types.RequestEmailChangeMutation, Types.RequestEmailChangeMutationVariables>;

/**
 * __useRequestEmailChangeMutation__
 *
 * To run a mutation, you first call `useRequestEmailChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestEmailChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestEmailChangeMutation, { data, loading, error }] = useRequestEmailChangeMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *      newEmail: // value for 'newEmail'
 *      password: // value for 'password'
 *      redirectUrl: // value for 'redirectUrl'
 *   },
 * });
 */
export function useRequestEmailChangeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.RequestEmailChangeMutation, Types.RequestEmailChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.RequestEmailChangeMutation, Types.RequestEmailChangeMutationVariables>(RequestEmailChangeDocument, options);
      }
export type RequestEmailChangeMutationHookResult = ReturnType<typeof useRequestEmailChangeMutation>;
export type RequestEmailChangeMutationResult = Apollo.MutationResult<Types.RequestEmailChangeMutation>;
export type RequestEmailChangeMutationOptions = Apollo.BaseMutationOptions<Types.RequestEmailChangeMutation, Types.RequestEmailChangeMutationVariables>;
export const ConfirmEmailChangeDocument = gql`
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
    ${AccountErrorFragmentFragmentDoc}
${UserDetailsFragmentFragmentDoc}`;
export type ConfirmEmailChangeMutationFn = Apollo.MutationFunction<Types.ConfirmEmailChangeMutation, Types.ConfirmEmailChangeMutationVariables>;

/**
 * __useConfirmEmailChangeMutation__
 *
 * To run a mutation, you first call `useConfirmEmailChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailChangeMutation, { data, loading, error }] = useConfirmEmailChangeMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailChangeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ConfirmEmailChangeMutation, Types.ConfirmEmailChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ConfirmEmailChangeMutation, Types.ConfirmEmailChangeMutationVariables>(ConfirmEmailChangeDocument, options);
      }
export type ConfirmEmailChangeMutationHookResult = ReturnType<typeof useConfirmEmailChangeMutation>;
export type ConfirmEmailChangeMutationResult = Apollo.MutationResult<Types.ConfirmEmailChangeMutation>;
export type ConfirmEmailChangeMutationOptions = Apollo.BaseMutationOptions<Types.ConfirmEmailChangeMutation, Types.ConfirmEmailChangeMutationVariables>;
export const AccountRequestDeletionDocument = gql`
    mutation accountRequestDeletion($channel: String!, $redirectUrl: String!) {
  accountRequestDeletion(channel: $channel, redirectUrl: $redirectUrl) {
    errors {
      ...AccountErrorFragment
    }
  }
}
    ${AccountErrorFragmentFragmentDoc}`;
export type AccountRequestDeletionMutationFn = Apollo.MutationFunction<Types.AccountRequestDeletionMutation, Types.AccountRequestDeletionMutationVariables>;

/**
 * __useAccountRequestDeletionMutation__
 *
 * To run a mutation, you first call `useAccountRequestDeletionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountRequestDeletionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountRequestDeletionMutation, { data, loading, error }] = useAccountRequestDeletionMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *      redirectUrl: // value for 'redirectUrl'
 *   },
 * });
 */
export function useAccountRequestDeletionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AccountRequestDeletionMutation, Types.AccountRequestDeletionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AccountRequestDeletionMutation, Types.AccountRequestDeletionMutationVariables>(AccountRequestDeletionDocument, options);
      }
export type AccountRequestDeletionMutationHookResult = ReturnType<typeof useAccountRequestDeletionMutation>;
export type AccountRequestDeletionMutationResult = Apollo.MutationResult<Types.AccountRequestDeletionMutation>;
export type AccountRequestDeletionMutationOptions = Apollo.BaseMutationOptions<Types.AccountRequestDeletionMutation, Types.AccountRequestDeletionMutationVariables>;
export const AccountDeleteDocument = gql`
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
    ${AccountErrorFragmentFragmentDoc}
${UserDetailsFragmentFragmentDoc}`;
export type AccountDeleteMutationFn = Apollo.MutationFunction<Types.AccountDeleteMutation, Types.AccountDeleteMutationVariables>;

/**
 * __useAccountDeleteMutation__
 *
 * To run a mutation, you first call `useAccountDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountDeleteMutation, { data, loading, error }] = useAccountDeleteMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAccountDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AccountDeleteMutation, Types.AccountDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AccountDeleteMutation, Types.AccountDeleteMutationVariables>(AccountDeleteDocument, options);
      }
export type AccountDeleteMutationHookResult = ReturnType<typeof useAccountDeleteMutation>;
export type AccountDeleteMutationResult = Apollo.MutationResult<Types.AccountDeleteMutation>;
export type AccountDeleteMutationOptions = Apollo.BaseMutationOptions<Types.AccountDeleteMutation, Types.AccountDeleteMutationVariables>;
export const AccountUpdateDocument = gql`
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
    ${AccountErrorFragmentFragmentDoc}
${UserDetailsFragmentFragmentDoc}`;
export type AccountUpdateMutationFn = Apollo.MutationFunction<Types.AccountUpdateMutation, Types.AccountUpdateMutationVariables>;

/**
 * __useAccountUpdateMutation__
 *
 * To run a mutation, you first call `useAccountUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountUpdateMutation, { data, loading, error }] = useAccountUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AccountUpdateMutation, Types.AccountUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AccountUpdateMutation, Types.AccountUpdateMutationVariables>(AccountUpdateDocument, options);
      }
export type AccountUpdateMutationHookResult = ReturnType<typeof useAccountUpdateMutation>;
export type AccountUpdateMutationResult = Apollo.MutationResult<Types.AccountUpdateMutation>;
export type AccountUpdateMutationOptions = Apollo.BaseMutationOptions<Types.AccountUpdateMutation, Types.AccountUpdateMutationVariables>;
export const AccountConfirmDocument = gql`
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
    ${UserDetailsFragmentFragmentDoc}
${AccountErrorFragmentFragmentDoc}`;
export type AccountConfirmMutationFn = Apollo.MutationFunction<Types.AccountConfirmMutation, Types.AccountConfirmMutationVariables>;

/**
 * __useAccountConfirmMutation__
 *
 * To run a mutation, you first call `useAccountConfirmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountConfirmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountConfirmMutation, { data, loading, error }] = useAccountConfirmMutation({
 *   variables: {
 *      email: // value for 'email'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAccountConfirmMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AccountConfirmMutation, Types.AccountConfirmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AccountConfirmMutation, Types.AccountConfirmMutationVariables>(AccountConfirmDocument, options);
      }
export type AccountConfirmMutationHookResult = ReturnType<typeof useAccountConfirmMutation>;
export type AccountConfirmMutationResult = Apollo.MutationResult<Types.AccountConfirmMutation>;
export type AccountConfirmMutationOptions = Apollo.BaseMutationOptions<Types.AccountConfirmMutation, Types.AccountConfirmMutationVariables>;
export const UserWithoutDetailsDocument = gql`
    query UserWithoutDetails {
  user: me {
    ...UserBaseFragment
  }
}
    ${UserBaseFragmentFragmentDoc}`;

/**
 * __useUserWithoutDetailsQuery__
 *
 * To run a query within a React component, call `useUserWithoutDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWithoutDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWithoutDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserWithoutDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.UserWithoutDetailsQuery, Types.UserWithoutDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.UserWithoutDetailsQuery, Types.UserWithoutDetailsQueryVariables>(UserWithoutDetailsDocument, options);
      }
export function useUserWithoutDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.UserWithoutDetailsQuery, Types.UserWithoutDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.UserWithoutDetailsQuery, Types.UserWithoutDetailsQueryVariables>(UserWithoutDetailsDocument, options);
        }
export type UserWithoutDetailsQueryHookResult = ReturnType<typeof useUserWithoutDetailsQuery>;
export type UserWithoutDetailsLazyQueryHookResult = ReturnType<typeof useUserWithoutDetailsLazyQuery>;
export type UserWithoutDetailsQueryResult = Apollo.QueryResult<Types.UserWithoutDetailsQuery, Types.UserWithoutDetailsQueryVariables>;
export const UserDocument = gql`
    query User {
  user: me {
    ...UserDetailsFragment
  }
}
    ${UserDetailsFragmentFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.UserQuery, Types.UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.UserQuery, Types.UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.UserQuery, Types.UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.UserQuery, Types.UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<Types.UserQuery, Types.UserQueryVariables>;
export const SearchInitiativesDocument = gql`
    query SearchInitiatives($after: String, $first: Int!, $query: String!) {
  search: initiatives(after: $after, first: $first, filter: {search: $query}) {
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

/**
 * __useSearchInitiativesQuery__
 *
 * To run a query within a React component, call `useSearchInitiativesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchInitiativesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchInitiativesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchInitiativesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchInitiativesQuery, Types.SearchInitiativesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchInitiativesQuery, Types.SearchInitiativesQueryVariables>(SearchInitiativesDocument, options);
      }
export function useSearchInitiativesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchInitiativesQuery, Types.SearchInitiativesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchInitiativesQuery, Types.SearchInitiativesQueryVariables>(SearchInitiativesDocument, options);
        }
export type SearchInitiativesQueryHookResult = ReturnType<typeof useSearchInitiativesQuery>;
export type SearchInitiativesLazyQueryHookResult = ReturnType<typeof useSearchInitiativesLazyQuery>;
export type SearchInitiativesQueryResult = Apollo.QueryResult<Types.SearchInitiativesQuery, Types.SearchInitiativesQueryVariables>;
export const SearchPermissionGroupsDocument = gql`
    query SearchPermissionGroups($after: String, $first: Int!, $query: String!) {
  search: permissionGroups(after: $after, first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
        userCanManage
      }
    }
  }
}
    `;

/**
 * __useSearchPermissionGroupsQuery__
 *
 * To run a query within a React component, call `useSearchPermissionGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPermissionGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPermissionGroupsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchPermissionGroupsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>(SearchPermissionGroupsDocument, options);
      }
export function useSearchPermissionGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>(SearchPermissionGroupsDocument, options);
        }
export type SearchPermissionGroupsQueryHookResult = ReturnType<typeof useSearchPermissionGroupsQuery>;
export type SearchPermissionGroupsLazyQueryHookResult = ReturnType<typeof useSearchPermissionGroupsLazyQuery>;
export type SearchPermissionGroupsQueryResult = Apollo.QueryResult<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>;
export const SearchStaffMembersDocument = gql`
    query SearchStaffMembers($after: String, $first: Int!, $query: String!) {
  search: staffUsers(after: $after, first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        email
        firstName
        lastName
        isActive
        avatar {
          alt
          url
        }
      }
    }
  }
}
    `;

/**
 * __useSearchStaffMembersQuery__
 *
 * To run a query within a React component, call `useSearchStaffMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchStaffMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchStaffMembersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchStaffMembersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>(SearchStaffMembersDocument, options);
      }
export function useSearchStaffMembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>(SearchStaffMembersDocument, options);
        }
export type SearchStaffMembersQueryHookResult = ReturnType<typeof useSearchStaffMembersQuery>;
export type SearchStaffMembersLazyQueryHookResult = ReturnType<typeof useSearchStaffMembersLazyQuery>;
export type SearchStaffMembersQueryResult = Apollo.QueryResult<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>;
export const StaffMemberAddDocument = gql`
    mutation StaffMemberAdd($input: StaffCreateInput!) {
  staffCreate(input: $input) {
    errors {
      ...StaffError
    }
    user {
      ...StaffMemberDetails
    }
  }
}
    ${StaffErrorFragmentDoc}
${StaffMemberDetailsFragmentDoc}`;
export type StaffMemberAddMutationFn = Apollo.MutationFunction<Types.StaffMemberAddMutation, Types.StaffMemberAddMutationVariables>;

/**
 * __useStaffMemberAddMutation__
 *
 * To run a mutation, you first call `useStaffMemberAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffMemberAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffMemberAddMutation, { data, loading, error }] = useStaffMemberAddMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStaffMemberAddMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.StaffMemberAddMutation, Types.StaffMemberAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.StaffMemberAddMutation, Types.StaffMemberAddMutationVariables>(StaffMemberAddDocument, options);
      }
export type StaffMemberAddMutationHookResult = ReturnType<typeof useStaffMemberAddMutation>;
export type StaffMemberAddMutationResult = Apollo.MutationResult<Types.StaffMemberAddMutation>;
export type StaffMemberAddMutationOptions = Apollo.BaseMutationOptions<Types.StaffMemberAddMutation, Types.StaffMemberAddMutationVariables>;
export const StaffMemberUpdateDocument = gql`
    mutation StaffMemberUpdate($id: ID!, $input: StaffUpdateInput!) {
  staffUpdate(id: $id, input: $input) {
    errors {
      ...StaffError
    }
    user {
      ...StaffMemberDetails
    }
  }
}
    ${StaffErrorFragmentDoc}
${StaffMemberDetailsFragmentDoc}`;
export type StaffMemberUpdateMutationFn = Apollo.MutationFunction<Types.StaffMemberUpdateMutation, Types.StaffMemberUpdateMutationVariables>;

/**
 * __useStaffMemberUpdateMutation__
 *
 * To run a mutation, you first call `useStaffMemberUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffMemberUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffMemberUpdateMutation, { data, loading, error }] = useStaffMemberUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStaffMemberUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.StaffMemberUpdateMutation, Types.StaffMemberUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.StaffMemberUpdateMutation, Types.StaffMemberUpdateMutationVariables>(StaffMemberUpdateDocument, options);
      }
export type StaffMemberUpdateMutationHookResult = ReturnType<typeof useStaffMemberUpdateMutation>;
export type StaffMemberUpdateMutationResult = Apollo.MutationResult<Types.StaffMemberUpdateMutation>;
export type StaffMemberUpdateMutationOptions = Apollo.BaseMutationOptions<Types.StaffMemberUpdateMutation, Types.StaffMemberUpdateMutationVariables>;
export const StaffMemberDeleteDocument = gql`
    mutation StaffMemberDelete($id: ID!) {
  staffDelete(id: $id) {
    errors {
      ...StaffError
    }
  }
}
    ${StaffErrorFragmentDoc}`;
export type StaffMemberDeleteMutationFn = Apollo.MutationFunction<Types.StaffMemberDeleteMutation, Types.StaffMemberDeleteMutationVariables>;

/**
 * __useStaffMemberDeleteMutation__
 *
 * To run a mutation, you first call `useStaffMemberDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffMemberDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffMemberDeleteMutation, { data, loading, error }] = useStaffMemberDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStaffMemberDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.StaffMemberDeleteMutation, Types.StaffMemberDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.StaffMemberDeleteMutation, Types.StaffMemberDeleteMutationVariables>(StaffMemberDeleteDocument, options);
      }
export type StaffMemberDeleteMutationHookResult = ReturnType<typeof useStaffMemberDeleteMutation>;
export type StaffMemberDeleteMutationResult = Apollo.MutationResult<Types.StaffMemberDeleteMutation>;
export type StaffMemberDeleteMutationOptions = Apollo.BaseMutationOptions<Types.StaffMemberDeleteMutation, Types.StaffMemberDeleteMutationVariables>;
export const StaffAvatarUpdateDocument = gql`
    mutation StaffAvatarUpdate($image: Upload!) {
  userAvatarUpdate(image: $image) {
    errors {
      ...AccountError
    }
    user {
      id
      avatar {
        url
      }
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type StaffAvatarUpdateMutationFn = Apollo.MutationFunction<Types.StaffAvatarUpdateMutation, Types.StaffAvatarUpdateMutationVariables>;

/**
 * __useStaffAvatarUpdateMutation__
 *
 * To run a mutation, you first call `useStaffAvatarUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffAvatarUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffAvatarUpdateMutation, { data, loading, error }] = useStaffAvatarUpdateMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useStaffAvatarUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.StaffAvatarUpdateMutation, Types.StaffAvatarUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.StaffAvatarUpdateMutation, Types.StaffAvatarUpdateMutationVariables>(StaffAvatarUpdateDocument, options);
      }
export type StaffAvatarUpdateMutationHookResult = ReturnType<typeof useStaffAvatarUpdateMutation>;
export type StaffAvatarUpdateMutationResult = Apollo.MutationResult<Types.StaffAvatarUpdateMutation>;
export type StaffAvatarUpdateMutationOptions = Apollo.BaseMutationOptions<Types.StaffAvatarUpdateMutation, Types.StaffAvatarUpdateMutationVariables>;
export const StaffAvatarDeleteDocument = gql`
    mutation StaffAvatarDelete {
  userAvatarDelete {
    errors {
      ...AccountError
    }
    user {
      id
      avatar {
        url
      }
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type StaffAvatarDeleteMutationFn = Apollo.MutationFunction<Types.StaffAvatarDeleteMutation, Types.StaffAvatarDeleteMutationVariables>;

/**
 * __useStaffAvatarDeleteMutation__
 *
 * To run a mutation, you first call `useStaffAvatarDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffAvatarDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffAvatarDeleteMutation, { data, loading, error }] = useStaffAvatarDeleteMutation({
 *   variables: {
 *   },
 * });
 */
export function useStaffAvatarDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.StaffAvatarDeleteMutation, Types.StaffAvatarDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.StaffAvatarDeleteMutation, Types.StaffAvatarDeleteMutationVariables>(StaffAvatarDeleteDocument, options);
      }
export type StaffAvatarDeleteMutationHookResult = ReturnType<typeof useStaffAvatarDeleteMutation>;
export type StaffAvatarDeleteMutationResult = Apollo.MutationResult<Types.StaffAvatarDeleteMutation>;
export type StaffAvatarDeleteMutationOptions = Apollo.BaseMutationOptions<Types.StaffAvatarDeleteMutation, Types.StaffAvatarDeleteMutationVariables>;
export const ChangeStaffPasswordDocument = gql`
    mutation ChangeStaffPassword($newPassword: String!, $oldPassword: String!) {
  passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
    errors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type ChangeStaffPasswordMutationFn = Apollo.MutationFunction<Types.ChangeStaffPasswordMutation, Types.ChangeStaffPasswordMutationVariables>;

/**
 * __useChangeStaffPasswordMutation__
 *
 * To run a mutation, you first call `useChangeStaffPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStaffPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStaffPasswordMutation, { data, loading, error }] = useChangeStaffPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      oldPassword: // value for 'oldPassword'
 *   },
 * });
 */
export function useChangeStaffPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ChangeStaffPasswordMutation, Types.ChangeStaffPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ChangeStaffPasswordMutation, Types.ChangeStaffPasswordMutationVariables>(ChangeStaffPasswordDocument, options);
      }
export type ChangeStaffPasswordMutationHookResult = ReturnType<typeof useChangeStaffPasswordMutation>;
export type ChangeStaffPasswordMutationResult = Apollo.MutationResult<Types.ChangeStaffPasswordMutation>;
export type ChangeStaffPasswordMutationOptions = Apollo.BaseMutationOptions<Types.ChangeStaffPasswordMutation, Types.ChangeStaffPasswordMutationVariables>;
export const StaffListDocument = gql`
    query StaffList($first: Int, $after: String, $last: Int, $before: String, $filter: StaffUserInput, $sort: UserSortingInput) {
  staffUsers(
    before: $before
    after: $after
    first: $first
    last: $last
    filter: $filter
    sortBy: $sort
  ) {
    edges {
      cursor
      node {
        ...StaffMember
        avatar(size: 48) {
          url
        }
      }
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
    ${StaffMemberFragmentDoc}`;

/**
 * __useStaffListQuery__
 *
 * To run a query within a React component, call `useStaffListQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useStaffListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.StaffListQuery, Types.StaffListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.StaffListQuery, Types.StaffListQueryVariables>(StaffListDocument, options);
      }
export function useStaffListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.StaffListQuery, Types.StaffListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.StaffListQuery, Types.StaffListQueryVariables>(StaffListDocument, options);
        }
export type StaffListQueryHookResult = ReturnType<typeof useStaffListQuery>;
export type StaffListLazyQueryHookResult = ReturnType<typeof useStaffListLazyQuery>;
export type StaffListQueryResult = Apollo.QueryResult<Types.StaffListQuery, Types.StaffListQueryVariables>;
export const StaffMemberDetailsDocument = gql`
    query StaffMemberDetails($id: ID!) {
  user(id: $id) {
    ...StaffMemberDetails
  }
}
    ${StaffMemberDetailsFragmentDoc}`;

/**
 * __useStaffMemberDetailsQuery__
 *
 * To run a query within a React component, call `useStaffMemberDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffMemberDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffMemberDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStaffMemberDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>(StaffMemberDetailsDocument, options);
      }
export function useStaffMemberDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>(StaffMemberDetailsDocument, options);
        }
export type StaffMemberDetailsQueryHookResult = ReturnType<typeof useStaffMemberDetailsQuery>;
export type StaffMemberDetailsLazyQueryHookResult = ReturnType<typeof useStaffMemberDetailsLazyQuery>;
export type StaffMemberDetailsQueryResult = Apollo.QueryResult<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>;
export const UpdateInitiativeTranslationsDocument = gql`
    mutation UpdateInitiativeTranslations($id: ID!, $input: TranslationInput!, $language: LanguageCodeEnum!) {
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
    ${InitiativeTranslateErrorFragmentFragmentDoc}`;
export type UpdateInitiativeTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateInitiativeTranslationsMutation, Types.UpdateInitiativeTranslationsMutationVariables>;

/**
 * __useUpdateInitiativeTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateInitiativeTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInitiativeTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInitiativeTranslationsMutation, { data, loading, error }] = useUpdateInitiativeTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateInitiativeTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateInitiativeTranslationsMutation, Types.UpdateInitiativeTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateInitiativeTranslationsMutation, Types.UpdateInitiativeTranslationsMutationVariables>(UpdateInitiativeTranslationsDocument, options);
      }
export type UpdateInitiativeTranslationsMutationHookResult = ReturnType<typeof useUpdateInitiativeTranslationsMutation>;
export type UpdateInitiativeTranslationsMutationResult = Apollo.MutationResult<Types.UpdateInitiativeTranslationsMutation>;
export type UpdateInitiativeTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateInitiativeTranslationsMutation, Types.UpdateInitiativeTranslationsMutationVariables>;
export const InitiativeTranslationsDocument = gql`
    query InitiativeTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
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
    ${InitiativeTranslationFragmentDoc}`;

/**
 * __useInitiativeTranslationsQuery__
 *
 * To run a query within a React component, call `useInitiativeTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativeTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativeTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useInitiativeTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.InitiativeTranslationsQuery, Types.InitiativeTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.InitiativeTranslationsQuery, Types.InitiativeTranslationsQueryVariables>(InitiativeTranslationsDocument, options);
      }
export function useInitiativeTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.InitiativeTranslationsQuery, Types.InitiativeTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.InitiativeTranslationsQuery, Types.InitiativeTranslationsQueryVariables>(InitiativeTranslationsDocument, options);
        }
export type InitiativeTranslationsQueryHookResult = ReturnType<typeof useInitiativeTranslationsQuery>;
export type InitiativeTranslationsLazyQueryHookResult = ReturnType<typeof useInitiativeTranslationsLazyQuery>;
export type InitiativeTranslationsQueryResult = Apollo.QueryResult<Types.InitiativeTranslationsQuery, Types.InitiativeTranslationsQueryVariables>;
export const InitiativeTranslationDetailsDocument = gql`
    query InitiativeTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(kind: INITIATIVE, id: $id) {
    ...InitiativeTranslation
  }
}
    ${InitiativeTranslationFragmentDoc}`;

/**
 * __useInitiativeTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useInitiativeTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitiativeTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativeTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useInitiativeTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.InitiativeTranslationDetailsQuery, Types.InitiativeTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.InitiativeTranslationDetailsQuery, Types.InitiativeTranslationDetailsQueryVariables>(InitiativeTranslationDetailsDocument, options);
      }
export function useInitiativeTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.InitiativeTranslationDetailsQuery, Types.InitiativeTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.InitiativeTranslationDetailsQuery, Types.InitiativeTranslationDetailsQueryVariables>(InitiativeTranslationDetailsDocument, options);
        }
export type InitiativeTranslationDetailsQueryHookResult = ReturnType<typeof useInitiativeTranslationDetailsQuery>;
export type InitiativeTranslationDetailsLazyQueryHookResult = ReturnType<typeof useInitiativeTranslationDetailsLazyQuery>;
export type InitiativeTranslationDetailsQueryResult = Apollo.QueryResult<Types.InitiativeTranslationDetailsQuery, Types.InitiativeTranslationDetailsQueryVariables>;
export const UpdateMetadataDocument = gql`
    mutation UpdateMetadata($id: ID!, $input: [MetadataInput!]!, $keysToDelete: [String!]!) {
  updateMetadata(id: $id, input: $input) {
    errors {
      ...MetadataError
    }
    item {
      ...Metadata
      ... on Node {
        id
      }
    }
  }
  deleteMetadata(id: $id, keys: $keysToDelete) {
    errors {
      ...MetadataError
    }
    item {
      ...Metadata
      ... on Node {
        id
      }
    }
  }
}
    ${MetadataErrorFragmentDoc}
${MetadataFragmentDoc}`;
export type UpdateMetadataMutationFn = Apollo.MutationFunction<Types.UpdateMetadataMutation, Types.UpdateMetadataMutationVariables>;

/**
 * __useUpdateMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMetadataMutation, { data, loading, error }] = useUpdateMetadataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      keysToDelete: // value for 'keysToDelete'
 *   },
 * });
 */
export function useUpdateMetadataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateMetadataMutation, Types.UpdateMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateMetadataMutation, Types.UpdateMetadataMutationVariables>(UpdateMetadataDocument, options);
      }
export type UpdateMetadataMutationHookResult = ReturnType<typeof useUpdateMetadataMutation>;
export type UpdateMetadataMutationResult = Apollo.MutationResult<Types.UpdateMetadataMutation>;
export type UpdateMetadataMutationOptions = Apollo.BaseMutationOptions<Types.UpdateMetadataMutation, Types.UpdateMetadataMutationVariables>;
export const UpdatePrivateMetadataDocument = gql`
    mutation UpdatePrivateMetadata($id: ID!, $input: [MetadataInput!]!, $keysToDelete: [String!]!) {
  updatePrivateMetadata(id: $id, input: $input) {
    errors {
      ...MetadataError
    }
    item {
      ...Metadata
      ... on Node {
        id
      }
    }
  }
  deletePrivateMetadata(id: $id, keys: $keysToDelete) {
    errors {
      ...MetadataError
    }
    item {
      ...Metadata
      ... on Node {
        id
      }
    }
  }
}
    ${MetadataErrorFragmentDoc}
${MetadataFragmentDoc}`;
export type UpdatePrivateMetadataMutationFn = Apollo.MutationFunction<Types.UpdatePrivateMetadataMutation, Types.UpdatePrivateMetadataMutationVariables>;

/**
 * __useUpdatePrivateMetadataMutation__
 *
 * To run a mutation, you first call `useUpdatePrivateMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePrivateMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePrivateMetadataMutation, { data, loading, error }] = useUpdatePrivateMetadataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      keysToDelete: // value for 'keysToDelete'
 *   },
 * });
 */
export function useUpdatePrivateMetadataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdatePrivateMetadataMutation, Types.UpdatePrivateMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdatePrivateMetadataMutation, Types.UpdatePrivateMetadataMutationVariables>(UpdatePrivateMetadataDocument, options);
      }
export type UpdatePrivateMetadataMutationHookResult = ReturnType<typeof useUpdatePrivateMetadataMutation>;
export type UpdatePrivateMetadataMutationResult = Apollo.MutationResult<Types.UpdatePrivateMetadataMutation>;
export type UpdatePrivateMetadataMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePrivateMetadataMutation, Types.UpdatePrivateMetadataMutationVariables>;
export const WebhookCreateDocument = gql`
    mutation WebhookCreate($input: WebhookCreateInput!) {
  webhookCreate(input: $input) {
    errors {
      ...WebhookError
    }
    webhook {
      ...WebhooksDetails
    }
  }
}
    ${WebhookErrorFragmentDoc}
${WebhooksDetailsFragmentDoc}`;
export type WebhookCreateMutationFn = Apollo.MutationFunction<Types.WebhookCreateMutation, Types.WebhookCreateMutationVariables>;

/**
 * __useWebhookCreateMutation__
 *
 * To run a mutation, you first call `useWebhookCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWebhookCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [webhookCreateMutation, { data, loading, error }] = useWebhookCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useWebhookCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.WebhookCreateMutation, Types.WebhookCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.WebhookCreateMutation, Types.WebhookCreateMutationVariables>(WebhookCreateDocument, options);
      }
export type WebhookCreateMutationHookResult = ReturnType<typeof useWebhookCreateMutation>;
export type WebhookCreateMutationResult = Apollo.MutationResult<Types.WebhookCreateMutation>;
export type WebhookCreateMutationOptions = Apollo.BaseMutationOptions<Types.WebhookCreateMutation, Types.WebhookCreateMutationVariables>;
export const WebhookUpdateDocument = gql`
    mutation WebhookUpdate($id: ID!, $input: WebhookUpdateInput!) {
  webhookUpdate(id: $id, input: $input) {
    errors {
      ...WebhookError
    }
    webhook {
      ...WebhooksDetails
    }
  }
}
    ${WebhookErrorFragmentDoc}
${WebhooksDetailsFragmentDoc}`;
export type WebhookUpdateMutationFn = Apollo.MutationFunction<Types.WebhookUpdateMutation, Types.WebhookUpdateMutationVariables>;

/**
 * __useWebhookUpdateMutation__
 *
 * To run a mutation, you first call `useWebhookUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWebhookUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [webhookUpdateMutation, { data, loading, error }] = useWebhookUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useWebhookUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.WebhookUpdateMutation, Types.WebhookUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.WebhookUpdateMutation, Types.WebhookUpdateMutationVariables>(WebhookUpdateDocument, options);
      }
export type WebhookUpdateMutationHookResult = ReturnType<typeof useWebhookUpdateMutation>;
export type WebhookUpdateMutationResult = Apollo.MutationResult<Types.WebhookUpdateMutation>;
export type WebhookUpdateMutationOptions = Apollo.BaseMutationOptions<Types.WebhookUpdateMutation, Types.WebhookUpdateMutationVariables>;
export const WebhookDeleteDocument = gql`
    mutation WebhookDelete($id: ID!) {
  webhookDelete(id: $id) {
    errors {
      ...WebhookError
    }
  }
}
    ${WebhookErrorFragmentDoc}`;
export type WebhookDeleteMutationFn = Apollo.MutationFunction<Types.WebhookDeleteMutation, Types.WebhookDeleteMutationVariables>;

/**
 * __useWebhookDeleteMutation__
 *
 * To run a mutation, you first call `useWebhookDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWebhookDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [webhookDeleteMutation, { data, loading, error }] = useWebhookDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWebhookDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.WebhookDeleteMutation, Types.WebhookDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.WebhookDeleteMutation, Types.WebhookDeleteMutationVariables>(WebhookDeleteDocument, options);
      }
export type WebhookDeleteMutationHookResult = ReturnType<typeof useWebhookDeleteMutation>;
export type WebhookDeleteMutationResult = Apollo.MutationResult<Types.WebhookDeleteMutation>;
export type WebhookDeleteMutationOptions = Apollo.BaseMutationOptions<Types.WebhookDeleteMutation, Types.WebhookDeleteMutationVariables>;
export const WebhookDetailsDocument = gql`
    query WebhookDetails($id: ID!) {
  webhook(id: $id) {
    ...Webhook
    syncEvents {
      eventType
    }
    asyncEvents {
      eventType
    }
    secretKey
    targetUrl
  }
}
    ${WebhookFragmentDoc}`;

/**
 * __useWebhookDetailsQuery__
 *
 * To run a query within a React component, call `useWebhookDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWebhookDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWebhookDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWebhookDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.WebhookDetailsQuery, Types.WebhookDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.WebhookDetailsQuery, Types.WebhookDetailsQueryVariables>(WebhookDetailsDocument, options);
      }
export function useWebhookDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.WebhookDetailsQuery, Types.WebhookDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.WebhookDetailsQuery, Types.WebhookDetailsQueryVariables>(WebhookDetailsDocument, options);
        }
export type WebhookDetailsQueryHookResult = ReturnType<typeof useWebhookDetailsQuery>;
export type WebhookDetailsLazyQueryHookResult = ReturnType<typeof useWebhookDetailsLazyQuery>;
export type WebhookDetailsQueryResult = Apollo.QueryResult<Types.WebhookDetailsQuery, Types.WebhookDetailsQueryVariables>;