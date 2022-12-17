import {
  InitiativeErrorCode,
  InitiativeErrorWithAttributesFragment,
} from "@saleor/graphql";

import { InitiativeCreateData } from "../components/InitiativeCreatePage";

export const validatePrice = (price: string) =>
  price === "" || parseInt(price, 10) < 0;

export const validateCostPrice = (price: string) =>
  price !== "" && parseInt(price, 10) < 0;

const createEmptyRequiredError = (
  field: string,
): InitiativeErrorWithAttributesFragment => ({
  __typename: "InitiativeError",
  code: InitiativeErrorCode.REQUIRED,
  field,
  message: null,
  attributes: [],
});

export const validateInitiativeCreateData = (data: InitiativeCreateData) => {
  let errors: InitiativeErrorWithAttributesFragment[] = [];

  if (!data.initiativeType) {
    errors = [...errors, createEmptyRequiredError("initiativeType")];
  }

  if (!data.name) {
    errors = [...errors, createEmptyRequiredError("name")];
  }

  return errors;
};
