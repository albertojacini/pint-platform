// import { FetchResult } from "@apollo/client";
// import { getAttributesAfterFileAttributesUpdate } from "@saleor/attributes/utils/data";
// import { prepareAttributesInput } from "@saleor/attributes/utils/handlers";
// import { VALUES_PAGINATE_BY } from "@saleor/config";
// import {
//   FileUploadMutation,
//   InitiativeChannelListingAddInput,
//   InitiativeChannelListingUpdateMutationVariables,
//   InitiativeFragment,
// } from "@saleor/graphql";
// import { InitiativeUpdateSubmitData } from "@saleor/initiatives/components/InitiativeUpdatePage/types";
// import { getColumnChannelAvailability } from "@saleor/initiatives/components/InitiativeVariants/datagrid/columnData";
// import { getAttributeInputFromInitiative } from "@saleor/initiatives/utils/data";
// import { getParsedDataForJsonStringField } from "@saleor/utils/richText/misc";
// import pick from "lodash/pick";
// import uniq from "lodash/uniq";
//
// export function getInitiativeUpdateVariables(
//   initiative: InitiativeFragment,
//   data: InitiativeUpdateSubmitData,
//   uploadFilesResult: Array<FetchResult<FileUploadMutation>>,
// ) {
//   const updatedFileAttributes = getAttributesAfterFileAttributesUpdate(
//     data.attributesWithNewFileValue,
//     uploadFilesResult,
//   );
//
//   return {
//     id: initiative.id,
//     input: {
//       attributes: prepareAttributesInput({
//         attributes: data.attributes,
//         prevAttributes: getAttributeInputFromInitiative(initiative),
//         updatedFileAttributes,
//       }),
//       category: data.category,
//       chargeTaxes: data.chargeTaxes,
//       collections: data.collections,
//       description: getParsedDataForJsonStringField(data.description),
//       name: data.name,
//       rating: data.rating,
//       seo: {
//         description: data.seoDescription,
//         title: data.seoTitle,
//       },
//       slug: data.slug,
//       taxCode: data.changeTaxCode ? data.taxCode : null,
//     },
//     firstValues: VALUES_PAGINATE_BY,
//   };
// }
//
// const hasChannel = (
//   channelId: string,
//   variant?: InitiativeFragment["variants"][number],
// ) => {
//   if (!variant) {
//     return false;
//   }
//
//   return variant.channelListings.some(c => c.channel.id === channelId);
// };
//
// export function getInitiativeChannelsUpdateVariables(
//   initiative: InitiativeFragment,
//   data: InitiativeUpdateSubmitData,
// ): InitiativeChannelListingUpdateMutationVariables {
//   const channels = uniq([
//     ...initiative.channelListings.map(listing => listing.channel.id),
//     ...data.channels.updateChannels.map(listing => listing.channelId),
//   ]);
//
//   const dataUpdated = new Map<string, InitiativeChannelListingAddInput>();
//   data.channels.updateChannels
//     .map(listing =>
//       pick(
//         listing,
//         // Filtering it here so we send only fields defined in input schema
//         [
//           "availableForPurchaseAt",
//           "availableForPurchaseDate",
//           "channelId",
//           "isAvailableForPurchase",
//           "isPublished",
//           "publicationDate",
//           "publishedAt",
//           "visibleInListings",
//         ] as Array<keyof InitiativeChannelListingAddInput>,
//       ),
//     )
//     .forEach(listing => dataUpdated.set(listing.channelId, listing));
//
//   const variantsUpdates = new Map<string, InitiativeChannelListingAddInput>();
//   channels
//     .map(channelId => ({
//       channelId,
//       addVariants: data.variants.updates
//         .filter(
//           change =>
//             !data.variants.added.includes(change.row) &&
//             !hasChannel(channelId, initiative.variants[change.row]) &&
//             channelId === getColumnChannelAvailability(change.column) &&
//             change.data,
//         )
//         .map(change => initiative.variants[change.row].id),
//       removeVariants: data.variants.updates
//         .filter(
//           change =>
//             initiative.variants[change.row] &&
//             channelId === getColumnChannelAvailability(change.column) &&
//             !change.data,
//         )
//         .map(change => initiative.variants[change.row].id),
//     }))
//     .filter(
//       listing =>
//         listing.addVariants.length > 0 || listing.removeVariants.length > 0,
//     )
//     .forEach(listing => variantsUpdates.set(listing.channelId, listing));
//
//   const updateChannels = channels
//     .filter(
//       channelId => dataUpdated.has(channelId) || variantsUpdates.has(channelId),
//     )
//     .map(channelId => ({
//       ...dataUpdated.get(channelId),
//       ...variantsUpdates.get(channelId),
//     }));
//
//   return {
//     id: initiative.id,
//     input: {
//       ...data.channels,
//       updateChannels,
//     },
//   };
// }
