import { gql } from "@apollo/client";

// export const attributeErrorFragment = gql`
//   fragment AttributeError on AttributeError {
//     code
//     field
//     message
//   }
// `;

export const initiativeErrorFragment = gql`
  fragment InitiativeError on InitiativeError {
    code
    field
    message
  }
`;

export const initiativeErrorWithAttributesFragment = gql`
  fragment InitiativeErrorWithAttributes on InitiativeError {
    ...InitiativeError
    // attributes
  }
`;

export const initiativeChannelListingErrorFragment = gql`
  fragment InitiativeChannelListingError on InitiativeChannelListingError {
    code
    field
    message
    // channels
  }
`;

export const collectionChannelListingErrorFragment = gql`
  fragment CollectionChannelListingError on CollectionChannelListingError {
    code
    field
    message
    channels
  }
`;

export const accountErrorFragment = gql`
  fragment AccountError on AccountError {
    code
    field
    // addressType
    message
  }
`;

export const discountErrorFragment = gql`
  fragment DiscountError on DiscountError {
    code
    field
    // channels
    message
  }
`;

export const menuErrorFragment = gql`
  fragment MenuError on MenuError {
    code
    field
    message
  }
`;

export const orderErrorFragment = gql`
  fragment OrderError on OrderError {
    code
    field
    // addressType
    message
    orderLines
  }
`;

export const orderSettingsErrorFragment = gql`
  fragment OrderSettingsError on OrderSettingsError {
    code
    field
    message
  }
`;

export const pageErrorFragment = gql`
  fragment PageError on PageError {
    code
    field
    message
  }
`;

export const pageErrorWithAttributesFragment = gql`
  fragment PageErrorWithAttributes on PageError {
    ...PageError
    attributes
  }
`;

export const permissionGroupErrorFragment = gql`
  fragment PermissionGroupError on PermissionGroupError {
    code
    field
    message
  }
`;

export const bulkInitiativeErrorFragment = gql`
  fragment BulkInitiativeError on BulkInitiativeError {
    field
    code
    index
    channels
    message
  }
`;
export const bulkStockErrorFragment = gql`
  fragment BulkStockError on BulkStockError {
    code
    field
    index
    message
  }
`;
export const stockErrorFragment = gql`
  fragment StockError on StockError {
    code
    field
    message
  }
`;

export const shippingChannelsErrorFragment = gql`
  fragment ShippingChannelsError on ShippingError {
    code
    field
    channels
    message
  }
`;

export const shippingErrorFragment = gql`
  fragment ShippingError on ShippingError {
    code
    field
    message
  }
`;

export const shopErrorFragment = gql`
  fragment ShopError on ShopError {
    code
    field
    message
  }
`;

export const staffErrorFragment = gql`
  fragment StaffError on StaffError {
    code
    field
    message
  }
`;

// export const warehouseErrorFragment = gql`
//   fragment WarehouseError on WarehouseError {
//     code
//     field
//     message
//   }
// `;

export const webhookErrorFragment = gql`
  fragment WebhookError on WebhookError {
    code
    field
    message
  }
`;

// export const invoiceErrorFragment = gql`
//   fragment InvoiceError on InvoiceError {
//     code
//     field
//     message
//   }
// `;

export const appErrorFragment = gql`
  fragment AppError on AppError {
    field
    message
    code
    permissions
  }
`;

export const exportErrorFragment = gql`
  fragment ExportError on ExportError {
    code
    field
    message
  }
`;

// export const pluginErrorFragment = gql`
//   fragment PluginError on PluginError {
//     code
//     field
//     message
//   }
// `;

export const metadataErrorFragment = gql`
  fragment MetadataError on MetadataError {
    code
    field
    message
  }
`;

export const collectionsErrorFragment = gql`
  fragment CollectionError on CollectionError {
    code
    field
    message
  }
`;

export const uploadErrorFragment = gql`
  fragment UploadError on UploadError {
    code
    field
    message
  }
`;

// export const giftCardErrorFragment = gql`
//   fragment GiftCardError on GiftCardError {
//     code
//     field
//     message
//   }
// `;
//
// export const giftCardSettingsErrorFragment = gql`
//   fragment GiftCardSettingsError on GiftCardSettingsError {
//     code
//     field
//     message
//   }
// `;
//
// export const saleBulkDeleteError = gql`
//   fragment SaleBulkDeleteError on DiscountError {
//     code
//     field
//     message
//   }
// `;
//
// export const voucherBulkDeleteError = gql`
//   fragment VoucherBulkDeleteError on DiscountError {
//     code
//     field
//     message
//   }
// `;
//
// export const giftCardBulkCreateErrorFragment = gql`
//   fragment GiftCardBulkCreateErrorFragment on GiftCardError {
//     code
//     field
//     message
//   }
// `;
//
// export const giftCardCreateErrorFragment = gql`
//   fragment GiftCardCreateErrorFragment on GiftCardError {
//     code
//     field
//     message
//   }
// `;
//
// export const pageBulkPublishErrorFragment = gql`
//   fragment PageBulkPublishErrorFragment on PageError {
//     code
//     field
//     message
//   }
// `;
//
// export const pageBulkRemoveErrorFragment = gql`
//   fragment PageBulkRemoveErrorFragment on PageError {
//     code
//     field
//     message
//   }
// `;
//
// export const pageTypeDeleteErrorFragment = gql`
//   fragment PageTypeDeleteErrorFragment on PageError {
//     code
//     field
//     message
//   }
// `;
//
// export const pageTypeBulkDeleteErrorFragment = gql`
//   fragment PageTypeDeleteErrorFragment on PageError {
//     code
//     field
//     message
//   }
// `;
//
// export const initiativeVariantStocksDeleteErrorFragment = gql`
//   fragment InitiativeVariantStocksDeleteError on StockError {
//     code
//     field
//     message
//   }
// `;

export const initiativeTypeDeleteErrorFragment = gql`
  fragment InitiativeTypeDeleteErrorFragment on InitiativeError {
    code
    field
    message
  }
`;

export const initiativeTypeBulkDeleteErrorFragment = gql`
  fragment InitiativeTypeBulkDeleteErrorFragment on InitiativeError {
    code
    field
    message
  }
`;

export const initiativeTypeBulkUpdateErrorFragment = gql`
  fragment InitiativeTypeBulkUpdateErrorFragment on InitiativeError {
    code
    field
    message
  }
`;

export const initiativeAttributeAssignErrorFragment = gql`
  fragment InitiativeAttributeAssignErrorFragment on InitiativeError {
    code
    field
    message
  }
`;

export const initiativeAttributeUnassignErrorFragment = gql`
  fragment InitiativeAttributeUnassignErrorFragment on InitiativeError {
    code
    field
    message
  }
`;

export const initiativeTypeCreateErrorFragment = gql`
  fragment InitiativeTypeCreateErrorFragment on InitiativeError {
    code
    field
    message
  }
`;

export const initiativeTypeReorderAttributesErrorFragment = gql`
  fragment InitiativeTypeReorderAttributesErrorFragment on InitiativeError {
    code
    field
    message
  }
`;

export const initiativeAttributeAssignmentUpdateErrorFragment = gql`
  fragment InitiativeAttributeAssignmentUpdateErrorFragment on InitiativeError {
    code
    field
    message
    attributes
  }
`;

export const shopSettingsUpdateErrorFragment = gql`
  fragment ShopSettingsUpdateErrorFragment on ShopError {
    code
    field
    message
  }
`;

export const shopFetchTaxRatesErrorFragment = gql`
  fragment ShopFetchTaxRatesErrorFragment on ShopError {
    code
    field
    message
  }
`;

export const initiativeTranslateErrorFragment = gql`
  fragment InitiativeTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;

export const initiativeVariantTranslateErrorFragment = gql`
  fragment InitiativeVariantTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;

export const categoryTranslateErrorFragment = gql`
  fragment CategoryTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;

export const collectionTranslateErrorFragment = gql`
  fragment CollectionTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;

export const pageTranslateErrorFragment = gql`
  fragment PageTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;

export const voucherTranslateErrorFragment = gql`
  fragment VoucherTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;

export const saleTranslateErrorFragment = gql`
  fragment SaleTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;

export const attributeTranslateErrorFragment = gql`
  fragment AttributeTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;

export const attributeValueTranslateErrorFragment = gql`
  fragment AttributeValueTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;

export const shippingPriceTranslateErrorFragment = gql`
  fragment ShippingPriceTranslateErrorFragment on TranslationError {
    code
    field
    message
  }
`;
