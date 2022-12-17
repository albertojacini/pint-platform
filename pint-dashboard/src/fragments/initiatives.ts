import { gql } from "@apollo/client";


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
  }
`;

export const initiativeVariantAttributesFragment = gql`
  fragment InitiativeVariantAttributes on Initiative {
    id
  }
`;

export const initiativeFragmentDetails = gql`
  fragment Initiative on Initiative {
    ...InitiativeVariantAttributes
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
`;
