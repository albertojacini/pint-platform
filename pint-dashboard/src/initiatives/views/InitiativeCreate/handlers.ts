import { FetchResult } from "@apollo/client";
// import {
//   getAttributesAfterFileAttributesUpdate,
//   mergeFileUploadErrors,
// } from "@saleor/attributes/utils/data";
// import {
//   handleUploadMultipleFiles,
//   prepareAttributesInput,
// } from "@saleor/attributes/utils/handlers";
// import { ChannelData } from "@saleor/channels/utils";
import {
  // AttributeErrorFragment,
  FileUploadMutation,
  FileUploadMutationVariables,
  // InitiativeChannelListingErrorFragment,
  // InitiativeChannelListingUpdateMutation,
  // InitiativeChannelListingUpdateMutationVariables,
  InitiativeCreateMutation,
  InitiativeCreateMutationVariables,
  InitiativeDeleteMutation,
  InitiativeDeleteMutationVariables,
  InitiativeErrorFragment,
  // InitiativeTypeQuery,
  // InitiativeVariantChannelListingUpdateMutation,
  // InitiativeVariantChannelListingUpdateMutationVariables,
  UploadErrorFragment,
  // VariantCreateMutation,
  // VariantCreateMutationVariables,
} from "@saleor/graphql";
// import { weight } from "@saleor/misc";
import { InitiativeCreateData } from "@saleor/initiatives/components/InitiativeCreatePage/form";
import { getAvailabilityVariables } from "@saleor/initiatives/utils/handlers";
import { getParsedDataForJsonStringField } from "@saleor/utils/richText/misc";

// const getChannelsVariables = (initiativeId: string, channels: ChannelData[]) => ({
//   variables: {
//     id: initiativeId,
//     input: {
//       updateChannels: getAvailabilityVariables(channels),
//     },
//   },
// });

const getSimpleInitiativeVariables = (
  formData: InitiativeCreateData,
  initiativeId: string,
) => ({
  input: {
    // attributes: [],
    initiative: initiativeId,
    // sku: formData.sku,
    // stocks: formData.stocks?.map(stock => ({
    //   quantity: parseInt(stock.value, 10),
    //   warehouse: stock.id,
    // })),
    // preorder: formData.isPreorder
    //   ? {
    //       globalThreshold: formData.globalThreshold
    //         ? parseInt(formData.globalThreshold, 10)
    //         : null,
    //       endDate: formData.preorderEndDateTime || null,
    //     }
    //   : null,
    // trackInventory: formData.trackInventory,
  },
});

export function createHandler(
  // initiativeType: InitiativeTypeQuery["initiativeType"],
  uploadFile: (
    variables: FileUploadMutationVariables,
  ) => Promise<FetchResult<FileUploadMutation>>,
  initiativeCreate: (
    variables: InitiativeCreateMutationVariables,
  ) => Promise<FetchResult<InitiativeCreateMutation>>,
  // initiativeVariantCreate: (
  //   variables: VariantCreateMutationVariables,
  // ) => Promise<FetchResult<VariantCreateMutation>>,
  // updateChannels: (options: {
  //   variables: InitiativeChannelListingUpdateMutationVariables;
  // }) => Promise<FetchResult<InitiativeChannelListingUpdateMutation>>,
  // updateVariantChannels: (options: {
  //   variables: InitiativeVariantChannelListingUpdateMutationVariables;
  // }) => Promise<FetchResult<InitiativeVariantChannelListingUpdateMutation>>,
  initiativeDelete: (options: {
    variables: InitiativeDeleteMutationVariables;
  }) => Promise<FetchResult<InitiativeDeleteMutation>>,
) {
  return async (formData: InitiativeCreateData) => {
    let errors: Array<
      // | AttributeErrorFragment
      | UploadErrorFragment
      | InitiativeErrorFragment
      // | InitiativeChannelListingErrorFragment
    > = [];

    // const uploadFilesResult = await handleUploadMultipleFiles(
    //   formData.attributesWithNewFileValue,
    //   uploadFile,
    // );

    // errors = [...errors, ...mergeFileUploadErrors(uploadFilesResult)];
    // const updatedFileAttributes = getAttributesAfterFileAttributesUpdate(
    //   formData.attributesWithNewFileValue,
    //   uploadFilesResult,
    // );

    const initiativeVariables: InitiativeCreateMutationVariables = {
      input: {
        // attributes: prepareAttributesInput({
        //   attributes: formData.attributes,
        //   prevAttributes: null,
        //   updatedFileAttributes,
        // }),
        // category: formData.category,
        // chargeTaxes: formData.chargeTaxes,
        // collections: formData.collections,
        description: getParsedDataForJsonStringField(formData.description),
        title: formData.title,
        // initiativeType: formData.initiativeType?.id,
        // rating: formData.rating,
        seo: {
          description: formData.seoDescription,
          title: formData.seoTitle,
        },
        slug: formData.slug,
        // taxCode: formData.changeTaxCode ? formData.taxCode : undefined,
        // weight: weight(formData.weight),
      },
    };

    const result = await initiativeCreate(initiativeVariables);
    const initiativeErrors = result.data.initiativeCreate.errors || [];

    errors = [...errors, ...initiativeErrors];

    // const hasVariants = initiativeType?.hasVariants;
    const initiativeId = result?.data?.initiativeCreate?.initiative?.id;

    if (!initiativeId) {
      return { errors };
    }

    // if (!hasVariants) {
    //   const result = await Promise.all([
    //     updateChannels(
    //       getChannelsVariables(initiativeId, formData.channelListings),
    //     ),
    //     initiativeVariantCreate(getSimpleInitiativeVariables(formData, initiativeId)),
    //   ]);
    //   const channelErrors =
    //     result[0].data?.initiativeChannelListingUpdate?.errors || [];
    //   const variantErrors = result[1].data?.initiativeVariantCreate?.errors || [];
    //   errors = [...errors, ...channelErrors, ...variantErrors];
    //
    //   const variantId = result[1].data.initiativeVariantCreate.initiativeVariant?.id;
    //   if (variantErrors.length === 0 && variantId) {
    //     updateVariantChannels({
    //       variables: {
    //         id: variantId,
    //         input: formData.channelListings.map(listing => ({
    //           channelId: listing.id,
    //           costPrice: listing.costPrice || null,
    //           price: listing.price,
    //         })),
    //       },
    //     });
    //   }
    // } else {
    //   const result = await updateChannels(
    //     getChannelsVariables(initiativeId, formData.channelListings),
    //   );
    //   const channelErrors =
    //     result.data?.initiativeChannelListingUpdate?.errors || [];
    //
    //   errors = [...errors, ...channelErrors];
    // }

    /*
     INFO: This is a stop-gap solution, where we delete initiatives that didn't meet all required data in the create form
     A more robust solution would require merging create and update form into one to persist form state across redirects
    */
    if (initiativeId && errors.length > 0) {
      await initiativeDelete({ variables: { id: initiativeId } });

      return { errors };
    }
    return { id: initiativeId || null, errors };
  };
}
