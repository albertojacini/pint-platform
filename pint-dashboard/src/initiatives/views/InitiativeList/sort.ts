import { InitiativeOrder, InitiativeOrderField } from "@saleor/graphql";
import {
  InitiativeListUrlQueryParams,
  InitiativeListUrlSortField,
} from "@saleor/initiatives/urls";
import { getOrderDirection } from "@saleor/utils/sort";

export const DEFAULT_SORT_KEY = InitiativeListUrlSortField.name;

export function canBeSorted(
  sort: InitiativeListUrlSortField,
  // isChannelSelected: boolean,
) {
  switch (sort) {
    case InitiativeListUrlSortField.name:
    // case InitiativeListUrlSortField.initiativeType:
    // case InitiativeListUrlSortField.attribute:
    // case InitiativeListUrlSortField.rank:
    // case InitiativeListUrlSortField.date:
    //   return true;
    // case InitiativeListUrlSortField.price:
    // case InitiativeListUrlSortField.status:
    //   return isChannelSelected;
    default:
      return false;
  }
}

export function getSortQueryField(
  sort: InitiativeListUrlSortField,
): InitiativeOrderField {
  switch (sort) {
    case InitiativeListUrlSortField.name:
      return InitiativeOrderField.NAME;
    // case InitiativeListUrlSortField.price:
    //   return InitiativeOrderField.PRICE;
    // case InitiativeListUrlSortField.initiativeType:
    //   return InitiativeOrderField.TYPE;
    // case InitiativeListUrlSortField.status:
    //   return InitiativeOrderField.PUBLISHED;
    // case InitiativeListUrlSortField.rank:
    //   return InitiativeOrderField.RANK;
    case InitiativeListUrlSortField.date:
      return InitiativeOrderField.DATE;
    default:
      return undefined;
  }
}

export function getSortQueryVariables(
  params: InitiativeListUrlQueryParams,
  // isChannelSelected: boolean,
): InitiativeOrder {
  // if (!canBeSorted(params.sort, isChannelSelected)) {
  if (!canBeSorted(params.sort)) {
    return;
  }

  const direction = getOrderDirection(params.asc);
  if (params.sort === InitiativeListUrlSortField.attribute) {
    return {
      attributeId: params.attributeId,
      direction,
    };
  }

  const field = getSortQueryField(params.sort);
  return {
    direction,
    field,
  };
}
