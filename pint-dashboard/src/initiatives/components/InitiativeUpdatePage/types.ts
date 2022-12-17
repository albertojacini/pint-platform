import { OutputData } from "@editorjs/editorjs";
import { RichTextProps } from "@saleor/attributes/utils/data";
import { AttributeInput } from "@saleor/components/Attributes";
import { ChannelOpts } from "@saleor/components/ChannelsAvailabilityCard/types";
import {
  DatagridChangeOpts,
  UseDatagridChangeState,
} from "@saleor/components/Datagrid/useDatagridChange";
import { MetadataFormData } from "@saleor/components/Metadata";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import {
  MetadataErrorFragment,
  InitiativeChannelListingUpdateInput,
  InitiativeFragment,
  SearchPagesQuery,
  SearchInitiativesQuery,
  SearchWarehousesQuery,
} from "@saleor/graphql";
import {
  CommonUseFormResultWithHandlers,
  FormChange,
  FormErrors,
  SubmitPromise,
} from "@saleor/hooks/useForm";
import {
  FormsetAtomicData,
  FormsetChange,
  FormsetData,
} from "@saleor/hooks/useFormset";
import { UseInitiativeUpdateHandlerError } from "@saleor/initiatives/views/InitiativeUpdate/handlers/useInitiativeUpdateHandler";
import { FetchMoreProps, RelayToFlat, ReorderEvent } from "@saleor/types";

import { InitiativeChannelsListingDialogSubmit } from "./InitiativeChannelsListingsDialog";

export interface InitiativeUpdateFormData extends MetadataFormData {
  category: string | null;
  changeTaxCode: boolean;
  chargeTaxes: boolean;
  collections: string[];
  isAvailable: boolean;
  name: string;
  rating: number;
  slug: string;
  seoDescription: string;
  seoTitle: string;
  sku: string;
  taxCode: string;
  trackInventory: boolean;
  isPreorder: boolean;
  globalThreshold: string;
  globalSoldUnits: number;
  hasPreorderEndDate: boolean;
  preorderEndDateTime?: string;
  weight: string;
}
export interface FileAttributeInputData {
  attributeId: string;
  file: File;
}
export type FileAttributeInput = FormsetAtomicData<
  FileAttributeInputData,
  string[]
>;

export interface FileAttributesSubmitData {
  fileAttributes: FileAttributeInput[];
}
export interface InitiativeUpdateData extends InitiativeUpdateFormData {
  attributes: AttributeInput[];
  channels: InitiativeChannelListingUpdateInput;
  description: OutputData;
}
export interface InitiativeUpdateSubmitData extends InitiativeUpdateFormData {
  attributes: AttributeInput[];
  attributesWithNewFileValue: FormsetData<null, File>;
  channels: InitiativeChannelListingUpdateInput;
  collections: string[];
  description: OutputData;
  variants: DatagridChangeOpts;
}

export interface InitiativeUpdateHandlers
  extends Record<
      | "changeMetadata"
      | "selectCategory"
      | "selectCollection"
      | "selectTaxRate",
      FormChange
    >,
    Record<
      "selectAttribute" | "selectAttributeMultiple",
      FormsetChange<string>
    > {
  changeChannels: (id: string, data: ChannelOpts) => void;
  selectAttributeReference: FormsetChange<string[]>;
  selectAttributeFile: FormsetChange<File>;
  reorderAttributeValue: FormsetChange<ReorderEvent>;
  changeVariants: (data: DatagridChangeOpts) => void;
  fetchReferences: (value: string) => void;
  fetchMoreReferences: FetchMoreProps;
  updateChannelList: InitiativeChannelsListingDialogSubmit;
}

export interface UseInitiativeUpdateFormOutput
  extends CommonUseFormResultWithHandlers<
      InitiativeUpdateData,
      InitiativeUpdateHandlers
    >,
    RichTextProps {
  datagrid: UseDatagridChangeState;
  formErrors: FormErrors<InitiativeUpdateSubmitData>;
}

export type UseInitiativeUpdateFormRenderProps = Omit<
  UseInitiativeUpdateFormOutput,
  "datagrid" | "richText"
>;

export interface UseInitiativeUpdateFormOpts
  extends Record<
    "categories" | "collections" | "taxTypes",
    SingleAutocompleteChoiceType[]
  > {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCollections: React.Dispatch<
    React.SetStateAction<MultiAutocompleteChoiceType[]>
  >;
  setSelectedTaxType: React.Dispatch<React.SetStateAction<string>>;
  selectedCollections: MultiAutocompleteChoiceType[];
  warehouses: RelayToFlat<SearchWarehousesQuery["search"]>;
  hasVariants: boolean;
  referencePages: RelayToFlat<SearchPagesQuery["search"]>;
  referenceInitiatives: RelayToFlat<SearchInitiativesQuery["search"]>;
  fetchReferencePages?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchReferenceInitiatives?: (data: string) => void;
  fetchMoreReferenceInitiatives?: FetchMoreProps;
  assignReferencesAttributeId?: string;
  isSimpleInitiative: boolean;
}

export type SubmitResult = SubmitPromise<
  Array<UseInitiativeUpdateHandlerError | MetadataErrorFragment>
>;

export interface InitiativeUpdateFormProps extends UseInitiativeUpdateFormOpts {
  children: (props: UseInitiativeUpdateFormRenderProps) => React.ReactNode;
  initiative: InitiativeFragment;
  onSubmit: (data: InitiativeUpdateSubmitData) => SubmitResult;
  refetch: () => Promise<any>;
  disabled: boolean;
}
