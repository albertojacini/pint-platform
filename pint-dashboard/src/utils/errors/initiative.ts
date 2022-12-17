import {
  // BulkInitiativeErrorFragment,
  // CollectionErrorFragment,
  // InitiativeChannelListingErrorFragment,
  InitiativeErrorCode,
  InitiativeErrorFragment,
} from "@saleor/graphql";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages, { getCommonFormFieldErrorMessage } from "./common";

const messages = defineMessages({
  alreadyExists: {
    id: "2NgTCJ",
    defaultMessage: "A initiative with this SKU already exists",
  },
  attributeAlreadyAssigned: {
    id: "aggaJg",
    defaultMessage:
      "This attribute has already been assigned to this initiative type",
  },
  attributeCannotBeAssigned: {
    id: "u24Ppd",
    defaultMessage: "This attribute cannot be assigned to this initiative type",
  },
  attributeRequired: {
    id: "cd13nN",
    defaultMessage: "All attributes should have value",
    description: "initiative attribute error",
  },
  attributeVariantsDisabled: {
    id: "lLwtgs",
    defaultMessage: "Variants are disabled in this initiative type",
  },
  duplicated: {
    id: "AY7Tuz",
    defaultMessage: "The same object cannot be in both lists",
  },
  duplicatedInputItem: {
    id: "pFVX6g",
    defaultMessage: "Variant with these attributes already exists",
  },
  nameAlreadyTaken: {
    id: "FuAV5G",
    defaultMessage: "This name is already taken. Please provide another.",
  },
  priceInvalid: {
    id: "mYs3tb",
    defaultMessage: "Initiative price cannot be lower than 0.",
  },
  skuUnique: {
    id: "rZf1qL",
    defaultMessage: "SKUs must be unique",
    description: "bulk variant create error",
  },
  unsupportedMediaProvider: {
    id: "DILs4b",
    defaultMessage: "Unsupported media provider or incorrect URL",
  },
  variantNoDigitalContent: {
    id: "Z6QAbw",
    defaultMessage: "This variant does not have any digital content",
  },
  variantUnique: {
    id: "i3Mvj8",
    defaultMessage: "This variant already exists",
    description: "initiative attribute error",
  },
  noCategorySet: {
    id: "3AqOxp",
    defaultMessage: "Initiative category not set",
    description: "no category set error",
  },
});

function getInitiativeErrorMessage(
  err:
    | Omit<
        | InitiativeErrorFragment,
        // | CollectionErrorFragment
        // | InitiativeChannelListingErrorFragment,
        "__typename"
      >
    | undefined,
  intl: IntlShape,
): string {
  if (err) {
    switch (err.code) {
      // case InitiativeErrorCode.ATTRIBUTE_ALREADY_ASSIGNED:
      //   return intl.formatMessage(messages.attributeAlreadyAssigned);
      case InitiativeErrorCode.ALREADY_EXISTS:
        return intl.formatMessage(messages.alreadyExists);
      // case InitiativeErrorCode.ATTRIBUTE_CANNOT_BE_ASSIGNED:
      //   return intl.formatMessage(messages.attributeCannotBeAssigned);
      // case InitiativeErrorCode.ATTRIBUTE_VARIANTS_DISABLED:
      //   return intl.formatMessage(messages.attributeVariantsDisabled);
      case InitiativeErrorCode.DUPLICATED_INPUT_ITEM:
        return intl.formatMessage(messages.duplicatedInputItem);
      // case InitiativeErrorCode.VARIANT_NO_DIGITAL_CONTENT:
      //   return intl.formatMessage(messages.variantNoDigitalContent);
      case InitiativeErrorCode.UNSUPPORTED_MEDIA_PROVIDER:
        return intl.formatMessage(messages.unsupportedMediaProvider);
      // case InitiativeErrorCode.INITIATIVE_WITHOUT_CATEGORY:
      //   return intl.formatMessage(messages.noCategorySet);
      case InitiativeErrorCode.INVALID:
        if (err.field === "price") {
          return intl.formatMessage(messages.priceInvalid);
        }
        return intl.formatMessage(commonErrorMessages.invalid);
      case InitiativeErrorCode.UNIQUE:
        if (err.field === "sku") {
          return intl.formatMessage(messages.skuUnique);
        }
    }
  }
  return getCommonFormFieldErrorMessage(err, intl);
}

// export function getInitiativeVariantAttributeErrorMessage(
//   err: Omit<InitiativeErrorFragment, "__typename"> | undefined,
//   intl: IntlShape,
// ): string {
//   if (err) {
//     switch (err.code) {
//       case InitiativeErrorCode.UNIQUE:
//         return intl.formatMessage(messages.variantUnique);
//       default:
//         return getInitiativeErrorMessage(err, intl);
//     }
//   }
//
//   return undefined;
// }

// export function getBulkInitiativeErrorMessage(
//   err: BulkInitiativeErrorFragment | undefined,
//   intl: IntlShape,
// ): string {
//   if (err?.code === InitiativeErrorCode.UNIQUE && err.field === "sku") {
//     return intl.formatMessage(messages.skuUnique);
//   }
//   return getInitiativeErrorMessage(err, intl);
// }

export default getInitiativeErrorMessage;
