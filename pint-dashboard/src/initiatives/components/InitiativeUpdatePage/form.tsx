// import {
//   getAttributesDisplayData,
//   getRichTextAttributesFromMap,
//   getRichTextDataFromAttributes,
//   mergeAttributes,
// } from "@saleor/attributes/utils/data";
// import {
//   createAttributeChangeHandler,
//   createAttributeFileChangeHandler,
//   createAttributeMultiChangeHandler,
//   createAttributeReferenceChangeHandler,
//   createAttributeValueReorderHandler,
//   createFetchMoreReferencesHandler,
//   createFetchReferencesHandler,
// } from "@saleor/attributes/utils/handlers";
import {
  DatagridChangeOpts,
  DatagridChangeStateContext,
  useDatagridChangeState,
} from "@saleor/components/Datagrid/useDatagridChange";
import { useExitFormDialog } from "@saleor/components/Form/useExitFormDialog";
import { InitiativeFragment } from "@saleor/graphql";
import useForm from "@saleor/hooks/useForm";
// import useFormset from "@saleor/hooks/useFormset";
import useHandleFormSubmit from "@saleor/hooks/useHandleFormSubmit";
import {
  // getAttributeInputFromInitiative,
  getInitiativeUpdatePageFormData,
} from "@saleor/initiatives/utils/data";
import { INITIATIVE_UPDATE_FORM_ID } from "@saleor/initiatives/views/InitiativeUpdate/consts";
// import createMultiAutocompleteSelectHandler from "@saleor/utils/handlers/multiAutocompleteSelectChangeHandler";
// import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import getMetadata from "@saleor/utils/metadata/getMetadata";
import useMetadataChangeTrigger from "@saleor/utils/metadata/useMetadataChangeTrigger";
import { RichTextContext } from "@saleor/utils/richText/context";
// import { useMultipleRichText } from "@saleor/utils/richText/useMultipleRichText";
import useRichText from "@saleor/utils/richText/useRichText";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

// import { useInitiativeChannelListingsForm } from "./formChannels";
import {
  InitiativeUpdateData,
  InitiativeUpdateFormProps,
  InitiativeUpdateSubmitData,
  SubmitResult,
  UseInitiativeUpdateFormOpts,
  UseInitiativeUpdateFormOutput,
} from "./types";

function useInitiativeUpdateForm(
  initiative: InitiativeFragment,
  onSubmit: (data: InitiativeUpdateSubmitData) => SubmitResult,
  disabled: boolean,
  refetch: () => Promise<any>,
  opts: UseInitiativeUpdateFormOpts,
): UseInitiativeUpdateFormOutput {
  const initial = useMemo(
    () => getInitiativeUpdatePageFormData(initiative, initiative?.variants),
    [initiative],
  );

  const form = useForm(initial, undefined, {
    confirmLeave: true,
    formId: INITIATIVE_UPDATE_FORM_ID,
  });

  const {
    handleChange,
    triggerChange,
    toggleValue,
    data: formData,
    setIsSubmitDisabled,
  } = form;

  const datagrid = useDatagridChangeState();
  const variants = useRef<DatagridChangeOpts>({
    added: [],
    removed: [],
    updates: [],
  });
  const handleVariantChange = React.useCallback((data: DatagridChangeOpts) => {
    variants.current = data;
    triggerChange();
  }, []);

  // const attributes = useFormset(getAttributeInputFromInitiative(initiative));
  // const {
  //   getters: attributeRichTextGetters,
  //   getValues: getAttributeRichTextValues,
  // } = useMultipleRichText({
  //   initial: getRichTextDataFromAttributes(attributes.data),
  //   triggerChange,
  // });
  // const attributesWithNewFileValue = useFormset<null, File>([]);
  const richText = useRichText({
    initial: initiative?.description,
    loading: !initiative,
    triggerChange,
  });

  const { setExitDialogSubmitRef } = useExitFormDialog({
    formId: INITIATIVE_UPDATE_FORM_ID,
  });

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  // const {
  //   channels,
  //   handleChannelChange,
  //   handleChannelListUpdate,
  //   touched: touchedChannels,
  // } = useInitiativeChannelListingsForm(initiative, triggerChange);

  // const handleCollectionSelect = createMultiAutocompleteSelectHandler(
  //   event => toggleValue(event),
  //   opts.setSelectedCollections,
  //   opts.selectedCollections,
  //   opts.collections,
  // );
  // const handleCategorySelect = createSingleAutocompleteSelectHandler(
  //   handleChange,
  //   opts.setSelectedCategory,
  //   opts.categories,
  // );
  // const handleAttributeChange = createAttributeChangeHandler(
  //   attributes.change,
  //   triggerChange,
  // );
  // const handleAttributeMultiChange = createAttributeMultiChangeHandler(
  //   attributes.change,
  //   attributes.data,
  //   triggerChange,
  // );
  // const handleAttributeReferenceChange = createAttributeReferenceChangeHandler(
  //   attributes.change,
  //   triggerChange,
  // );
  // const handleFetchReferences = createFetchReferencesHandler(
  //   attributes.data,
  //   opts.assignReferencesAttributeId,
  //   opts.fetchReferencePages,
  //   opts.fetchReferenceInitiatives,
  // );
  // const handleFetchMoreReferences = createFetchMoreReferencesHandler(
  //   attributes.data,
  //   opts.assignReferencesAttributeId,
  //   opts.fetchMoreReferencePages,
  //   opts.fetchMoreReferenceInitiatives,
  // );
  // const handleAttributeFileChange = createAttributeFileChangeHandler(
  //   attributes.change,
  //   attributesWithNewFileValue.data,
  //   attributesWithNewFileValue.add,
  //   attributesWithNewFileValue.change,
  //   triggerChange,
  // );
  // const handleAttributeValueReorder = createAttributeValueReorderHandler(
  //   attributes.change,
  //   attributes.data,
  //   triggerChange,
  // );
  // const handleTaxTypeSelect = createSingleAutocompleteSelectHandler(
  //   handleChange,
  //   opts.setSelectedTaxType,
  //   opts.taxTypes,
  // );
  const changeMetadata = makeMetadataChangeHandler(handleChange);

  const data: InitiativeUpdateData = {
    ...formData,
    // attributes: getAttributesDisplayData(
    //   attributes.data,
    //   attributesWithNewFileValue.data,
    //   opts.referencePages,
    //   opts.referenceInitiatives,
    // ),
    // channels,
    description: null,
  };

  const getSubmitData = async (): Promise<InitiativeUpdateSubmitData> => ({
    ...data,
    ...getMetadata(data, isMetadataModified, isPrivateMetadataModified),
    // attributes: mergeAttributes(
    //   attributes.data,
    //   getRichTextAttributesFromMap(
    //     attributes.data,
    //     await getAttributeRichTextValues(),
    //   ),
    // ),
    // attributesWithNewFileValue: attributesWithNewFileValue.data,
    // channels: {
    //   ...channels,
    //   updateChannels: channels.updateChannels.filter(listing =>
    //     touchedChannels.current.includes(listing.channelId),
    //   ),
    // },
    description: await richText.getValue(),
    // variants: variants.current,
  });

  const handleSubmit = async (data: InitiativeUpdateSubmitData) => {
    const errors = await onSubmit(data);

    // if (!errors?.length) {
    //   attributesWithNewFileValue.set([]);
    // }

    return errors;
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId: form.formId,
    onSubmit: handleSubmit,
  });

  const submit = useCallback(async () => {
    const result = await handleFormSubmit(await getSubmitData());
    await refetch();

    datagrid.setAdded(prevAdded =>
      prevAdded.filter((_, index) =>
        result.some(
          error =>
            error.__typename === "DatagridError" &&
            error.type === "create" &&
            error.index === index,
        ),
      ),
    );
    datagrid.changes.current = datagrid.changes.current.filter(change =>
      datagrid.added.includes(change.row)
        ? result.some(
            error =>
              error.__typename === "DatagridError" &&
              error.type === "create" &&
              error.index === datagrid.added.findIndex(r => r === change.row),
          )
        : result.some(
            error =>
              error.__typename === "DatagridError" &&
              error.type !== "create" &&
              error.variantId === initiative.variants[change.row].id,
          ),
    );
    datagrid.setRemoved([]);

    return result;
  }, [datagrid, handleFormSubmit, getSubmitData]);

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  const isValid = () => {
    if (!data.name) {
      return false;
    }

    if (
      data.isPreorder &&
      data.hasPreorderEndDate &&
      !!form.errors.preorderEndDateTime
    ) {
      return false;
    }

    return true;
  };

  const isSaveDisabled = disabled;
  const isSubmitDisabled = isSaveDisabled || !isValid();

  useEffect(() => {
    setIsSubmitDisabled(isSubmitDisabled);
  }, [isSubmitDisabled]);

  return {
    change: handleChange,
    data,
    datagrid,
    formErrors: form.errors,
    handlers: {
      // changeChannels: handleChannelChange,
      changeMetadata,
      // changeVariants: handleVariantChange,
      // fetchMoreReferences: handleFetchMoreReferences,
      // fetchReferences: handleFetchReferences,
      // reorderAttributeValue: handleAttributeValueReorder,
      // selectAttribute: handleAttributeChange,
      // selectAttributeFile: handleAttributeFileChange,
      // selectAttributeMultiple: handleAttributeMultiChange,
      // selectAttributeReference: handleAttributeReferenceChange,
      // selectCategory: handleCategorySelect,
      // selectCollection: handleCollectionSelect,
      // selectTaxRate: handleTaxTypeSelect,
      // updateChannelList: handleChannelListUpdate,
    },
    submit,
    isSaveDisabled,
    richText,
    // attributeRichTextGetters,
  };
}

const InitiativeUpdateForm: React.FC<InitiativeUpdateFormProps> = ({
  children,
  initiative,
  onSubmit,
  refetch,
  disabled,
  ...rest
}) => {
  const { datagrid, richText, ...props } = useInitiativeUpdateForm(
    initiative,
    onSubmit,
    disabled,
    refetch,
    rest,
  );

  return (
    <form onSubmit={props.submit}>
      <DatagridChangeStateContext.Provider value={datagrid}>
        <RichTextContext.Provider value={richText}>
          {children(props)}
        </RichTextContext.Provider>
      </DatagridChangeStateContext.Provider>
    </form>
  );
};

InitiativeUpdateForm.displayName = "InitiativeUpdateForm";
export default InitiativeUpdateForm;
