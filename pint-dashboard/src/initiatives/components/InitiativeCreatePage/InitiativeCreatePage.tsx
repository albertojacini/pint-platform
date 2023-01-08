// import {
//   getAttributeValuesFromReferences,
//   mergeAttributeValues,
// } from "@saleor/attributes/utils/data";
// import CannotDefineChannelsAvailabilityCard from "@saleor/channels/components/CannotDefineChannelsAvailabilityCard/CannotDefineChannelsAvailabilityCard";
// import { ChannelData } from "@saleor/channels/utils";
// import AssignAttributeValueDialog from "@saleor/components/AssignAttributeValueDialog";
// import Attributes, { AttributeInput } from "@saleor/components/Attributes";
import { Backlink } from "@saleor/components/Backlink";
import CardSpacer from "@saleor/components/CardSpacer";
// import ChannelsAvailabilityCard from "@saleor/components/ChannelsAvailabilityCard";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
import Metadata from "@saleor/components/Metadata";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
// import SeoForm from "@saleor/components/SeoForm";
import {
  PermissionEnum,
  // InitiativeChannelListingErrorFragment,
  // InitiativeErrorWithAttributesFragment,
  // InitiativeTypeQuery,
  // SearchAttributeValuesQuery,
  // SearchCategoriesQuery,
  // SearchCollectionsQuery,
  // SearchPagesQuery,
  SearchInitiativesQuery,
  // SearchInitiativeTypesQuery,
  // SearchWarehousesQuery,
  // TaxTypeFragment,
} from "@saleor/graphql";
import useNavigator from "@saleor/hooks/useNavigator";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { sectionNames } from "@saleor/intl";
import { ConfirmButtonTransitionState } from "@saleor/macaw-ui";
// import InitiativeVariantPrice from "@saleor/initiatives/components/InitiativeVariantPrice";
import { initiativeListUrl } from "@saleor/initiatives/urls";
import { getChoices } from "@saleor/initiatives/utils/data";
import React from "react";
import { useIntl } from "react-intl";

import { FetchMoreProps, RelayToFlat } from "../../../types";
import InitiativeDetailsForm from "../InitiativeDetailsForm";
import InitiativeOrganization from "../InitiativeOrganization";
// import InitiativeShipping from "../InitiativeShipping/InitiativeShipping";
// import InitiativeStocks from "../InitiativeStocks";
// import InitiativeTaxes from "../InitiativeTaxes";
import InitiativeCreateForm, {
  InitiativeCreateData,
  InitiativeCreateFormData,
  InitiativeCreateHandlers,
} from "./form";

interface InitiativeCreatePageProps {
  // errors: InitiativeErrorWithAttributesFragment[];
  // channelsErrors: InitiativeChannelListingErrorFragment[];
  // allChannelsCount: number;
  // currentChannels: ChannelData[];
  // collections: RelayToFlat<SearchCollectionsQuery["search"]>;
  // categories: RelayToFlat<SearchCategoriesQuery["search"]>;
  // attributeValues: RelayToFlat<
  //   SearchAttributeValuesQuery["attribute"]["choices"]
  // >;
  loading: boolean;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  fetchMoreInitiativeTypes: FetchMoreProps;
  fetchMoreAttributeValues?: FetchMoreProps;
  initial?: Partial<InitiativeCreateFormData>;
  // initiativeTypes?: RelayToFlat<SearchInitiativeTypesQuery["search"]>;
  // referencePages?: RelayToFlat<SearchPagesQuery["search"]>;
  referenceInitiatives?: RelayToFlat<SearchInitiativesQuery["search"]>;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  weightUnit: string;
  // warehouses: RelayToFlat<SearchWarehousesQuery["search"]>;
  // taxTypes: TaxTypeFragment[];
  // selectedInitiativeType?: InitiativeTypeQuery["initiativeType"];
  fetchCategories: (data: string) => void;
  fetchCollections: (data: string) => void;
  fetchInitiativeTypes: (data: string) => void;
  fetchAttributeValues: (query: string, attributeId: string) => void;
  onWarehouseConfigure: () => void;
  openChannelsModal: () => void;
  // onChannelsChange: (data: ChannelData[]) => void;
  assignReferencesAttributeId?: string;
  // onAssignReferencesClick: (attribute: AttributeInput) => void;
  fetchReferencePages?: (data: string) => void;
  fetchReferenceInitiatives?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchMoreReferenceInitiatives?: FetchMoreProps;
  onAttributeSelectBlur: () => void;
  onCloseDialog: () => void;
  onSelectInitiativeType: (initiativeTypeId: string) => void;
  onSubmit?(data: InitiativeCreateData);
}

export const InitiativeCreatePage: React.FC<InitiativeCreatePageProps> = ({
  // allChannelsCount,
  // channelsErrors,
  // currentChannels,
  loading,
  // categories: categoryChoiceList,
  // collections: collectionChoiceList,
  // attributeValues,
  errors: apiErrors,
  // fetchCategories,
  // fetchCollections,
  // fetchMoreCategories,
  // fetchMoreCollections,
  // fetchMoreInitiativeTypes,
  header,
  initial,
  // initiativeTypes: initiativeTypeChoiceList,
  // referencePages = [],
  referenceInitiatives = [],
  saveButtonBarState,
  // warehouses,
  // taxTypes,
  // selectedInitiativeType,
  // fetchInitiativeTypes,
  // weightUnit,
  onSubmit,
  // onChannelsChange,
  // onWarehouseConfigure,
  // openChannelsModal,
  assignReferencesAttributeId,
  // onAssignReferencesClick,
  fetchReferencePages,
  fetchMoreReferencePages,
  fetchReferenceInitiatives,
  fetchMoreReferenceInitiatives,
  // fetchAttributeValues,
  // fetchMoreAttributeValues,
  onCloseDialog,
  onSelectInitiativeType,
  // onAttributeSelectBlur,
}: InitiativeCreatePageProps) => {
  const intl = useIntl();
  const navigate = useNavigator();

  // Display values
  // const [selectedCategory, setSelectedCategory] = useStateFromProps(
  //   initial?.category || "",
  // );

  // const [selectedCollections, setSelectedCollections] = useStateFromProps<
  //   MultiAutocompleteChoiceType[]
  // >([]);

  // const [selectedTaxType, setSelectedTaxType] = useStateFromProps(
  //   initial?.taxCode || null,
  // );

  // const categories = getChoices(categoryChoiceList);
  // const collections = getChoices(collectionChoiceList);
  // const initiativeTypes = getChoices(initiativeTypeChoiceList);
  // const taxTypeChoices =
  //   taxTypes?.map(taxType => ({
  //     label: taxType.description,
  //     value: taxType.taxCode,
  //   })) || [];

  // const canOpenAssignReferencesAttributeDialog = !!assignReferencesAttributeId;

  // const handleAssignReferenceAttribute = (
  //   attributeValues: string[],
  //   data: InitiativeCreateData,
  //   handlers: InitiativeCreateHandlers,
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

  return (
    <InitiativeCreateForm
      onSubmit={onSubmit}
      initial={initial}
      // selectedInitiativeType={selectedInitiativeType}
      onSelectInitiativeType={onSelectInitiativeType}
      // categories={categories}
      // collections={collections}
      // initiativeTypes={initiativeTypeChoiceList}
      // referencePages={referencePages}
      referenceInitiatives={referenceInitiatives}
      // selectedCollections={selectedCollections}
      // setSelectedCategory={setSelectedCategory}
      // setSelectedCollections={setSelectedCollections}
      // setSelectedTaxType={setSelectedTaxType}
      // setChannels={onChannelsChange}
      // taxTypes={taxTypeChoices}
      // warehouses={warehouses}
      // currentChannels={currentChannels}
      fetchReferencePages={fetchReferencePages}
      fetchMoreReferencePages={fetchMoreReferencePages}
      fetchReferenceInitiatives={fetchReferenceInitiatives}
      fetchMoreReferenceInitiatives={fetchMoreReferenceInitiatives}
      assignReferencesAttributeId={assignReferencesAttributeId}
      loading={loading}
    >
      {({
        change,
        data,
        formErrors,
        // validationErrors,
        handlers,
        submit,
        isSaveDisabled,
        // attributeRichTextGetters,
      }) => {
        // Comparing explicitly to false because `hasVariants` can be undefined
        const isSimpleInitiative = data.initiativeType?.hasVariants === false;

        // const errors = [...apiErrors, ...validationErrors];
        const errors = [...apiErrors];

        return (
          <Container>
            <Backlink href={initiativeListUrl()}>
              {intl.formatMessage(sectionNames.initiatives)}
            </Backlink>
            <PageHeader title={header} />
            <Grid>
              <div>
                <InitiativeDetailsForm
                  data={data}
                  disabled={loading}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                {/*{data.attributes.length > 0 && (*/}
                {/*  <Attributes*/}
                {/*    attributes={data.attributes}*/}
                {/*    attributeValues={attributeValues}*/}
                {/*    loading={loading}*/}
                {/*    disabled={loading}*/}
                {/*    errors={errors}*/}
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
                {isSimpleInitiative && (
                  <>
                    {/*<InitiativeShipping*/}
                    {/*  data={data}*/}
                    {/*  disabled={loading}*/}
                    {/*  errors={errors}*/}
                    {/*  weightUnit={weightUnit}*/}
                    {/*  onChange={change}*/}
                    {/*/>*/}
                    {/*<CardSpacer />*/}
                    {/*<InitiativeVariantPrice*/}
                    {/*  InitiativeVariantChannelListings={data.channelListings}*/}
                    {/*  errors={channelsErrors}*/}
                    {/*  loading={loading}*/}
                    {/*  onChange={handlers.changeChannelPrice}*/}
                    {/*/>*/}
                    {/*<CardSpacer />*/}
                    {/*<InitiativeStocks*/}
                    {/*  data={data}*/}
                    {/*  disabled={loading}*/}
                    {/*  hasVariants={false}*/}
                    {/*  onFormDataChange={change}*/}
                    {/*  errors={errors}*/}
                    {/*  formErrors={formErrors}*/}
                    {/*  stocks={data.stocks}*/}
                    {/*  warehouses={warehouses}*/}
                    {/*  onChange={handlers.changeStock}*/}
                    {/*  onChangePreorderEndDate={handlers.changePreorderEndDate}*/}
                    {/*  onWarehouseStockAdd={handlers.addStock}*/}
                    {/*  onWarehouseStockDelete={handlers.deleteStock}*/}
                    {/*  onWarehouseConfigure={onWarehouseConfigure}*/}
                    {/*/>*/}
                    {/*<CardSpacer />*/}
                  </>
                )}
                {/*<SeoForm*/}
                {/*  allowEmptySlug={true}*/}
                {/*  helperText={intl.formatMessage({*/}
                {/*    id: "LKoIB1",*/}
                {/*    defaultMessage:*/}
                {/*      "Add search engine title and description to make this initiative easier to find",*/}
                {/*  })}*/}
                {/*  title={data.seoTitle}*/}
                {/*  slug={data.slug}*/}
                {/*  slugPlaceholder={data.name}*/}
                {/*  titlePlaceholder={data.name}*/}
                {/*  description={data.seoDescription}*/}
                {/*  descriptionPlaceholder={data.seoTitle}*/}
                {/*  loading={loading}*/}
                {/*  onChange={change}*/}
                {/*/>*/}
                {/*<CardSpacer />*/}
                <Metadata data={data} onChange={handlers.changeMetadata} />
              </div>
              <div>
                {/*<InitiativeOrganization*/}
                {/*  canChangeType={true}*/}
                {/*  // categories={categories}*/}
                {/*  categoryInputDisplayValue={selectedCategory}*/}
                {/*  // collections={collections}*/}
                {/*  data={data}*/}
                {/*  disabled={loading}*/}
                {/*  // errors={[...errors, ...channelsErrors]}*/}
                {/*  fetchCategories={fetchCategories}*/}
                {/*  fetchCollections={fetchCollections}*/}
                {/*  fetchMoreCategories={fetchMoreCategories}*/}
                {/*  fetchMoreCollections={fetchMoreCollections}*/}
                {/*  fetchMoreInitiativeTypes={fetchMoreInitiativeTypes}*/}
                {/*  fetchInitiativeTypes={fetchInitiativeTypes}*/}
                {/*  initiativeType={data.initiativeType}*/}
                {/*  initiativeTypeInputDisplayValue={data.initiativeType?.name || ""}*/}
                {/*  // initiativeTypes={initiativeTypes}*/}
                {/*  onCategoryChange={handlers.selectCategory}*/}
                {/*  onCollectionChange={handlers.selectCollection}*/}
                {/*  onInitiativeTypeChange={handlers.selectInitiativeType}*/}
                {/*  collectionsInputDisplayValue={selectedCollections}*/}
                {/*/>*/}
                <CardSpacer />
                {/*{isSimpleInitiative ? (*/}
                {/*  <ChannelsAvailabilityCard*/}
                {/*    managePermissions={[PermissionEnum.MANAGE_INITIATIVES]}*/}
                {/*    messages={{*/}
                {/*      hiddenLabel: intl.formatMessage({*/}
                {/*        id: "saKXY3",*/}
                {/*        defaultMessage: "Not published",*/}
                {/*        description: "initiative label",*/}
                {/*      }),*/}

                {/*      visibleLabel: intl.formatMessage({*/}
                {/*        id: "qJedl0",*/}
                {/*        defaultMessage: "Published",*/}
                {/*        description: "initiative label",*/}
                {/*      }),*/}
                {/*    }}*/}
                {/*    errors={channelsErrors}*/}
                {/*    allChannelsCount={allChannelsCount}*/}
                {/*    channels={data.channelListings || []}*/}
                {/*    disabled={loading}*/}
                {/*    onChange={handlers.changeChannels}*/}
                {/*    openModal={openChannelsModal}*/}
                {/*  />*/}
                {/*) : (*/}
                {/*  <CannotDefineChannelsAvailabilityCard />*/}
                {/*)}*/}
                {/*<CardSpacer />*/}
                {/*<InitiativeTaxes*/}
                {/*  data={data}*/}
                {/*  disabled={loading}*/}
                {/*  onChange={change}*/}
                {/*  onTaxTypeChange={handlers.selectTaxRate}*/}
                {/*  selectedTaxTypeDisplayName={selectedTaxType}*/}
                {/*  taxTypes={taxTypes}*/}
                {/*/>*/}
              </div>
            </Grid>
            <Savebar
              onCancel={() => navigate(initiativeListUrl())}
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
          </Container>
        );
      }}
    </InitiativeCreateForm>
  );
};
InitiativeCreatePage.displayName = "InitiativeCreatePage";
export default InitiativeCreatePage;
