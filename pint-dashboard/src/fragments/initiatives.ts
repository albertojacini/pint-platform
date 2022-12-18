import { gql } from "@apollo/client";

// export const stockFragment = gql`
//   fragment Stock on Stock {
//     id
//     quantity
//     quantityAllocated
//     warehouse {
//       ...Warehouse
//     }
//   }
// `;
//
// export const fragmentMoney = gql`
//   fragment Money on Money {
//     amount
//     currency
//   }
// `;
//
// export const fragmentPreorder = gql`
//   fragment Preorder on PreorderData {
//     globalThreshold
//     globalSoldUnits
//     endDate
//   }
// `;
//
// export const priceRangeFragment = gql`
//   fragment PriceRange on TaxedMoneyRange {
//     start {
//       net {
//         ...Money
//       }
//     }
//     stop {
//       net {
//         ...Money
//       }
//     }
//   }
// `;

export const fragmentInitiativeMedia = gql`
  fragment InitiativeMedia on InitiativeMedia {
    id
    alt
    sortOrder
    url
    type
    oembedData
  }
`;

// export const channelListingInitiativeWithoutPricingFragment = gql`
//   fragment ChannelListingInitiativeWithoutPricing on InitiativeChannelListing {
//     isPublished
//     publicationDate
//     isAvailableForPurchase
//     availableForPurchase
//     visibleInListings
//     channel {
//       id
//       name
//       currencyCode
//     }
//   }
// `;
// export const channelListingInitiativeFragment = gql`
//   fragment ChannelListingInitiative on InitiativeChannelListing {
//     ...ChannelListingInitiativeWithoutPricing
//     pricing {
//       priceRange {
//         ...PriceRange
//       }
//     }
//   }
// `;
//
// export const channelListingInitiativeVariantFragment = gql`
//   fragment ChannelListingInitiativeVariant on InitiativeVariantChannelListing {
//     channel {
//       id
//       name
//       currencyCode
//     }
//     price {
//       ...Money
//     }
//     costPrice {
//       ...Money
//     }
//     preorderThreshold {
//       quantity
//       soldUnits
//     }
//   }
// `;

export const initiativeFragment = gql`
  fragment InitiativeWithChannelListings on Initiative {
    id
    title
    thumbnail {
      url
    }
#    initiativeType {
#      id
#      name
#      hasVariants
#    }
#    channelListings {
#      ...ChannelListingInitiativeWithoutPricing
#      pricing @include(if: $hasChannel) {
#        priceRange {
#          ...PriceRange
#        }
#      }
#    }
  }
`;

// export const initiativeVariantAttributesFragment = gql`
//   fragment InitiativeVariantAttributes on Initiative {
//     id
//     attributes {
//       attribute {
//         id
//         slug
//         name
//         inputType
//         entityType
//         valueRequired
//         unit
//         choices(
//           first: $firstValues
//           after: $afterValues
//           last: $lastValues
//           before: $beforeValues
//         ) {
//           ...AttributeValueList
//         }
//       }
//       values {
//         ...AttributeValueDetails
//       }
//     }
//     initiativeType {
//       id
//       variantAttributes(variantSelection: VARIANT_SELECTION) {
//         id
//         name
//         inputType
//         valueRequired
//         unit
//         choices(
//           first: $firstValues
//           after: $afterValues
//           last: $lastValues
//           before: $beforeValues
//         ) {
//           ...AttributeValueList
//         }
//       }
//     }
//     channelListings {
//       channel {
//         id
//         name
//         currencyCode
//       }
//     }
//   }
// `;

// export const initiativeDetailsVariant = gql`
//   fragment InitiativeDetailsVariant on InitiativeVariant {
//     id
//     sku
//     name
//     margin
//     media {
//       url(size: 200)
//     }
//     stocks {
//       ...Stock
//     }
//     trackInventory
//     preorder {
//       ...Preorder
//     }
//     channelListings {
//       ...ChannelListingInitiativeVariant
//     }
//     quantityLimitPerCustomer
//   }
// `;

export const initiativeFragmentDetails = gql`
  fragment Initiative on Initiative {
#    ...InitiativeVariantAttributes
    ...Metadata
    title
    slug
    description
    seoTitle
    seoDescription
#    rating
#    defaultVariant {
#      id
#    }
#    category {
#      id
#      name
#    }
#    collections {
#      id
#      name
#    }
#    chargeTaxes
#    channelListings {
#      ...ChannelListingInitiativeWithoutPricing
#    }
    media {
      ...InitiativeMedia
    }
#    isAvailable
#    variants {
#      ...InitiativeDetailsVariant
#    }
#    initiativeType {
#      id
#      name
#      hasVariants
#      taxType {
#        ...TaxType
#      }
#    }
#    weight {
#      ...Weight
#    }
#    taxType {
#      ...TaxType
#    }
  }
`;

// export const variantAttributeFragment = gql`
//   fragment VariantAttribute on Attribute {
//     id
//     name
//     slug
//     inputType
//     entityType
//     valueRequired
//     unit
//     choices(
//       first: $firstValues
//       after: $afterValues
//       last: $lastValues
//       before: $beforeValues
//     ) {
//       ...AttributeValueList
//     }
//   }
// `;
//
// export const selectedVariantAttributeFragment = gql`
//   fragment SelectedVariantAttribute on SelectedAttribute {
//     attribute {
//       ...VariantAttribute
//     }
//     values {
//       ...AttributeValueDetails
//     }
//   }
// `;
//
// export const fragmentVariant = gql`
//   fragment InitiativeVariant on InitiativeVariant {
//     id
//     ...Metadata
//     selectionAttributes: attributes(variantSelection: VARIANT_SELECTION) {
//       ...SelectedVariantAttribute
//     }
//     nonSelectionAttributes: attributes(
//       variantSelection: NOT_VARIANT_SELECTION
//     ) {
//       ...SelectedVariantAttribute
//     }
//     media {
//       id
//       url
//       type
//       oembedData
//     }
//     name
//     initiative {
//       id
//       defaultVariant {
//         id
//       }
//       media {
//         ...InitiativeMedia
//       }
//       name
//       thumbnail {
//         url
//       }
//       channelListings {
//         publicationDate
//         isPublished
//         channel {
//           id
//           name
//           currencyCode
//         }
//       }
//       variants {
//         id
//         name
//         sku
//         media {
//           id
//           url
//           type
//           oembedData
//         }
//       }
//       defaultVariant {
//         id
//       }
//     }
//     channelListings {
//       ...ChannelListingInitiativeVariant
//     }
//     sku
//     stocks {
//       ...Stock
//     }
//     trackInventory
//     preorder {
//       ...Preorder
//     }
//     weight {
//       ...Weight
//     }
//     quantityLimitPerCustomer
//   }
// `;

export const exportFileFragment = gql`
  fragment ExportFile on ExportFile {
    id
    status
    url
  }
`;

// export const initiativeListAttribute = gql`
//   fragment InitiativeListAttribute on SelectedAttribute {
//     attribute {
//       id
//     }
//     values {
//       ...AttributeValue
//     }
//   }
// `;
