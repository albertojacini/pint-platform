import { ChannelsAction } from "@saleor/channels/urls";
import urlJoin from "url-join";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  FiltersAsDictWithMultipleValues,
  FiltersWithKeyValueValues,
  FiltersWithMultipleValues,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog,
} from "../types";
import { stringifyQs } from "../utils/urls";

const initiativeSection = "/initiatives/";

export const initiativeAddPath = urlJoin(initiativeSection, "add");
export const initiativeAddUrl = (params?: InitiativeCreateUrlQueryParams) =>
  initiativeAddPath + "?" + stringifyQs(params);

export const initiativeListPath = initiativeSection;
export type InitiativeListUrlDialog =
  | "delete"
  | "export"
  | "create-initiative"
  | TabActionDialog;
export enum InitiativeListUrlFiltersEnum {
  priceFrom = "priceFrom",
  priceTo = "priceTo",
  status = "status",
  stockStatus = "stockStatus",
  query = "query",
  channel = "channel",
  initiativeKind = "initiativeKind",
}
export enum InitiativeListUrlFiltersWithMultipleValues {
  categories = "categories",
  collections = "collections",
  initiativeTypes = "initiativeTypes",
}
export enum InitiativeListUrlFiltersAsDictWithMultipleValues {
  attributes = "attributes",
}
export enum InitiativeListUrlFiltersWithKeyValueValues {
  metadata = "metadata",
}
export type InitiativeListUrlFilters = Filters<InitiativeListUrlFiltersEnum> &
  FiltersWithMultipleValues<InitiativeListUrlFiltersWithMultipleValues> &
  FiltersWithKeyValueValues<InitiativeListUrlFiltersWithKeyValueValues> &
  FiltersAsDictWithMultipleValues<
    InitiativeListUrlFiltersAsDictWithMultipleValues
  >;
export enum InitiativeListUrlSortField {
  attribute = "attribute",
  name = "name",
  initiativeType = "initiativeType",
  status = "status",
  price = "price",
  rank = "rank",
  date = "date",
}
export type InitiativeListUrlSort = Sort<InitiativeListUrlSortField>;
export interface InitiativeListUrlQueryParams
  extends BulkAction,
    Dialog<InitiativeListUrlDialog>,
    InitiativeListUrlFilters,
    InitiativeListUrlSort,
    Pagination,
    ActiveTab {
  attributeId?: string;
}
export const initiativeListUrl = (params?: InitiativeListUrlQueryParams): string =>
  initiativeListPath + "?" + stringifyQs(params);

export const initiativePath = (id: string) => urlJoin(initiativeSection + id);
export type InitiativeUrlDialog =
  | "remove"
  | "assign-attribute-value"
  | ChannelsAction;
export type InitiativeUrlQueryParams = BulkAction &
  Dialog<InitiativeUrlDialog> &
  SingleAction;
export type InitiativeCreateUrlDialog = "assign-attribute-value" | ChannelsAction;
export interface InitiativeCreateUrlInitiativeType {
  "initiative-type-id"?: string;
}
export type InitiativeCreateUrlQueryParams = Dialog<InitiativeCreateUrlDialog> &
  SingleAction &
  InitiativeCreateUrlInitiativeType;
export const initiativeUrl = (id: string, params?: InitiativeUrlQueryParams) =>
  initiativePath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const initiativeVariantEditPath = (initiativeId: string, variantId: string) =>
  urlJoin(initiativeSection, initiativeId, "variant", variantId);
export type InitiativeVariantEditUrlDialog = "remove" | "assign-attribute-value";
export type InitiativeVariantEditUrlQueryParams = Dialog<
  InitiativeVariantEditUrlDialog
> &
  SingleAction;
export const initiativeVariantEditUrl = (
  initiativeId: string,
  variantId: string,
  params?: InitiativeVariantEditUrlQueryParams,
) =>
  initiativeVariantEditPath(
    encodeURIComponent(initiativeId),
    encodeURIComponent(variantId),
  ) +
  "?" +
  stringifyQs(params);

export type InitiativeVariantAddUrlDialog = "assign-attribute-value";
export type InitiativeVariantAddUrlQueryParams = Dialog<
  InitiativeVariantAddUrlDialog
> &
  SingleAction;
export const initiativeVariantAddPath = (initiativeId: string) =>
  urlJoin(initiativeSection, initiativeId, "variant/add");
export const initiativeVariantAddUrl = (
  initiativeId: string,
  params?: InitiativeVariantAddUrlQueryParams,
): string =>
  initiativeVariantAddPath(encodeURIComponent(initiativeId)) +
  "?" +
  stringifyQs(params);

export const initiativeImagePath = (initiativeId: string, imageId: string) =>
  urlJoin(initiativeSection, initiativeId, "image", imageId);
export type InitiativeImageUrlDialog = "remove";
export type InitiativeImageUrlQueryParams = Dialog<"remove">;
export const initiativeImageUrl = (
  initiativeId: string,
  imageId: string,
  params?: InitiativeImageUrlQueryParams,
) =>
  initiativeImagePath(encodeURIComponent(initiativeId), encodeURIComponent(imageId)) +
  "?" +
  stringifyQs(params);
