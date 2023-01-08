import { OutputData } from "@editorjs/editorjs";
// import {
//   getAttributesDisplayData,
//   getRichTextAttributesFromMap,
//   getRichTextDataFromAttributes,
//   mergeAttributes,
//   RichTextProps,
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
// import { ChannelData, ChannelPriceArgs } from "@saleor/channels/utils";
// import {
//   AttributeInput,
//   AttributeInputData,
// } from "@saleor/components/Attributes";
import { useExitFormDialog } from "@saleor/components/Form/useExitFormDialog";
import { MetadataFormData } from "@saleor/components/Metadata";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import {
  // InitiativeErrorWithAttributesFragment,
  // InitiativeTypeQuery,
  // SearchPagesQuery,
  SearchInitiativesQuery,
  // SearchInitiativeTypesQuery,
  // SearchWarehousesQuery,
} from "@saleor/graphql";
import useForm, {
  CommonUseFormResultWithHandlers,
  FormChange,
  FormErrors,
  SubmitPromise,
} from "@saleor/hooks/useForm";
import useFormset, {
  FormsetChange,
  FormsetData,
} from "@saleor/hooks/useFormset";
import useHandleFormSubmit from "@saleor/hooks/useHandleFormSubmit";
import { errorMessages } from "@saleor/intl";
// import {
//   getAttributeInputFromInitiativeType,
//   InitiativeType,
// } from "@saleor/initiatives/utils/data";
// import {
//   createChannelsChangeHandler,
//   createChannelsPriceChangeHandler,
//   createInitiativeTypeSelectHandler,
// } from "@saleor/initiatives/utils/handlers";
import {
  // validateCostPrice,
  // validatePrice,
  validateInitiativeCreateData,
} from "@saleor/initiatives/utils/validation";
import { INITIATIVE_CREATE_FORM_ID } from "@saleor/initiatives/views/InitiativeCreate/consts";
import { FetchMoreProps, RelayToFlat, ReorderEvent } from "@saleor/types";
// import createMultiAutocompleteSelectHandler from "@saleor/utils/handlers/multiAutocompleteSelectChangeHandler";
// import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import useMetadataChangeTrigger from "@saleor/utils/metadata/useMetadataChangeTrigger";
import { RichTextContext } from "@saleor/utils/richText/context";
// import { useMultipleRichText } from "@saleor/utils/richText/useMultipleRichText";
import useRichText from "@saleor/utils/richText/useRichText";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { createPreorderEndDateChangeHandler } from "../../utils/handlers";
// import { InitiativeStockFormsetData, InitiativeStockInput } from "../InitiativeStocks";

export interface InitiativeCreateFormData extends MetadataFormData {
  // category: string;
  // changeTaxCode: boolean;
  // channelListings: ChannelData[];
  // chargeTaxes: boolean;
  // collections: string[];
  description: OutputData;
  isAvailable: boolean;
  // name: string;
  title: string;
  // initiativeType: InitiativeType;
  // rating: number;
  seoDescription: string;
  seoTitle: string;
  // sku: string;
  slug: string;
  // stockQuantity: number;
  // taxCode: string;
  // trackInventory: boolean;
  // isPreorder: boolean;
  // globalThreshold: string;
  // globalSoldUnits: number;
  // hasPreorderEndDate: boolean;
  // preorderEndDateTime: string;
  // weight: string;
}
export interface InitiativeCreateData extends InitiativeCreateFormData {
  // attributes: AttributeInput[];
  // attributesWithNewFileValue: FormsetData<null, File>;
  // stocks: InitiativeStockInput[];
}

export interface InitiativeCreateHandlers
  extends Record<
      | "changeMetadata"
      | "selectCategory"
      | "selectCollection"
      | "selectInitiativeType"
      | "selectTaxRate",
      FormChange
    >{
  changePreorderEndDate: FormChange;
  fetchReferences: (value: string) => void;
  fetchMoreReferences: FetchMoreProps;
}
export interface UseInitiativeCreateFormOutput
  extends CommonUseFormResultWithHandlers<
      InitiativeCreateData,
      InitiativeCreateHandlers
    >{
  disabled: boolean;
  formErrors: FormErrors<InitiativeCreateData>;
  // validationErrors: InitiativeErrorWithAttributesFragment[];
}

export type UseInitiativeCreateFormRenderProps = Omit<
  UseInitiativeCreateFormOutput,
  "richText"
>;

export interface UseInitiativeCreateFormOpts
  extends Record<
    "categories" | "collections" | "taxTypes",
    SingleAutocompleteChoiceType[]
  > {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCollections: React.Dispatch<
    React.SetStateAction<MultiAutocompleteChoiceType[]>
  >;
  setSelectedTaxType: React.Dispatch<React.SetStateAction<string>>;
  // setChannels: (channels: ChannelData[]) => void;
  selectedCollections: MultiAutocompleteChoiceType[];
  // initiativeTypes: RelayToFlat<SearchInitiativeTypesQuery["search"]>;
  // warehouses: RelayToFlat<SearchWarehousesQuery["search"]>;
  // currentChannels: ChannelData[];
  // referencePages: RelayToFlat<SearchPagesQuery["search"]>;
  referenceInitiatives: RelayToFlat<SearchInitiativesQuery["search"]>;
  fetchReferencePages?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchReferenceInitiatives?: (data: string) => void;
  fetchMoreReferenceInitiatives?: FetchMoreProps;
  assignReferencesAttributeId?: string;
  // selectedInitiativeType?: InitiativeTypeQuery["initiativeType"];
  // onSelectInitiativeType: (initiativeTypeId: string) => void;
}

export interface InitiativeCreateFormProps extends UseInitiativeCreateFormOpts {
  children: (props: UseInitiativeCreateFormRenderProps) => React.ReactNode;
  initial?: Partial<InitiativeCreateFormData>;
  onSubmit: (data: InitiativeCreateData) => SubmitPromise;
  loading: boolean;
}

function useInitiativeCreateForm(
  initial: Partial<InitiativeCreateFormData>,
  onSubmit: (data: InitiativeCreateData) => SubmitPromise,
  loading: boolean,
  opts: UseInitiativeCreateFormOpts,
): UseInitiativeCreateFormOutput {
  const intl = useIntl();
  // const [validationErrors, setValidationErrors] = useState<
  //   InitiativeErrorWithAttributesFragment[]
  // >([]);
  const defaultInitialFormData: InitiativeCreateFormData &
    Record<"initiativeType", string> = {
    // category: "",
    // changeTaxCode: false,
    // channelListings: opts.currentChannels,
    // chargeTaxes: false,
    // collections: [],
    description: null,
    isAvailable: false,
    metadata: [],
    // name: "",
    title: "",
    privateMetadata: [],
    // initiativeType: null,
    // rating: 0,
    seoDescription: "",
    seoTitle: "",
    // sku: "",
    slug: "",
    // stockQuantity: null,
    // taxCode: null,
    // trackInventory: false,
    // weight: "",
    // globalSoldUnits: 0,
    // globalThreshold: "",
    // isPreorder: false,
    // hasPreorderEndDate: false,
    // preorderEndDateTime: "",
  };

  const form = useForm(
    {
      ...initial,
      ...defaultInitialFormData,
    },
    undefined,
    { confirmLeave: true, formId: INITIATIVE_CREATE_FORM_ID },
  );

  const {
    triggerChange,
    toggleValue,
    handleChange,
    data: formData,
    formId,
  } = form;

  // const attributes = useFormset<AttributeInputData>(
  //   opts.selectedInitiativeType
  //     ? getAttributeInputFromInitiativeType(opts.selectedInitiativeType)
  //     : [],
  // );
  // const {
  //   getters: attributeRichTextGetters,
  //   getValues: getAttributeRichTextValues,
  // } = useMultipleRichText({
  //   initial: getRichTextDataFromAttributes(attributes.data),
  //   triggerChange,
  // });
  // const attributesWithNewFileValue = useFormset<null, File>([]);
  // const stocks = useFormset<InitiativeStockFormsetData>([]);
  const richText = useRichText({
    initial: null,
    triggerChange,
  });

  const {
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  // const handleCollectionSelect = createMultiAutocompleteSelectHandler(
  //   toggleValue,
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
  // const handleInitiativeTypeSelect = createInitiativeTypeSelectHandler(
  //   opts.onSelectInitiativeType,
  //   triggerChange,
  // );
  // const handleStockChange: FormsetChange<string> = (id, value) => {
  //   triggerChange();
  //   stocks.change(id, value);
  // };
  // const handleStockAdd = (id: string) => {
  //   triggerChange();
  //   stocks.add({
  //     data: {
  //       quantityAllocated: 0,
  //     },
  //     id,
  //     label: opts.warehouses.find(warehouse => warehouse.id === id).name,
  //     value: "0",
  //   });
  // };
  // const handleStockDelete = (id: string) => {
  //   triggerChange();
  //   stocks.remove(id);
  // };
  // const handleTaxTypeSelect = createSingleAutocompleteSelectHandler(
  //   handleChange,
  //   opts.setSelectedTaxType,
  //   opts.taxTypes,
  // );
  const changeMetadata = makeMetadataChangeHandler(handleChange);
  // const handleChannelsChange = createChannelsChangeHandler(
  //   opts.currentChannels,
  //   opts.setChannels,
  //   triggerChange,
  // );
  // const handleChannelPriceChange = createChannelsPriceChangeHandler(
  //   opts.currentChannels,
  //   opts.setChannels,
  //   triggerChange,
  // );

  const handlePreorderEndDateChange = createPreorderEndDateChangeHandler(
    form,
    triggerChange,
    intl.formatMessage(errorMessages.preorderEndDateInFutureErrorText),
  );

  const data: InitiativeCreateData = {
    ...formData,
    // attributes: getAttributesDisplayData(
    //   attributes.data,
    //   attributesWithNewFileValue.data,
    //   opts.referencePages,
    //   opts.referenceInitiatives,
    // ),
    // attributesWithNewFileValue: attributesWithNewFileValue.data,
    description: null,
    // initiativeType: opts.selectedInitiativeType,
    // stocks: stocks.data,
  };

  const getData = async (): Promise<InitiativeCreateData> => ({
    ...data,
    description: await richText.getValue(),
    // attributes: mergeAttributes(
    //   attributes.data,
    //   getRichTextAttributesFromMap(
    //     attributes.data,
    //     await getAttributeRichTextValues(),
    //   ),
    // ),
  });

  const handleSubmit = async (data: InitiativeCreateData) => {
    const errors = validateInitiativeCreateData(data);

    // setValidationErrors(errors);

    if (errors.length) {
      return errors;
    }

    return onSubmit(data);
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit: handleSubmit,
  });

  const submit = async () => {
    const errors = await handleFormSubmit(await getData());

    if (errors.length) {
      setIsSubmitDisabled(isSubmitDisabled);
      setIsDirty(true);
    }

    return errors;
  };

  const {
    setExitDialogSubmitRef,
    setIsSubmitDisabled,
    setIsDirty,
  } = useExitFormDialog({
    formId: INITIATIVE_CREATE_FORM_ID,
  });

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  const isValid = () => {
    // if (!data.name || !data.initiativeType) {
    //   return false;
    // }
    //
    // if (
    //   data.isPreorder &&
    //   data.hasPreorderEndDate &&
    //   !!form.errors.preorderEndDateTime
    // ) {
    //   return false;
    // }

    // if (opts.selectedInitiativeType?.hasVariants) {
    //   return true;
    // }
    //
    // const hasInvalidChannelListingPrices = data.channelListings.some(
    //   channel =>
    //     validatePrice(channel.price) || validateCostPrice(channel.costPrice),
    // );
    //
    // if (hasInvalidChannelListingPrices) {
    //   return false;
    // }
    return true;
  };

  const isSaveDisabled = loading || !onSubmit;
  const isSubmitDisabled = isSaveDisabled || !isValid();

  useEffect(() => {
    setIsSubmitDisabled(isSubmitDisabled);
    setIsDirty(true);
  }, [isSubmitDisabled]);

  return {
    change: handleChange,
    data,
    disabled: isSaveDisabled,
    formErrors: form.errors,
    // validationErrors,
    handlers: {
      // addStock: handleStockAdd,
      // changeChannelPrice: handleChannelPriceChange,
      // changeChannels: handleChannelsChange,
      changeMetadata,
      // changeStock: handleStockChange,
      changePreorderEndDate: handlePreorderEndDateChange,
      // deleteStock: handleStockDelete,
      // fetchMoreReferences: handleFetchMoreReferences,
      // fetchReferences: handleFetchReferences,
      // reorderAttributeValue: handleAttributeValueReorder,
      // selectAttribute: handleAttributeChange,
      // selectAttributeFile: handleAttributeFileChange,
      // selectAttributeMultiple: handleAttributeMultiChange,
      // selectAttributeReference: handleAttributeReferenceChange,
      // selectCategory: handleCategorySelect,
      // selectCollection: handleCollectionSelect,
      // selectInitiativeType: handleInitiativeTypeSelect,
      // selectTaxRate: handleTaxTypeSelect,
    },
    submit,
    isSaveDisabled,
    richText,
    // attributeRichTextGetters,
  };
}

const InitiativeCreateForm: React.FC<InitiativeCreateFormProps> = ({
  children,
  initial,
  onSubmit,
  loading,
  ...rest
}) => {
  const { richText, ...props } = useInitiativeCreateForm(
    initial || {},
    onSubmit,
    loading,
    rest,
  );

  return (
    <form onSubmit={props.submit}>
      <RichTextContext.Provider value={richText}>
        {children(props)}
      </RichTextContext.Provider>
    </form>
  );
};

InitiativeCreateForm.displayName = "InitiativeCreateForm";
export default InitiativeCreateForm;
