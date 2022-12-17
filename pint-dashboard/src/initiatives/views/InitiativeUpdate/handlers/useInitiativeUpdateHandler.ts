import { FetchResult } from "@apollo/client";
// import {
//   mergeAttributeValueDeleteErrors,
//   mergeFileUploadErrors,
// } from "@saleor/attributes/utils/data";
// import {
//   handleDeleteMultipleAttributeValues,
//   handleUploadMultipleFiles,
// } from "@saleor/attributes/utils/handlers";
import {
  // AttributeErrorFragment,
  // BulkInitiativeErrorFragment,
  MetadataErrorFragment,
  // InitiativeChannelListingErrorFragment,
  InitiativeErrorFragment,
  // InitiativeErrorWithAttributesFragment,
  InitiativeFragment,
  UploadErrorFragment,
  // useAttributeValueDeleteMutation,
  useFileUploadMutation,
  // useInitiativeChannelListingUpdateMutation,
  useInitiativeUpdateMutation,
  // useInitiativeVariantBulkCreateMutation,
  // useInitiativeVariantBulkDeleteMutation,
  useUpdateMetadataMutation,
  useUpdatePrivateMetadataMutation,
  // useVariantDatagridChannelListingUpdateMutation,
  // useVariantDatagridStockUpdateMutation,
  // useVariantDatagridUpdateMutation,
} from "@saleor/graphql";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { InitiativeUpdateSubmitData } from "@saleor/initiatives/components/InitiativeUpdatePage/types";
// import { getVariantChannelsInputs } from "@saleor/initiatives/components/InitiativeVariants/datagrid/getVariantChannelsInputs";
// import {
//   getStockInputs,
//   getStocks,
//   getVariantChannels,
//   getVariantInput,
//   getVariantInputs,
// } from "@saleor/initiatives/components/InitiativeVariants/utils";
import { getInitiativeErrorMessage } from "@saleor/utils/errors";
import createMetadataUpdateHandler from "@saleor/utils/handlers/metadataUpdateHandler";
import { useState } from "react";
import { useIntl } from "react-intl";

import { getInitiativeVariantListErrors, InitiativeVariantListError } from "./errors";
import {
  getInitiativeChannelsUpdateVariables,
  getInitiativeUpdateVariables,
} from "./utils";

export type UseInitiativeUpdateHandlerError =
  // | InitiativeErrorWithAttributesFragment
  | InitiativeErrorFragment
  // | BulkInitiativeErrorFragment
  // | AttributeErrorFragment
  | UploadErrorFragment
  // | InitiativeChannelListingErrorFragment
  | InitiativeVariantListError;

type UseInitiativeUpdateHandler = (
  data: InitiativeUpdateSubmitData,
) => Promise<Array<UseInitiativeUpdateHandlerError | MetadataErrorFragment>>;
interface UseInitiativeUpdateHandlerOpts {
  called: boolean;
  loading: boolean;
  // errors: InitiativeErrorWithAttributesFragment[];
  variantListErrors: InitiativeVariantListError[];
  // channelsErrors: InitiativeChannelListingErrorFragment[];
}

export function useInitiativeUpdateHandler(
  initiative: InitiativeFragment,
): [UseInitiativeUpdateHandler, UseInitiativeUpdateHandlerOpts] {
  const intl = useIntl();
  const notify = useNotifier();
  // const [variantListErrors, setVariantListErrors] = useState<
  const [variantListErrors] = useState<
    InitiativeVariantListError[]
  >([]);
  const [called, setCalled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [updateMetadata] = useUpdateMetadataMutation({});
  const [updatePrivateMetadata] = useUpdatePrivateMetadataMutation({});
  // const [updateStocks] = useVariantDatagridStockUpdateMutation({});
  // const [updateVariant] = useVariantDatagridUpdateMutation();
  // const [createVariants] = useInitiativeVariantBulkCreateMutation();
  // const [deleteVariants] = useInitiativeVariantBulkDeleteMutation();

  const [uploadFile] = useFileUploadMutation();

  const [updateInitiative, updateInitiativeOpts] = useInitiativeUpdateMutation();
  // const [
  //   updateChannels,
  //   updateChannelsOpts,
  // ] = useInitiativeChannelListingUpdateMutation({
  //   onCompleted: data => {
  //     if (!!data.initiativeChannelListingUpdate.errors.length) {
  //       data.initiativeChannelListingUpdate.errors.forEach(error =>
  //         notify({
  //           status: "error",
  //           text: getInitiativeErrorMessage(error, intl),
  //         }),
  //       );
  //     }
  //   },
  // });

  // const [
  //   updateVariantChannels,
  // ] = useVariantDatagridChannelListingUpdateMutation();
  //
  // const [deleteAttributeValue] = useAttributeValueDeleteMutation();

  const sendMutations = async (
    data: InitiativeUpdateSubmitData,
  ): Promise<UseInitiativeUpdateHandlerError[]> => {
    let errors: UseInitiativeUpdateHandlerError[] = [];
    // const uploadFilesResult = await handleUploadMultipleFiles(
    //   data.attributesWithNewFileValue,
    //   variables => uploadFile({ variables }),
    // );

    // const deleteAttributeValuesResult = await handleDeleteMultipleAttributeValues(
    //   data.attributesWithNewFileValue,
    //   initiative?.attributes,
    //   variables => deleteAttributeValue({ variables }),
    // );

    errors = [
      ...errors,
      // ...mergeFileUploadErrors(uploadFilesResult),
      // ...mergeAttributeValueDeleteErrors(deleteAttributeValuesResult),
    ];

    // if (data.variants.removed.length > 0) {
    //   errors.push(
    //     ...(
    //       await deleteVariants({
    //         variables: {
    //           ids: data.variants.removed.map(
    //             index => initiative.variants[index].id,
    //           ),
    //         },
    //       })
    //     ).data.initiativeVariantBulkDelete.errors,
    //   );
    // }

    const result = await updateInitiative({
      // variables: getInitiativeUpdateVariables(initiative, data, uploadFilesResult),
      variables: getInitiativeUpdateVariables(initiative, data),
    });
    errors = [...errors, ...result.data.initiativeUpdate.errors];

    // const initiativeChannelsUpdateResult = await updateChannels({
    //   variables: getInitiativeChannelsUpdateVariables(initiative, data),
    // });

    // const mutations: Array<Promise<FetchResult>> = [
    //   // ...getStocks(initiative.variants, data.variants).map(variables =>
    //   //   updateStocks({ variables }),
    //   // ),
    //   // ...getVariantInputs(initiative.variants, data.variants).map(variables =>
    //   //   updateVariant({ variables }),
    //   // ),
    //   // ...getVariantChannels(initiative.variants, data.variants).map(variables =>
    //   //   updateVariantChannels({
    //   //     variables,
    //   //   }),
    //   // ),
    // ];

    // if (data.variants.added.length > 0) {
    //   mutations.push(
    //     createVariants({
    //       variables: {
    //         id: initiative.id,
    //         inputs: data.variants.added.map(index => ({
    //           ...getVariantInput(data.variants, index),
    //           channelListings: getVariantChannelsInputs(data.variants, index),
    //           stocks: getStockInputs(data.variants, index).stocks,
    //         })),
    //       },
    //     }),
    //   );
    // }

    // const variantMutationResults = await Promise.all<FetchResult>(mutations);

    // const variantErrors = getInitiativeVariantListErrors(
    //   initiativeChannelsUpdateResult,
    //   variantMutationResults,
    // );

    // errors = [...errors, ...variantErrors];
    errors = [...errors];

    // setVariantListErrors(variantErrors);

    return errors;
  };

  const submit = async (data: InitiativeUpdateSubmitData) => {
    setCalled(true);
    setLoading(true);

    const errors = await createMetadataUpdateHandler(
      initiative,
      sendMutations,
      variables => updateMetadata({ variables }),
      variables => updatePrivateMetadata({ variables }),
    )(data);

    setLoading(false);

    if (errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges),
      });
    }

    return errors;
  };

  const errors = updateInitiativeOpts.data?.initiativeUpdate.errors ?? [];

  // const channelsErrors =
  //   updateChannelsOpts?.data?.initiativeChannelListingUpdate?.errors ?? [];

  return [
    submit,
    {
      called,
      loading,
      // channelsErrors,
      errors,
      variantListErrors,
    },
  ];
}
