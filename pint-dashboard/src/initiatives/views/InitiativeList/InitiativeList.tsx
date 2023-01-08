import { DialogContentText } from "@material-ui/core";
// import { filterable } from "@saleor/attributes/utils/data";
import ActionDialog from "@saleor/components/ActionDialog";
// import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData,
} from "@saleor/components/SaveFilterTabDialog";
// import { useShopLimitsQuery } from "@saleor/components/Shop/queries";
import {
  DEFAULT_INITIAL_PAGINATION_DATA,
  DEFAULT_INITIAL_SEARCH_DATA,
  defaultListSettings,
  InitiativeListColumns,
} from "@saleor/config";
// import { Task } from "@saleor/containers/BackgroundTasks/types";
import {
  InitiativeListQueryVariables,
  // useGridAttributesQuery,
  // useInitialInitiativeFilterAttributesQuery,
  // useInitialInitiativeFilterCategoriesQuery,
  // useInitialInitiativeFilterCollectionsQuery,
  // useInitialInitiativeFilterInitiativeTypesQuery,
  useInitiativeBulkDeleteMutation,
  // useInitiativeCountQuery,
  // useInitiativeExportMutation,
  useInitiativeListQuery,
  // useWarehouseListQuery,
} from "@saleor/graphql";
// import useBackgroundTask from "@saleor/hooks/useBackgroundTask";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { usePaginationReset } from "@saleor/hooks/usePaginationReset";
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from "@saleor/hooks/usePaginator";
import { commonMessages } from "@saleor/intl";
import { DeleteIcon, IconButton } from "@saleor/macaw-ui";
import { maybe } from "@saleor/misc";
import InitiativeExportDialog from "@saleor/initiatives/components/InitiativeExportDialog";
import {
  getAttributeIdFromColumnValue,
  isAttributeColumnValue,
} from "@saleor/initiatives/components/InitiativeListPage/utils";
import InitiativeTypePickerDialog from "@saleor/initiatives/components/InitiativeTypePickerDialog";
import {
  initiativeAddUrl,
  initiativeListUrl,
  InitiativeListUrlDialog,
  InitiativeListUrlQueryParams,
  InitiativeListUrlSortField,
} from "@saleor/initiatives/urls";
// import useAttributeSearch from "@saleor/searches/useAttributeSearch";
// import useAttributeValueSearch from "@saleor/searches/useAttributeValueSearch";
// import useAvailableInGridAttributesSearch from "@saleor/searches/useAvailableInGridAttributesSearch";
// import useCategorySearch from "@saleor/searches/useCategorySearch";
// import useCollectionSearch from "@saleor/searches/useCollectionSearch";
// import useInitiativeTypeSearch from "@saleor/searches/useInitiativeTypeSearch";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import { mapEdgesToItems, mapNodeToChoice } from "@saleor/utils/maps";
import { getSortUrlVariables } from "@saleor/utils/sort";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

// import { useSortRedirects } from "../../../hooks/useSortRedirects";
import InitiativeListPage from "../../components/InitiativeListPage";
import {
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from "./filters";
import { canBeSorted, DEFAULT_SORT_KEY, getSortQueryVariables } from "./sort";
// import { getAvailableInitiativeKinds, getInitiativeKindOpts } from "./utils";

interface InitiativeListProps {
  params: InitiativeListUrlQueryParams;
}

export const InitiativeList: React.FC<InitiativeListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  // const { queue } = useBackgroundTask();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids,
  );
  const { updateListSettings, settings } = useListSettings<InitiativeListColumns>(
    ListViews.INITIATIVE_LIST,
  );

  usePaginationReset(initiativeListUrl, params, settings.rowNumber);

  const intl = useIntl();
  // const {
  //   data: initialFilterAttributes,
  // } = useInitialInitiativeFilterAttributesQuery();
  // const {
  //   data: initialFilterCategories,
  // } = useInitialInitiativeFilterCategoriesQuery({
  //   variables: {
  //     categories: params.categories,
  //   },
  //   skip: !params.categories?.length,
  // });
  // const {
  //   data: initialFilterCollections,
  // } = useInitialInitiativeFilterCollectionsQuery({
  //   variables: {
  //     collections: params.collections,
  //   },
  //   skip: !params.collections?.length,
  // });
  // const {
  //   data: initialFilterInitiativeTypes,
  // } = useInitialInitiativeFilterInitiativeTypesQuery({
  //   variables: {
  //     initiativeTypes: params.initiativeTypes,
  //   },
  //   skip: !params.initiativeTypes?.length,
  // });
  // const searchCategories = useCategorySearch({
  //   variables: {
  //     ...DEFAULT_INITIAL_SEARCH_DATA,
  //     first: 5,
  //   },
  // });
  // const searchCollections = useCollectionSearch({
  //   variables: {
  //     ...DEFAULT_INITIAL_SEARCH_DATA,
  //     first: 5,
  //   },
  // });
  // const searchInitiativeTypes = useInitiativeTypeSearch({
  //   variables: {
  //     ...DEFAULT_INITIAL_SEARCH_DATA,
  //     first: 5,
  //   },
  // });
  // const searchAttributes = useAttributeSearch({
  //   variables: {
  //     ...DEFAULT_INITIAL_SEARCH_DATA,
  //     first: 10,
  //   },
  // });
  // const [focusedAttribute, setFocusedAttribute] = useState<string>();
  // const searchAttributeValues = useAttributeValueSearch({
  //   variables: {
  //     id: focusedAttribute,
  //     ...DEFAULT_INITIAL_SEARCH_DATA,
  //     first: 10,
  //   },
  //   skip: !focusedAttribute,
  // });
  // const warehouses = useWarehouseListQuery({
  //   variables: {
  //     first: 100,
  //   },
  //   skip: params.action !== "export",
  // });
  // const availableInitiativeKinds = getAvailableInitiativeKinds();
  // const { availableChannels } = useAppChannel(false);
  // const limitOpts = useShopLimitsQuery({
  //   variables: {
  //     initiativeVariants: true,
  //   },
  // });

  // const selectedChannel = availableChannels.find(
  //   channel => channel.slug === params.channel,
  // );

  // useSortRedirects<InitiativeListUrlSortField>({
  //   params,
  //   defaultSortField: DEFAULT_SORT_KEY,
  //   urlFunc: initiativeListUrl,
  //   // resetToDefault: !canBeSorted(params.sort, !!selectedChannel),
  //   resetToDefault: !canBeSorted(params.sort),
  // });

  const [openModal, closeModal] = createDialogActionHandlers<
    InitiativeListUrlDialog,
    InitiativeListUrlQueryParams
  >(navigate, initiativeListUrl, params);

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  // const countAllInitiatives = useInitiativeCountQuery({
  //   skip: params.action !== "export",
  // });

  // const [exportInitiatives, exportInitiativesOpts] = useInitiativeExportMutation({
  //   onCompleted: data => {
  //     if (data.exportInitiatives.errors.length === 0) {
  //       notify({
  //         text: intl.formatMessage({
  //           id: "dPYqy0",
  //           defaultMessage:
  //             "We are currently exporting your requested CSV. As soon as it is available it will be sent to your email address",
  //         }),
  //         title: intl.formatMessage({
  //           id: "5QKsu+",
  //           defaultMessage: "Exporting CSV",
  //           description: "waiting for export to end, header",
  //         }),
  //       });
  //       queue(Task.EXPORT, {
  //         id: data.exportInitiatives.exportFile.id,
  //       });
  //       closeModal();
  //       reset();
  //     }
  //   },
  // });

  const [
    changeFilters,
    resetFilters,
    handleSearchChange,
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: initiativeListUrl,
    getFilterQueryParam,
    navigate,
    params,
  });

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      initiativeListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data,
      }),
    );
  };

  const handleFilterTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(initiativeListUrl());
  };

  const handleFilterTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const handleSort = (field: InitiativeListUrlSortField, attributeId?: string) =>
    navigate(
      initiativeListUrl({
        ...params,
        ...getSortUrlVariables(field, params),
        attributeId,
        ...DEFAULT_INITIAL_PAGINATION_DATA,
      }),
    );

  // const kindOpts = getInitiativeKindOpts(availableInitiativeKinds, intl);
  const paginationState = createPaginationState(settings.rowNumber, params);
  // const channelOpts = availableChannels
  //   ? mapNodeToChoice(availableChannels, channel => channel.slug)
  //   : null;
  // const filter = getFilterVariables(params, !!selectedChannel);
  const filter = getFilterVariables(params);
  // const sort = getSortQueryVariables(params, !!selectedChannel);
  const sort = getSortQueryVariables(params);
  const queryVariables = React.useMemo<
    Omit<InitiativeListQueryVariables, "hasChannel" | "hasSelectedAttributes">
  >(
    () => ({
      ...paginationState,
      filter,
      sort,
      // channel: selectedChannel?.slug,
    }),
    [params, settings.rowNumber],
  );

  // const filteredColumnIds = settings.columns
  //   .filter(isAttributeColumnValue)
  //   .map(getAttributeIdFromColumnValue);

  const { data, loading, refetch } = useInitiativeListQuery({
    displayLoader: true,
    variables: {
      ...queryVariables,
      // hasChannel: !!selectedChannel,
      // hasSelectedAttributes: filteredColumnIds.length > 0,
    },
  });

  // const availableInGridAttributesOpts = useAvailableInGridAttributesSearch({
  //   variables: {
  //     ...DEFAULT_INITIAL_SEARCH_DATA,
  //     first: 5,
  //   },
  // });
  // const gridAttributes = useGridAttributesQuery({
  //   variables: { ids: filteredColumnIds },
  //   skip: filteredColumnIds.length === 0,
  // });

  const [
    initiativeBulkDelete,
    initiativeBulkDeleteOpts,
  ] = useInitiativeBulkDeleteMutation({
    onCompleted: data => {
      if (data.initiativeBulkDelete.errors.length === 0) {
        closeModal();
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
        reset();
        refetch();
        // limitOpts.refetch();
      }
    },
  });

  // const {
  //   loadMore: loadMoreDialogInitiativeTypes,
  //   search: searchDialogInitiativeTypes,
  //   result: searchDialogInitiativeTypesOpts,
  // } = useInitiativeTypeSearch({
  //   variables: DEFAULT_INITIAL_SEARCH_DATA,
  // });

  // const fetchMoreDialogInitiativeTypes = {
  //   // hasMore: searchDialogInitiativeTypesOpts.data?.search?.pageInfo?.hasNextPage,
  //   // loading: searchDialogInitiativeTypesOpts.loading,
  //   onFetchMore: loadMoreDialogInitiativeTypes,
  // };

  const filterOpts = getFilterOpts(
    params,
    // (mapEdgesToItems(initialFilterAttributes?.attributes) || []).filter(
    //   filterable,
    // ),
    // searchAttributeValues,
    // {
    //   initial: mapEdgesToItems(initialFilterCategories?.categories) || [],
    //   search: searchCategories,
    // },
    // {
    //   initial: mapEdgesToItems(initialFilterCollections?.collections) || [],
    //   search: searchCollections,
    // },
    // {
    //   initial: mapEdgesToItems(initialFilterInitiativeTypes?.initiativeTypes) || [],
    //   search: searchInitiativeTypes,
    // },
    // kindOpts,
    // channelOpts,
  );

  const paginationValues = usePaginator({
    pageInfo: data?.initiatives?.pageInfo,
    paginationState,
    queryString: params,
  });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <InitiativeListPage
        activeAttributeSortId={params.attributeId}
        sort={{
          asc: params.asc,
          sort: params.sort,
        }}
        onSort={handleSort}
        // availableInGridAttributes={
        //   mapEdgesToItems(
        //     availableInGridAttributesOpts.result?.data?.availableInGrid,
        //   ) || []
        // }
        // currencySymbol={selectedChannel?.currencyCode || ""}
        currentTab={currentTab}
        defaultSettings={defaultListSettings[ListViews.INITIATIVE_LIST]}
        filterOpts={filterOpts}
        // gridAttributes={mapEdgesToItems(gridAttributes?.data?.grid) || []}
        settings={settings}
        // loading={
        //   availableInGridAttributesOpts.result.loading || gridAttributes.loading
        // }
        // hasMore={maybe(
        //   () =>
        //     availableInGridAttributesOpts.result.data.availableInGrid.pageInfo
        //       .hasNextPage,
        //   false,
        // )}
        disabled={loading}
        // limits={limitOpts.data?.shop.limits}
        initiatives={mapEdgesToItems(data?.initiatives)}
        // onColumnQueryChange={availableInGridAttributesOpts.search}
        // onFetchMore={availableInGridAttributesOpts.loadMore}
        onUpdateListSettings={updateListSettings}
        onAdd={() => openModal("create-initiative")}
        onAll={resetFilters}
        toolbar={
          <IconButton
            variant="secondary"
            color="primary"
            onClick={() =>
              openModal("delete", {
                ids: listElements,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        // onFilterAttributeFocus={setFocusedAttribute}
        onTabSave={() => openModal("save-search")}
        onTabDelete={() => openModal("delete-search")}
        onTabChange={handleTabChange}
        initialSearch={params.query || ""}
        tabs={getFilterTabs().map(tab => tab.name)}
        onExport={() => openModal("export")}
        // selectedChannelId={selectedChannel?.id}
        // columnQuery={availableInGridAttributesOpts.query}
      />
      <ActionDialog
        open={params.action === "delete"}
        confirmButtonState={initiativeBulkDeleteOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          initiativeBulkDelete({
            variables: { ids: params.ids },
          })
        }
        title={intl.formatMessage({
          id: "F4WdSO",
          defaultMessage: "Delete Initiatives",
          description: "dialog header",
        })}
        variant="delete"
      >
        <DialogContentText>
          <FormattedMessage
            id="yDkmX7"
            defaultMessage="{counter,plural,one{Are you sure you want to delete this initiative?} other{Are you sure you want to delete {displayQuantity} initiatives?}}"
            description="dialog content"
            values={{
              counter: params?.ids?.length,
              displayQuantity: <strong>{params?.ids?.length}</strong>,
            }}
          />
        </DialogContentText>
      </ActionDialog>
      {/*<InitiativeExportDialog*/}
      {/*  // attributes={*/}
      {/*  //   mapEdgesToItems(searchAttributes?.result?.data?.search) || []*/}
      {/*  // }*/}
      {/*  // hasMore={searchAttributes.result.data?.search.pageInfo.hasNextPage}*/}
      {/*  // loading={*/}
      {/*  //   searchAttributes.result.loading ||*/}
      {/*  //   countAllInitiatives.loading ||*/}
      {/*  //   warehouses.loading*/}
      {/*  // }*/}
      {/*  // onFetch={searchAttributes.search}*/}
      {/*  // onFetchMore={searchAttributes.loadMore}*/}
      {/*  open={params.action === "export"}*/}
      {/*  // confirmButtonState={exportInitiativesOpts.status}*/}
      {/*  // errors={exportInitiativesOpts.data?.exportInitiatives.errors || []}*/}
      {/*  initiativeQuantity={{*/}
      {/*    all: countAllInitiatives.data?.initiatives?.totalCount,*/}
      {/*    filter: data?.initiatives?.totalCount,*/}
      {/*  }}*/}
      {/*  selectedInitiatives={listElements.length}*/}
      {/*  // warehouses={mapEdgesToItems(warehouses?.data?.warehouses) || []}*/}
      {/*  // channels={availableChannels}*/}
      {/*  onClose={closeModal}*/}
      {/*  onSubmit={data =>*/}
      {/*    exportInitiatives({*/}
      {/*      variables: {*/}
      {/*        input: {*/}
      {/*          ...data,*/}
      {/*          filter,*/}
      {/*          ids: listElements,*/}
      {/*        },*/}
      {/*      },*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}
      <SaveFilterTabDialog
        open={params.action === "save-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === "delete-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabDelete}
        tabName={maybe(() => tabs[currentTab - 1].name, "...")}
      />
      <InitiativeTypePickerDialog
        confirmButtonState="success"
        open={params.action === "create-initiative"}
        // initiativeTypes={mapNodeToChoice(
        //   mapEdgesToItems(searchDialogInitiativeTypesOpts?.data?.search),
        // )}
        // fetchInitiativeTypes={searchDialogInitiativeTypes}
        // fetchMoreInitiativeTypes={fetchMoreDialogInitiativeTypes}
        onClose={closeModal}
        onConfirm={initiativeTypeId =>
          navigate(
            initiativeAddUrl({
              "initiative-type-id": initiativeTypeId,
            }),
            // initiativeAddUrl({
            //   "initiative-type-id": initiativeTypeId,
            // }),
          )
        }
      />
    </PaginatorContext.Provider>
  );
};
export default InitiativeList;
