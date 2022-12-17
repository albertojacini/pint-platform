import placeholderImg from "@assets/images/placeholder255x255.png";
import { DialogContentText } from "@material-ui/core";
import ActionDialog from "@saleor/components/ActionDialog";
// import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
// import { AttributeInput } from "@saleor/components/Attributes";
import NotFoundPage from "@saleor/components/NotFoundPage";
// import { useShopLimitsQuery } from "@saleor/components/Shop/queries";
import { WindowTitle } from "@saleor/components/WindowTitle";
import {
  DEFAULT_INITIAL_SEARCH_DATA,
  VALUES_PAGINATE_BY,
} from "@saleor/config";
import {
  InitiativeMediaCreateMutationVariables,
  useInitiativeDeleteMutation,
  useInitiativeDetailsQuery,
  useInitiativeMediaCreateMutation,
  useInitiativeMediaDeleteMutation,
  useInitiativeMediaReorderMutation,
  // useWarehouseListQuery,
} from "@saleor/graphql";
import { getSearchFetchMoreProps } from "@saleor/hooks/makeTopLevelSearch/utils";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages, errorMessages } from "@saleor/intl";
// import { useSearchAttributeValuesSuggestions } from "@saleor/searches/useAttributeValueSearch";
// import useCategorySearch from "@saleor/searches/useCategorySearch";
// import useCollectionSearch from "@saleor/searches/useCollectionSearch";
// import usePageSearch from "@saleor/searches/usePageSearch";
import useInitiativeSearch from "@saleor/searches/useInitiativeSearch";
import { getInitiativeErrorMessage } from "@saleor/utils/errors";
// import useAttributeValueSearchHandler from "@saleor/utils/handlers/attributeValueSearchHandler";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import { getMutationState } from "../../../misc";
import InitiativeUpdatePage from "../../components/InitiativeUpdatePage";
import {
  initiativeListUrl,
  initiativeUrl,
  InitiativeUrlDialog,
  InitiativeUrlQueryParams,
  initiativeVariantEditUrl,
} from "../../urls";
import {
  createImageReorderHandler,
  createImageUploadHandler,
} from "./handlers";
import { useInitiativeUpdateHandler } from "./handlers/useInitiativeUpdateHandler";

const messages = defineMessages({
  deleteInitiativeDialogTitle: {
    id: "TWVx7O",
    defaultMessage: "Delete Initiative",
    description: "delete initiative dialog title",
  },
  deleteInitiativeDialogSubtitle: {
    id: "ZHF4Z9",
    defaultMessage: "Are you sure you want to delete {name}?",
    description: "delete initiative dialog subtitle",
  },
  deleteVariantDialogTitle: {
    id: "6iw4VR",
    defaultMessage: "Delete Initiative Variants",
    description: "delete variant dialog title",
  },
  deleteVariantDialogSubtitle: {
    id: "ukdRUv",
    defaultMessage:
      "{counter,plural,one{Are you sure you want to delete this variant?} other{Are you sure you want to delete {displayQuantity} variants?}}",
    description: "delete variant dialog subtitle",
  },
});

interface InitiativeUpdateProps {
  id: string;
  params: InitiativeUrlQueryParams;
}

export const InitiativeUpdate: React.FC<InitiativeUpdateProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  // const {
  //   loadMore: loadMoreCategories,
  //   search: searchCategories,
  //   result: searchCategoriesOpts,
  // } = useCategorySearch({
  //   variables: DEFAULT_INITIAL_SEARCH_DATA,
  // });
  // const {
  //   loadMore: loadMoreCollections,
  //   search: searchCollections,
  //   result: searchCollectionsOpts,
  // } = useCollectionSearch({
  //   variables: DEFAULT_INITIAL_SEARCH_DATA,
  // });
  // const {
  //   loadMore: loadMorePages,
  //   search: searchPages,
  //   result: searchPagesOpts,
  // } = usePageSearch({
  //   variables: DEFAULT_INITIAL_SEARCH_DATA,
  // });
  const {
    loadMore: loadMoreInitiatives,
    search: searchInitiatives,
    result: searchInitiativesOpts,
  } = useInitiativeSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  // const {
  //   loadMore: loadMoreAttributeValues,
  //   search: searchAttributeValues,
  //   result: searchAttributeValuesOpts,
  //   reset: searchAttributeReset,
  // } = useAttributeValueSearchHandler(DEFAULT_INITIAL_SEARCH_DATA);

  const { data, loading, refetch } = useInitiativeDetailsQuery({
    displayLoader: true,
    variables: {
      id,
      firstValues: VALUES_PAGINATE_BY,
    },
  });

  const isSimpleInitiative = !data?.initiative?.initiativeType?.hasVariants;

  const { availableChannels } = useAppChannel(false);

  // const limitOpts = useShopLimitsQuery({
  //   variables: {
  //     initiativeVariants: true,
  //   },
  // });

  const [
    reorderInitiativeImages,
    reorderInitiativeImagesOpts,
  ] = useInitiativeMediaReorderMutation({});

  const [deleteInitiative, deleteInitiativeOpts] = useInitiativeDeleteMutation({
    onCompleted: () => {
      notify({
        status: "success",
        text: intl.formatMessage({
          id: "vlVTmY",
          defaultMessage: "Initiative removed",
        }),
      });
      navigate(initiativeListUrl());
    },
  });

  const [
    createInitiativeImage,
    createInitiativeImageOpts,
  ] = useInitiativeMediaCreateMutation({
    onCompleted: data => {
      const imageError = data.initiativeMediaCreate.errors.find(
        error =>
          error.field ===
          ("image" as keyof InitiativeMediaCreateMutationVariables),
      );
      if (imageError) {
        notify({
          status: "error",
          title: intl.formatMessage(errorMessages.imgageUploadErrorTitle),
          text: intl.formatMessage(errorMessages.imageUploadErrorText),
        });
      }
    },
  });

  const [deleteInitiativeImage] = useInitiativeMediaDeleteMutation({
    onCompleted: () =>
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges),
      }),
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    InitiativeUrlDialog,
    InitiativeUrlQueryParams
  >(navigate, params => initiativeUrl(id, params), params);

  const initiative = data?.initiative;

  // const getAttributeValuesSuggestions = useSearchAttributeValuesSuggestions();
  // const warehousesQuery = useWarehouseListQuery({
  //   displayLoader: true,
  //   variables: {
  //     first: 50,
  //   },
  // });

  const [
    createInitiativeMedia,
    createInitiativeMediaOpts,
  ] = useInitiativeMediaCreateMutation({
    onCompleted: data => {
      const errors = data.initiativeMediaCreate.errors;

      if (errors.length) {
        errors.map(error =>
          notify({
            status: "error",
            text: getInitiativeErrorMessage(error, intl),
          }),
        );
      } else {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
      }
    },
  });

  const handleMediaUrlUpload = (mediaUrl: string) => {
    const variables = {
      alt: "",
      mediaUrl,
      initiative: initiative.id,
    };

    createInitiativeMedia({
      variables,
    });
  };

  const handleBack = () => navigate(initiativeListUrl());

  const handleImageDelete = (id: string) => () =>
    deleteInitiativeImage({ variables: { id } });

  const [submit, submitOpts] = useInitiativeUpdateHandler(initiative);

  // const warehouses = React.useMemo(
  //   () => mapEdgesToItems(warehousesQuery.data?.warehouses) || [],
  //   [warehousesQuery.data],
  // );

  const handleImageUpload = createImageUploadHandler(id, variables =>
    createInitiativeImage({ variables }),
  );
  const handleImageReorder = createImageReorderHandler(initiative, variables =>
    reorderInitiativeImages({ variables }),
  );

  // const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
  //   navigate(
  //     initiativeUrl(id, {
  //       action: "assign-attribute-value",
  //       id: attribute.id,
  //     }),
  //     { resetScroll: false },
  //   );

  const disableFormSave =
    submitOpts.loading ||
    createInitiativeImageOpts.loading ||
    deleteInitiativeOpts.loading ||
    reorderInitiativeImagesOpts.loading ||
    createInitiativeMediaOpts.loading ||
    loading;

  const formTransitionState = getMutationState(
    submitOpts.called,
    submitOpts.loading,
    submitOpts.errors,
    createInitiativeMediaOpts.data?.initiativeMediaCreate.errors,
  );

  // const categories = mapEdgesToItems(searchCategoriesOpts?.data?.search) || [];
  //
  // const collections =
  //   mapEdgesToItems(searchCollectionsOpts?.data?.search) || [];
  //
  // const attributeValues =
  //   mapEdgesToItems(searchAttributeValuesOpts?.data?.attribute.choices) || [];
  //
  // const fetchMoreCollections = getSearchFetchMoreProps(
  //   searchCollectionsOpts,
  //   loadMoreCollections,
  // );

  // const fetchMoreCategories = getSearchFetchMoreProps(
  //   searchCategoriesOpts,
  //   loadMoreCategories,
  // );
  //
  // const fetchMoreReferencePages = getSearchFetchMoreProps(
  //   searchPagesOpts,
  //   loadMorePages,
  // );

  const fetchMoreReferenceInitiatives = getSearchFetchMoreProps(
    searchInitiativesOpts,
    loadMoreInitiatives,
  );

  // const fetchMoreAttributeValues = {
  //   hasMore: !!searchAttributeValuesOpts.data?.attribute?.choices?.pageInfo
  //     ?.hasNextPage,
  //   loading: !!searchAttributeValuesOpts.loading,
  //   onFetchMore: loadMoreAttributeValues,
  // };

  if (initiative === null) {
    return <NotFoundPage onBack={handleBack} />;
  }

  return (
    <>
      <WindowTitle title={data?.initiative?.name} />
      <InitiativeUpdatePage
        channels={availableChannels}
        initiativeId={id}
        isSimpleInitiative={isSimpleInitiative}
        // channelsErrors={submitOpts.channelsErrors}
        // categories={categories}
        // collections={collections}
        // attributeValues={attributeValues}
        disabled={disableFormSave}
        errors={submitOpts.errors}
        variantListErrors={submitOpts.variantListErrors}
        // fetchCategories={searchCategories}
        // fetchCollections={searchCollections}
        // fetchAttributeValues={searchAttributeValues}
        refetch={refetch}
        // limits={limitOpts.data?.shop.limits}
        saveButtonBarState={formTransitionState}
        media={data?.initiative?.media}
        // header={initiative?.name}
        header={initiative?.title}
        placeholderImage={placeholderImg}
        initiative={initiative}
        // warehouses={warehouses}
        // taxTypes={data?.taxTypes}
        // variants={initiative?.variants}
        onDelete={() => openModal("remove")}
        onImageReorder={handleImageReorder}
        onMediaUrlUpload={handleMediaUrlUpload}
        onSubmit={submit}
        onVariantShow={variantId =>
          navigate(initiativeVariantEditUrl(initiative.id, variantId), {
            resetScroll: true,
          })
        }
        onImageUpload={handleImageUpload}
        onImageDelete={handleImageDelete}
        // fetchMoreCategories={fetchMoreCategories}
        // fetchMoreCollections={fetchMoreCollections}
        assignReferencesAttributeId={
          params.action === "assign-attribute-value" && params.id
        }
        // onAssignReferencesClick={handleAssignAttributeReferenceClick}
        referencePages={mapEdgesToItems(searchPagesOpts?.data?.search) || []}
        referenceInitiatives={
          mapEdgesToItems(searchInitiativesOpts?.data?.search) || []
        }
        // fetchReferencePages={searchPages}
        // fetchMoreReferencePages={fetchMoreReferencePages}
        fetchReferenceInitiatives={searchInitiatives}
        fetchMoreReferenceInitiatives={fetchMoreReferenceInitiatives}
        // fetchMoreAttributeValues={fetchMoreAttributeValues}
        onCloseDialog={() => navigate(initiativeUrl(id), { resetScroll: false })}
        // onAttributeSelectBlur={searchAttributeReset}
        // onAttributeValuesSearch={getAttributeValuesSuggestions}
      />
      <ActionDialog
        open={params.action === "remove"}
        onClose={closeModal}
        confirmButtonState={deleteInitiativeOpts.status}
        onConfirm={() => deleteInitiative({ variables: { id } })}
        variant="delete"
        title={intl.formatMessage(messages.deleteInitiativeDialogTitle)}
      >
        <DialogContentText>
          <FormattedMessage
            {...messages.deleteInitiativeDialogSubtitle}
            values={{ name: initiative?.name }}
          />
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default InitiativeUpdate;
