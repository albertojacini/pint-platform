// import { ChannelData, createSortedChannelsData } from "@saleor/channels/utils";
// import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
// import { AttributeInput } from "@saleor/components/Attributes";
// import ChannelsAvailabilityDialog from "@saleor/components/ChannelsAvailabilityDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import {
  DEFAULT_INITIAL_SEARCH_DATA,
  VALUES_PAGINATE_BY,
} from "@saleor/config";
import {
  // InitiativeChannelListingErrorFragment,
  // InitiativeErrorWithAttributesFragment,
  useFileUploadMutation,
  // useInitiativeChannelListingUpdateMutation,
  useInitiativeCreateMutation,
  useInitiativeDeleteMutation,
  // useInitiativeTypeQuery,
  // useInitiativeVariantChannelListingUpdateMutation,
  // useTaxTypeListQuery,
  useUpdateMetadataMutation,
  useUpdatePrivateMetadataMutation,
  // useVariantCreateMutation,
  // useWarehouseListQuery,
} from "@saleor/graphql";
// import useChannels from "@saleor/hooks/useChannels";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
// import useShop from "@saleor/hooks/useShop";
import { getMutationErrors } from "@saleor/misc";
import InitiativeCreatePage, {
  InitiativeCreateData,
} from "@saleor/initiatives/components/InitiativeCreatePage";
import {
  initiativeAddUrl,
  InitiativeCreateUrlDialog,
  InitiativeCreateUrlQueryParams,
  initiativeUrl,
} from "@saleor/initiatives/urls";
// import useCategorySearch from "@saleor/searches/useCategorySearch";
// import useCollectionSearch from "@saleor/searches/useCollectionSearch";
// import usePageSearch from "@saleor/searches/usePageSearch";
import useInitiativeSearch from "@saleor/searches/useInitiativeSearch";
// import useInitiativeTypeSearch from "@saleor/searches/useInitiativeTypeSearch";
// import { getInitiativeErrorMessage } from "@saleor/utils/errors";
// import useAttributeValueSearchHandler from "@saleor/utils/handlers/attributeValueSearchHandler";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createMetadataCreateHandler from "@saleor/utils/handlers/metadataCreateHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
// import { warehouseAddPath } from "@saleor/warehouses/urls";
import React from "react";
import { useIntl } from "react-intl";

// import { INITIATIVE_CREATE_FORM_ID } from "./consts";
import { createHandler } from "./handlers";

interface InitiativeCreateProps {
  params: InitiativeCreateUrlQueryParams;
}

export const InitiativeCreateView: React.FC<InitiativeCreateProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  // const shop = useShop();
  const intl = useIntl();
  const [initiativeCreateComplete, setInitiativeCreateComplete] = React.useState(
    false,
  );
  const selectedInitiativeTypeId = params["initiative-type-id"];

  const handleSelectInitiativeType = (initiativeTypeId: string) =>
    navigate(
      initiativeAddUrl({
        ...params,
        "initiative-type-id": initiativeTypeId,
      }),
    );

  const [openModal, closeModal] = createDialogActionHandlers<
    InitiativeCreateUrlDialog,
    InitiativeCreateUrlQueryParams
  >(navigate, params => initiativeAddUrl(params), params);

  // const {
  //   loadMore: loadMoreCategories,
  //   search: searchCategory,
  //   result: searchCategoryOpts,
  // } = useCategorySearch({
  //   variables: DEFAULT_INITIAL_SEARCH_DATA,
  // });
  // const {
  //   loadMore: loadMoreCollections,
  //   search: searchCollection,
  //   result: searchCollectionOpts,
  // } = useCollectionSearch({
  //   variables: DEFAULT_INITIAL_SEARCH_DATA,
  // });
  // const {
  //   loadMore: loadMoreInitiativeTypes,
  //   search: searchInitiativeTypes,
  //   result: searchInitiativeTypesOpts,
  // } = useInitiativeTypeSearch({
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
  const [updateMetadata] = useUpdateMetadataMutation({});
  const [updatePrivateMetadata] = useUpdatePrivateMetadataMutation({});
  // const taxTypes = useTaxTypeListQuery({});
  // const { data: selectedInitiativeType } = useInitiativeTypeQuery({
  //   variables: {
  //     id: selectedInitiativeTypeId,
  //     firstValues: VALUES_PAGINATE_BY,
  //   },
  //   skip: !selectedInitiativeTypeId,
  // });

  // const initiativeTypes =
  //   mapEdgesToItems(searchInitiativeTypesOpts?.data?.search) || [];

  // const { availableChannels } = useAppChannel(false);
  // const allChannels: ChannelData[] = createSortedChannelsData(
  //   availableChannels,
  // );

  // const {
  //   channelListElements,
  //   channelsToggle,
  //   currentChannels,
  //   handleChannelsConfirm,
  //   handleChannelsModalClose,
  //   handleChannelsModalOpen,
  //   isChannelSelected,
  //   isChannelsModalOpen,
  //   setCurrentChannels,
  //   toggleAllChannels,
  // } = useChannels(
  //   allChannels,
  //   params?.action,
  //   {
  //     closeModal,
  //     openModal,
  //   },
  //   {
  //     formId: INITIATIVE_CREATE_FORM_ID,
  //   },
  // );

  // const warehouses = useWarehouseListQuery({
  //   displayLoader: true,
  //   variables: {
  //     first: 50,
  //     filter: {
  //       channels: currentChannels.map(channel => channel.id),
  //     },
  //   },
  // });

  const handleSuccess = (initiativeId: string) => {
    notify({
      status: "success",
      text: intl.formatMessage({
        id: "DO8+uV",
        defaultMessage: "Initiative created",
      }),
    });
    navigate(initiativeUrl(initiativeId));
  };

  const [uploadFile, uploadFileOpts] = useFileUploadMutation({});

  // const [
  //   updateChannels,
  //   updateChannelsOpts,
  // ] = useInitiativeChannelListingUpdateMutation({});
  // const [
  //   updateVariantChannels,
  //   updateVariantChannelsOpts,
  // ] = useInitiativeVariantChannelListingUpdateMutation({});

  const [initiativeCreate, initiativeCreateOpts] = useInitiativeCreateMutation({});
  const [deleteInitiative] = useInitiativeDeleteMutation({});
  // const [
  //   initiativeVariantCreate,
  //   initiativeVariantCreateOpts,
  // ] = useVariantCreateMutation({
  //   onCompleted: data => {
  //     const errors = data.initiativeVariantCreate.errors;
  //     if (errors.length) {
  //       errors.map(error =>
  //         notify({
  //           status: "error",
  //           text: getInitiativeErrorMessage(error, intl),
  //         }),
  //       );
  //     }
  //   },
  // });

  const handleSubmit = async (data: InitiativeCreateData) => {
    const errors = await createMetadataCreateHandler(
      createHandler(
        // selectedInitiativeType?.initiativeType,
        variables => uploadFile({ variables }),
        variables => initiativeCreate({ variables }),
        // variables => initiativeVariantCreate({ variables }),
        // updateChannels,
        // updateVariantChannels,
        deleteInitiative,
      ),
      updateMetadata,
      updatePrivateMetadata,
    )(data);

    if (!errors?.length) {
      setInitiativeCreateComplete(true);
    }

    return errors;
  };

  // const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
  //   navigate(
  //     initiativeAddUrl({
  //       action: "assign-attribute-value",
  //       id: attribute.id,
  //     }),
  //   );

  React.useEffect(() => {
    const initiativeId = initiativeCreateOpts.data?.initiativeCreate?.initiative?.id;

    if (initiativeCreateComplete && initiativeId) {
      handleSuccess(initiativeId);
    }
  }, [initiativeCreateComplete]);

  // const fetchMoreInitiativeTypes = {
  //   hasMore: searchInitiativeTypesOpts.data?.search?.pageInfo?.hasNextPage,
  //   loading: searchInitiativeTypesOpts.loading,
  //   onFetchMore: loadMoreInitiativeTypes,
  // };
  // const fetchMoreCollections = {
  //   hasMore: searchCollectionOpts.data?.search?.pageInfo?.hasNextPage,
  //   loading: searchCollectionOpts.loading,
  //   onFetchMore: loadMoreCollections,
  // };
  // const fetchMoreCategories = {
  //   hasMore: searchCategoryOpts.data?.search?.pageInfo?.hasNextPage,
  //   loading: searchCategoryOpts.loading,
  //   onFetchMore: loadMoreCategories,
  // };
  // const fetchMoreReferencePages = {
  //   hasMore: searchPagesOpts.data?.search?.pageInfo?.hasNextPage,
  //   loading: searchPagesOpts.loading,
  //   onFetchMore: loadMorePages,
  // };
  const fetchMoreReferenceInitiatives = {
    hasMore: searchInitiativesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchInitiativesOpts.loading,
    onFetchMore: loadMoreInitiatives,
  };
  // const fetchMoreAttributeValues = {
  //   hasMore: !!searchAttributeValuesOpts.data?.attribute?.choices?.pageInfo
  //     ?.hasNextPage,
  //   loading: !!searchAttributeValuesOpts.loading,
  //   onFetchMore: loadMoreAttributeValues,
  // };

  const loading = true
    // uploadFileOpts.loading ||
    // initiativeCreateOpts.loading ||
    // initiativeVariantCreateOpts.loading ||
    // updateChannelsOpts.loading ||
    // updateVariantChannelsOpts.loading;

  // const channelsErrors = [
  //   ...getMutationErrors(updateVariantChannelsOpts),
  //   ...getMutationErrors(updateChannelsOpts),
  // ] as InitiativeChannelListingErrorFragment[];
  const errors = [
    ...getMutationErrors(initiativeCreateOpts),
    // ...getMutationErrors(initiativeVariantCreateOpts),
  ] as InitiativeErrorWithAttributesFragment[];

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          id: "PXx4Jk",
          defaultMessage: "Create Initiative",
          description: "window title",
        })}
      />
      {/*{!!allChannels?.length && (*/}
      {/*  <ChannelsAvailabilityDialog*/}
      {/*    isSelected={isChannelSelected}*/}
      {/*    channels={allChannels}*/}
      {/*    onChange={channelsToggle}*/}
      {/*    onClose={handleChannelsModalClose}*/}
      {/*    open={isChannelsModalOpen}*/}
      {/*    title={intl.formatMessage({*/}
      {/*      id: "Eau5AV",*/}
      {/*      defaultMessage: "Manage Initiatives Channel Availability",*/}
      {/*    })}*/}
      {/*    confirmButtonState="default"*/}
      {/*    selected={channelListElements.length}*/}
      {/*    onConfirm={handleChannelsConfirm}*/}
      {/*    toggleAll={toggleAllChannels}*/}
      {/*  />*/}
      {/*)}*/}
      <InitiativeCreatePage
        // allChannelsCount={allChannels?.length}
        // currentChannels={currentChannels}
        // categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
        // collections={mapEdgesToItems(searchCollectionOpts?.data?.search) || []}
        // attributeValues={
        //   mapEdgesToItems(searchAttributeValuesOpts?.data?.attribute.choices) ||
        //   []
        // }
        loading={loading}
        // channelsErrors={channelsErrors}
        errors={errors}
        // fetchCategories={searchCategory}
        // fetchCollections={searchCollection}
        // fetchInitiativeTypes={searchInitiativeTypes}
        // fetchAttributeValues={searchAttributeValues}
        header={intl.formatMessage({
          id: "NBP8uu",
          defaultMessage: "New Initiative",
          description: "page header",
        })}
        // initiativeTypes={initiativeTypes}
        onSubmit={handleSubmit}
        // onWarehouseConfigure={() => navigate(warehouseAddPath)}
        saveButtonBarState={initiativeCreateOpts.status}
        // fetchMoreCategories={fetchMoreCategories}
        // fetchMoreCollections={fetchMoreCollections}
        // fetchMoreInitiativeTypes={fetchMoreInitiativeTypes}
        // warehouses={mapEdgesToItems(warehouses?.data?.warehouses) || []}
        // taxTypes={taxTypes.data?.taxTypes || []}
        // weightUnit={shop?.defaultWeightUnit}
        // openChannelsModal={handleChannelsModalOpen}
        // onChannelsChange={setCurrentChannels}
        assignReferencesAttributeId={
          params.action === "assign-attribute-value" && params.id
        }
        // onAssignReferencesClick={handleAssignAttributeReferenceClick}
        // referencePages={mapEdgesToItems(searchPagesOpts?.data?.search) || []}
        referenceInitiatives={
          mapEdgesToItems(searchInitiativesOpts?.data?.search) || []
        }
        // fetchReferencePages={searchPages}
        // fetchMoreReferencePages={fetchMoreReferencePages}
        fetchReferenceInitiatives={searchInitiatives}
        fetchMoreReferenceInitiatives={fetchMoreReferenceInitiatives}
        // fetchMoreAttributeValues={fetchMoreAttributeValues}
        onCloseDialog={() => navigate(initiativeAddUrl())}
        // selectedInitiativeType={selectedInitiativeType?.initiativeType}
        onSelectInitiativeType={handleSelectInitiativeType}
        // onAttributeSelectBlur={searchAttributeReset}
      />
    </>
  );
};
export default InitiativeCreateView;
