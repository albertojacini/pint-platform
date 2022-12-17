import {
  extensionMountPoints,
  mapToMenuItemsForInitiativeDetails,
  useExtensions,
} from "@saleor/apps/useExtensions";
// import {
//   getAttributeValuesFromReferences,
//   mergeAttributeValues,
// } from "@saleor/attributes/utils/data";
// import { ChannelData } from "@saleor/channels/utils";
// import AssignAttributeValueDialog from "@saleor/components/AssignAttributeValueDialog";
// import Attributes, { AttributeInput } from "@saleor/components/Attributes";
import { Backlink } from "@saleor/components/Backlink";
import CardMenu from "@saleor/components/CardMenu";
import CardSpacer from "@saleor/components/CardSpacer";
// import ChannelsAvailabilityCard from "@saleor/components/ChannelsAvailabilityCard";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
import Metadata from "@saleor/components/Metadata/Metadata";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import SeoForm from "@saleor/components/SeoForm";
import { Choice } from "@saleor/components/SingleSelectField";
import {
  // ChannelFragment,
  PermissionEnum,
  // InitiativeChannelListingErrorFragment,
  // InitiativeDetailsVariantFragment,
  InitiativeErrorFragment,
  // InitiativeErrorWithAttributesFragment,
  InitiativeFragment,
  // RefreshLimitsQuery,
  // SearchAttributeValuesQuery,
  // SearchCategoriesQuery,
  // SearchCollectionsQuery,
  // SearchPagesQuery,
  SearchInitiativesQuery,
  // TaxTypeFragment,
  // WarehouseFragment,
} from "@saleor/graphql";
import { SubmitPromise } from "@saleor/hooks/useForm";
import useNavigator from "@saleor/hooks/useNavigator";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { sectionNames } from "@saleor/intl";
import { ConfirmButtonTransitionState } from "@saleor/macaw-ui";
import { maybe } from "@saleor/misc";
import InitiativeExternalMediaDialog from "@saleor/initiatives/components/InitiativeExternalMediaDialog";
import { initiativeImageUrl, initiativeListUrl } from "@saleor/initiatives/urls";
import { InitiativeVariantListError } from "@saleor/initiatives/views/InitiativeUpdate/handlers/errors";
import { UseInitiativeUpdateHandlerError } from "@saleor/initiatives/views/InitiativeUpdate/handlers/useInitiativeUpdateHandler";
import { FetchMoreProps, RelayToFlat } from "@saleor/types";
import React from "react";
import { useIntl } from "react-intl";

import { getChoices } from "../../utils/data";
import InitiativeDetailsForm from "../InitiativeDetailsForm";
import InitiativeMedia from "../InitiativeMedia";
import InitiativeOrganization from "../InitiativeOrganization";
// import InitiativeTaxes from "../InitiativeTaxes";
// import InitiativeVariants from "../InitiativeVariants";
import InitiativeUpdateForm from "./form";
// import InitiativeChannelsListingsDialog from "./InitiativeChannelsListingsDialog";
import {
  InitiativeUpdateData,
  InitiativeUpdateHandlers,
  InitiativeUpdateSubmitData,
} from "./types";

export interface InitiativeUpdatePageProps {
  // channels: ChannelFragment[];
  initiativeId: string;
  // channelsErrors: InitiativeChannelListingErrorFragment[];
  variantListErrors: InitiativeVariantListError[];
  errors: UseInitiativeUpdateHandlerError[];
  placeholderImage: string;
  // collections: RelayToFlat<SearchCollectionsQuery["search"]>;
  // categories: RelayToFlat<SearchCategoriesQuery["search"]>;
  // attributeValues: RelayToFlat<
  //   SearchAttributeValuesQuery["attribute"]["choices"]
  // >;
  disabled: boolean;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  isMediaUrlModalVisible?: boolean;
  // limits: RefreshLimitsQuery["shop"]["limits"];
  // variants: InitiativeDetailsVariantFragment[];
  media: InitiativeFragment["media"];
  initiative: InitiativeFragment;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  // warehouses: WarehouseFragment[];
  // taxTypes: TaxTypeFragment[];
  // referencePages?: RelayToFlat<SearchPagesQuery["search"]>;
  referenceInitiatives?: RelayToFlat<SearchInitiativesQuery["search"]>;
  assignReferencesAttributeId?: string;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchMoreReferenceInitiatives?: FetchMoreProps;
  // fetchMoreAttributeValues?: FetchMoreProps;
  isSimpleInitiative: boolean;
  // fetchCategories: (query: string) => void;
  // fetchCollections: (query: string) => void;
  fetchReferencePages?: (data: string) => void;
  fetchReferenceInitiatives?: (data: string) => void;
  // fetchAttributeValues: (query: string, attributeId: string) => void;
  refetch: () => Promise<any>;
  // onAttributeValuesSearch: (
  //   id: string,
  //   query: string,
  // ) => Promise<Array<Choice<string, string>>>;
  onAssignReferencesClick: (attribute: AttributeInput) => void;
  onCloseDialog: () => void;
  onImageDelete: (id: string) => () => void;
  onSubmit: (data: InitiativeUpdateSubmitData) => SubmitPromise;
  onVariantShow: (id: string) => void;
  onAttributeSelectBlur: () => void;
  onDelete();
  onImageReorder?(event: { oldIndex: number; newIndex: number });
  onImageUpload(file: File);
  onMediaUrlUpload(mediaUrl: string);
  onSeoClick?();
}

export const InitiativeUpdatePage: React.FC<InitiativeUpdatePageProps> = ({
  initiativeId,
  disabled,
  // categories: categoryChoiceList,
  // channels,
  // channelsErrors,
  // variantListErrors,
  // collections: collectionChoiceList,
  // attributeValues,
  isSimpleInitiative,
  errors,
  // fetchCategories,
  // fetchCollections,
  // fetchMoreCategories,
  // fetchMoreCollections,
  media,
  header,
  // limits,
  placeholderImage,
  initiative,
  saveButtonBarState,
  // variants,
  // warehouses,
  // taxTypes,
  referencePages = [],
  referenceInitiatives = [],
  onDelete,
  onImageDelete,
  onImageReorder,
  onImageUpload,
  onMediaUrlUpload,
  // onVariantShow,
  onSeoClick,
  onSubmit,
  isMediaUrlModalVisible,
  assignReferencesAttributeId,
  // onAttributeValuesSearch,
  onAssignReferencesClick,
  fetchReferencePages,
  fetchMoreReferencePages,
  fetchReferenceInitiatives,
  fetchMoreReferenceInitiatives,
  fetchAttributeValues,
  fetchMoreAttributeValues,
  refetch,
  onCloseDialog,
  onAttributeSelectBlur,
}) => {
  const intl = useIntl();
  const navigate = useNavigator();
  // const [channelPickerOpen, setChannelPickerOpen] = React.useState(false);

  // const [selectedCategory, setSelectedCategory] = useStateFromProps(
  //   initiative?.category?.name || "",
  // );

  const [mediaUrlModalStatus, setMediaUrlModalStatus] = useStateFromProps(
    isMediaUrlModalVisible || false,
  );

  // const [selectedCollections, setSelectedCollections] = useStateFromProps(
  //   getChoices(maybe(() => initiative.collections, [])),
  // );

  // const [selectedTaxType, setSelectedTaxType] = useStateFromProps(
  //   initiative?.taxType.description,
  // );

  // const categories = getChoices(categoryChoiceList);
  // const collections = getChoices(collectionChoiceList);
  // const hasVariants = initiative?.initiativeType?.hasVariants;
  // const taxTypeChoices =
  //   taxTypes?.map(taxType => ({
  //     label: taxType.description,
  //     value: taxType.taxCode,
  //   })) || [];

  // const canOpenAssignReferencesAttributeDialog = !!assignReferencesAttributeId;

  // const handleAssignReferenceAttribute = (
  //   attributeValues: string[],
  //   data: InitiativeUpdateData,
  //   handlers: InitiativeUpdateHandlers,
  // ) => {
  //   handlers.selectAttributeReference(
  //     assignReferencesAttributeId,
  //     mergeAttributeValues(
  //       assignReferencesAttributeId,
  //       attributeValues,
  //       data.attributes,
  //     ),
  //   );
  //   onCloseDialog();
  // };

  const { INITIATIVE_DETAILS_MORE_ACTIONS } = useExtensions(
    extensionMountPoints.INITIATIVE_DETAILS,
  );

  const initiativeErrors = React.useMemo(
    () =>
      errors.filter(
        error => error.__typename === "InitiativeError",
      // ) as InitiativeErrorWithAttributesFragment[],
      ),
    [errors],
  );

  // const initiativeOrganizationErrors = React.useMemo(
  //   () =>
  //     [...errors, ...channelsErrors].filter(err =>
  //       ["InitiativeChannelListingError", "InitiativeError"].includes(err.__typename),
  //     ) as Array<InitiativeErrorFragment | InitiativeChannelListingErrorFragment>,
  //   [errors, channelsErrors],
  // );

  const extensionMenuItems = mapToMenuItemsForInitiativeDetails(
    INITIATIVE_DETAILS_MORE_ACTIONS,
    initiativeId,
  );

  return (
    <InitiativeUpdateForm
      isSimpleInitiative={isSimpleInitiative}
      onSubmit={onSubmit}
      initiative={initiative}
      // categories={categories}
      // collections={collections}
      // selectedCollections={selectedCollections}
      // setSelectedCategory={setSelectedCategory}
      // setSelectedCollections={setSelectedCollections}
      // setSelectedTaxType={setSelectedTaxType}
      // taxTypes={taxTypeChoices}
      // warehouses={warehouses}
      // hasVariants={hasVariants}
      referencePages={referencePages}
      referenceInitiatives={referenceInitiatives}
      fetchReferencePages={fetchReferencePages}
      fetchMoreReferencePages={fetchMoreReferencePages}
      fetchReferenceInitiatives={fetchReferenceInitiatives}
      fetchMoreReferenceInitiatives={fetchMoreReferenceInitiatives}
      assignReferencesAttributeId={assignReferencesAttributeId}
      disabled={disabled}
      refetch={refetch}
    >
      {({
        change,
        data,
        handlers,
        submit,
        isSaveDisabled,
        // attributeRichTextGetters,
      }) => {
        const availabilityCommonProps = {
          managePermissions: [PermissionEnum.MANAGE_INITIATIVES],
          messages: {
            hiddenLabel: intl.formatMessage({
              id: "saKXY3",
              defaultMessage: "Not published",
              description: "initiative label",
            }),

            visibleLabel: intl.formatMessage({
              id: "qJedl0",
              defaultMessage: "Published",
              description: "initiative label",
            }),
          },
          // errors: channelsErrors,
          // allChannelsCount: channels?.length,
          disabled,
          onChange: handlers.changeChannels,
          // openModal: () => setChannelPickerOpen(true),
        };

        // const listings = data.channels.updateChannels.map<ChannelData>(
        //   listing => {
        //     const channel = channels?.find(ac => ac.id === listing.channelId);
        //     return {
        //       id: listing.channelId,
        //       ...channel,
        //       ...listing,
        //       availableForPurchase: listing.availableForPurchaseDate,
        //       currency: channel.currencyCode,
        //     };
        //   },
        // );

        return (
          <>
            <Container>
              <Backlink href={initiativeListUrl()}>
                {intl.formatMessage(sectionNames.initiatives)}
              </Backlink>
              <PageHeader title={header}>
                {extensionMenuItems.length > 0 && (
                  <CardMenu
                    menuItems={extensionMenuItems}
                    data-test-id="menu"
                  />
                )}
              </PageHeader>
              <Grid richText>
                <div>
                  <InitiativeDetailsForm
                    data={data}
                    disabled={disabled}
                    errors={initiativeErrors}
                    onChange={change}
                  />
                  <CardSpacer />
                  <InitiativeMedia
                    media={media}
                    placeholderImage={placeholderImage}
                    onImageDelete={onImageDelete}
                    onImageReorder={onImageReorder}
                    onImageUpload={onImageUpload}
                    openMediaUrlModal={() => setMediaUrlModalStatus(true)}
                    getImageEditUrl={imageId =>
                      initiativeImageUrl(initiativeId, imageId)
                    }
                  />
                  <CardSpacer />
                  {/*{data.attributes.length > 0 && (*/}
                  {/*  <Attributes*/}
                  {/*    attributes={data.attributes}*/}
                  {/*    // attributeValues={attributeValues}*/}
                  {/*    errors={initiativeErrors}*/}
                  {/*    loading={disabled}*/}
                  {/*    disabled={disabled}*/}
                  {/*    onChange={handlers.selectAttribute}*/}
                  {/*    onMultiChange={handlers.selectAttributeMultiple}*/}
                  {/*    onFileChange={handlers.selectAttributeFile}*/}
                  {/*    onReferencesRemove={handlers.selectAttributeReference}*/}
                  {/*    onReferencesAddClick={onAssignReferencesClick}*/}
                  {/*    onReferencesReorder={handlers.reorderAttributeValue}*/}
                  {/*    fetchAttributeValues={fetchAttributeValues}*/}
                  {/*    fetchMoreAttributeValues={fetchMoreAttributeValues}*/}
                  {/*    onAttributeSelectBlur={onAttributeSelectBlur}*/}
                  {/*    richTextGetters={attributeRichTextGetters}*/}
                  {/*  />*/}
                  {/*)}*/}
                  <CardSpacer />
                  {/*<InitiativeVariants*/}
                  {/*  errors={variantListErrors}*/}
                  {/*  channels={listings}*/}
                  {/*  limits={limits}*/}
                  {/*  variants={variants}*/}
                  {/*  variantAttributes={initiative?.initiativeType.variantAttributes}*/}
                  {/*  warehouses={warehouses}*/}
                  {/*  onAttributeValuesSearch={onAttributeValuesSearch}*/}
                  {/*  onChange={handlers.changeVariants}*/}
                  {/*  onRowClick={onVariantShow}*/}
                  {/*/>*/}
                  <CardSpacer />
                  <SeoForm
                    errors={initiativeErrors}
                    title={data.seoTitle}
                    titlePlaceholder={data.name}
                    description={data.seoDescription}
                    descriptionPlaceholder={""} // TODO: cast description to string
                    slug={data.slug}
                    slugPlaceholder={data.name}
                    loading={disabled}
                    onClick={onSeoClick}
                    onChange={change}
                    helperText={intl.formatMessage({
                      id: "LKoIB1",
                      defaultMessage:
                        "Add search engine title and description to make this initiative easier to find",
                    })}
                  />
                  <CardSpacer />
                  <Metadata data={data} onChange={handlers.changeMetadata} />
                </div>
                <div>
                  {/*<InitiativeOrganization*/}
                  {/*  canChangeType={false}*/}
                  {/*  // categories={categories}*/}
                  {/*  // categoryInputDisplayValue={selectedCategory}*/}
                  {/*  // collections={collections}*/}
                  {/*  // collectionsInputDisplayValue={selectedCollections}*/}
                  {/*  data={data}*/}
                  {/*  disabled={disabled}*/}
                  {/*  errors={initiativeOrganizationErrors}*/}
                  {/*  // fetchCategories={fetchCategories}*/}
                  {/*  // fetchCollections={fetchCollections}*/}
                  {/*  // fetchMoreCategories={fetchMoreCategories}*/}
                  {/*  // fetchMoreCollections={fetchMoreCollections}*/}
                  {/*  // initiativeType={initiative?.initiativeType}*/}
                  {/*  // onCategoryChange={handlers.selectCategory}*/}
                  {/*  // onCollectionChange={handlers.selectCollection}*/}
                  {/*/>*/}
                  <CardSpacer />
                  {/*<ChannelsAvailabilityCard*/}
                  {/*  {...availabilityCommonProps}*/}
                  {/*  channels={listings}*/}
                  {/*/>*/}
                  <CardSpacer />
                  {/*<InitiativeTaxes*/}
                  {/*  data={data}*/}
                  {/*  disabled={disabled}*/}
                  {/*  selectedTaxTypeDisplayName={selectedTaxType}*/}
                  {/*  taxTypes={taxTypes}*/}
                  {/*  onChange={change}*/}
                  {/*  onTaxTypeChange={handlers.selectTaxRate}*/}
                  {/*/>*/}
                </div>
              </Grid>
              <Savebar
                onCancel={() => navigate(initiativeListUrl())}
                onDelete={onDelete}
                onSubmit={submit}
                state={saveButtonBarState}
                disabled={isSaveDisabled}
              />
              {/*{canOpenAssignReferencesAttributeDialog && (*/}
              {/*  <AssignAttributeValueDialog*/}
              {/*    attributeValues={getAttributeValuesFromReferences(*/}
              {/*      assignReferencesAttributeId,*/}
              {/*      data.attributes,*/}
              {/*      referencePages,*/}
              {/*      referenceInitiatives,*/}
              {/*    )}*/}
              {/*    hasMore={handlers.fetchMoreReferences?.hasMore}*/}
              {/*    open={canOpenAssignReferencesAttributeDialog}*/}
              {/*    onFetch={handlers.fetchReferences}*/}
              {/*    onFetchMore={handlers.fetchMoreReferences?.onFetchMore}*/}
              {/*    loading={handlers.fetchMoreReferences?.loading}*/}
              {/*    onClose={onCloseDialog}*/}
              {/*    onSubmit={attributeValues =>*/}
              {/*      handleAssignReferenceAttribute(*/}
              {/*        attributeValues,*/}
              {/*        data,*/}
              {/*        handlers,*/}
              {/*      )*/}
              {/*    }*/}
              {/*  />*/}
              {/*)}*/}

              <InitiativeExternalMediaDialog
                initiative={initiative}
                onClose={() => setMediaUrlModalStatus(false)}
                open={mediaUrlModalStatus}
                onSubmit={onMediaUrlUpload}
              />
              {/*<InitiativeChannelsListingsDialog*/}
              {/*  channels={channels}*/}
              {/*  data={data}*/}
              {/*  onClose={() => setChannelPickerOpen(false)}*/}
              {/*  open={channelPickerOpen}*/}
              {/*  onConfirm={handlers.updateChannelList}*/}
              {/*/>*/}
            </Container>
          </>
        );
      }}
    </InitiativeUpdateForm>
  );
};
InitiativeUpdatePage.displayName = "InitiativeUpdatePage";
export default InitiativeUpdatePage;
