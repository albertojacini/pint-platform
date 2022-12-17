import { FetchResult } from "@apollo/client";
import {
  InitiativeChannelListingUpdateMutation,
  InitiativeErrorCode,
  InitiativeVariantBulkCreateMutation,
  InitiativeVariantChannelListingUpdateMutation,
  InitiativeVariantChannelListingUpdateMutationVariables,
  StockInput,
  VariantDatagridStockUpdateMutation,
  VariantDatagridStockUpdateMutationVariables,
  VariantDatagridUpdateMutation,
  VariantDatagridUpdateMutationVariables,
} from "@saleor/graphql";
import { hasMutationErrors } from "@saleor/misc";

export type InitiativeVariantListError =
  | {
      __typename: "DatagridError";
      attributes: string[] | null;
      error: InitiativeErrorCode;
      variantId: string;
      type: "variantData";
    }
  | {
      __typename: "DatagridError";
      variantId: string;
      warehouseId: string;
      type: "stock";
    }
  | {
      __typename: "DatagridError";
      error: InitiativeErrorCode;
      variantId: string;
      channelIds: string[];
      type: "channel";
    }
  | {
      __typename: "DatagridError";
      error: InitiativeErrorCode;
      index: number;
      type: "create";
    };

export function getInitiativeVariantListErrors(
  initiativeChannelsUpdateResult: FetchResult<InitiativeChannelListingUpdateMutation>,
  variantMutationResults: FetchResult[],
): InitiativeVariantListError[] {
  return [initiativeChannelsUpdateResult, ...variantMutationResults]
    .filter(hasMutationErrors)
    .flatMap(result => {
      if (result.data.initiativeVariantChannelListingUpdate) {
        const data = result.data as InitiativeVariantChannelListingUpdateMutation;
        return data.initiativeVariantChannelListingUpdate.errors.map<
          InitiativeVariantListError
        >(error => ({
          __typename: "DatagridError",
          type: "channel",
          error: error.code,
          variantId: (result.extensions
            .variables as InitiativeVariantChannelListingUpdateMutationVariables)
            .id,
          channelIds: error.channels,
        }));
      }

      if (result.data.initiativeVariantStocksUpdate) {
        const data = result.data as VariantDatagridStockUpdateMutation;
        const variables = result.extensions
          .variables as VariantDatagridStockUpdateMutationVariables;
        return [
          ...data.initiativeVariantStocksUpdate.errors.map<
            InitiativeVariantListError
          >(error => ({
            __typename: "DatagridError",
            type: "stock",
            variantId: (variables as VariantDatagridStockUpdateMutationVariables)
              .id,
            warehouseId: (variables.stocks as StockInput[])[error.index]
              .warehouse,
          })),
          ...data.initiativeVariantStocksDelete.errors.map<
            InitiativeVariantListError
          >(() => ({
            __typename: "DatagridError",
            type: "stock",
            variantId: (variables as VariantDatagridStockUpdateMutationVariables)
              .id,
            warehouseId: null,
          })),
        ];
      }

      if (result.data.initiativeVariantUpdate) {
        const data = result.data as VariantDatagridUpdateMutation;
        const variables = result.extensions
          .variables as VariantDatagridUpdateMutationVariables;
        return data.initiativeVariantUpdate.errors.map<InitiativeVariantListError>(
          error => ({
            __typename: "DatagridError",
            type: "variantData",
            variantId: (variables as VariantDatagridUpdateMutationVariables).id,
            error: error.code,
            attributes: error.attributes,
          }),
        );
      }

      if (result.data.initiativeVariantBulkCreate) {
        const data = result.data as InitiativeVariantBulkCreateMutation;
        return data.initiativeVariantBulkCreate.errors.map<
          InitiativeVariantListError
        >(error => ({
          __typename: "DatagridError",
          type: "create",
          index: error.index,
          error: error.code,
        }));
      }
    });
}
