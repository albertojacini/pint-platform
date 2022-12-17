import {
  getDefaultAttributeValues,
  getSelectedAttributeValues,
  mergeChoicesWithValues,
} from "@saleor/attributes/utils/data";
import {
  AttributeInput,
  VariantAttributeScope,
} from "@saleor/components/Attributes";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import {
  InitiativeDetailsVariantFragment,
  InitiativeFragment,
  InitiativeTypeQuery,
  InitiativeVariantCreateDataQuery,
  InitiativeVariantFragment,
  SelectedVariantAttributeFragment,
  StockInput,
  VariantAttributeFragment,
} from "@saleor/graphql";
import { FormsetAtomicData } from "@saleor/hooks/useFormset";
import { maybe } from "@saleor/misc";
import { mapEdgesToItems, mapMetadataItemToInput } from "@saleor/utils/maps";
import moment from "moment";

import { InitiativeStockInput } from "../components/InitiativeStocks";
import { InitiativeUpdateFormData } from "../components/InitiativeUpdatePage/types";

export interface Collection {
  id: string;
  label: string;
}

interface Node {
  id: string;
  name: string;
}

export interface InitiativeType {
  hasVariants: boolean;
  id: string;
  name: string;
  initiativeAttributes: InitiativeTypeQuery["initiativeType"]["initiativeAttributes"];
}

// export function getAttributeInputFromInitiative(
//   initiative: InitiativeFragment,
// ): AttributeInput[] {
//   return (
//     initiative?.attributes?.map(attribute => ({
//       data: {
//         entityType: attribute.attribute.entityType,
//         inputType: attribute.attribute.inputType,
//         isRequired: attribute.attribute.valueRequired,
//         selectedValues: attribute.values,
//         values: mergeChoicesWithValues(attribute),
//         unit: attribute.attribute.unit,
//       },
//       id: attribute.attribute.id,
//       label: attribute.attribute.name,
//       value: getSelectedAttributeValues(attribute),
//     })) ?? []
//   );
// }
//
// export function getAttributeInputFromInitiativeType(
//   initiativeType: InitiativeType,
// ): AttributeInput[] {
//   return initiativeType.initiativeAttributes.map(attribute => ({
//     data: {
//       entityType: attribute.entityType,
//       inputType: attribute.inputType,
//       isRequired: attribute.valueRequired,
//       values: mapEdgesToItems(attribute.choices) || [],
//       unit: attribute.unit,
//     },
//     id: attribute.id,
//     label: attribute.name,
//     value: [],
//   }));
// }
//
// export function getAttributeInputFromAttributes(
//   variantAttributes: VariantAttributeFragment[],
//   variantAttributeScope: VariantAttributeScope,
// ): AttributeInput[] {
//   return variantAttributes?.map(attribute => ({
//     data: {
//       entityType: attribute.entityType,
//       inputType: attribute.inputType,
//       isRequired: attribute.valueRequired,
//       values: mapEdgesToItems(attribute.choices) || [],
//       unit: attribute.unit,
//       variantAttributeScope,
//     },
//     id: attribute.id,
//     label: attribute.name,
//     value: getDefaultAttributeValues(attribute),
//   }));
// }
//
// export function getAttributeInputFromSelectedAttributes(
//   variantAttributes: SelectedVariantAttributeFragment[],
//   variantAttributeScope: VariantAttributeScope,
// ): AttributeInput[] {
//   return variantAttributes?.map(attribute => ({
//     data: {
//       entityType: attribute.attribute.entityType,
//       inputType: attribute.attribute.inputType,
//       isRequired: attribute.attribute.valueRequired,
//       selectedValues: attribute.values,
//       values: mergeChoicesWithValues(attribute),
//       unit: attribute.attribute.unit,
//       variantAttributeScope,
//     },
//     id: attribute.attribute.id,
//     label: attribute.attribute.name,
//     value: getSelectedAttributeValues(attribute),
//   }));
// }
//
// export function getAttributeInputFromVariant(
//   variant: InitiativeVariantFragment,
// ): AttributeInput[] {
//   const selectionAttributeInput = getAttributeInputFromSelectedAttributes(
//     variant?.selectionAttributes,
//     VariantAttributeScope.VARIANT_SELECTION,
//   );
//   const nonSelectionAttributeInput = getAttributeInputFromSelectedAttributes(
//     variant?.nonSelectionAttributes,
//     VariantAttributeScope.NOT_VARIANT_SELECTION,
//   );
//
//   return (
//     selectionAttributeInput?.concat(nonSelectionAttributeInput ?? []) ?? []
//   );
// }
//
// export function getVariantAttributeInputFromInitiative(
//   initiative: InitiativeVariantCreateDataQuery["initiative"],
// ): AttributeInput[] {
//   const selectionAttributeInput = getAttributeInputFromAttributes(
//     initiative?.initiativeType?.selectionVariantAttributes,
//     VariantAttributeScope.VARIANT_SELECTION,
//   );
//
//   const nonSelectionAttributeInput = getAttributeInputFromAttributes(
//     initiative?.initiativeType?.nonSelectionVariantAttributes,
//     VariantAttributeScope.NOT_VARIANT_SELECTION,
//   );
//
//   return (
//     selectionAttributeInput?.concat(nonSelectionAttributeInput ?? []) ?? []
//   );
// }
//
// export function getStockInputFromVariant(
//   variant: InitiativeVariantFragment,
// ): InitiativeStockInput[] {
//   return (
//     variant?.stocks.map(stock => ({
//       data: {
//         quantityAllocated: stock.quantityAllocated,
//       },
//       id: stock.warehouse.id,
//       label: stock.warehouse.name,
//       value: stock.quantity.toString(),
//     })) || []
//   );
// }

// export function getCollectionInput(
//   initiativeCollections: InitiativeFragment["collections"],
// ): Collection[] {
//   return maybe(
//     () =>
//       initiativeCollections.map(collection => ({
//         id: collection.id,
//         label: collection.name,
//       })),
//     [],
//   );
// }

export function getChoices(nodes: Node[]): SingleAutocompleteChoiceType[] {
  return maybe(
    () =>
      nodes.map(node => ({
        label: node.name,
        value: node.id,
      })),
    [],
  );
}

export function getInitiativeUpdatePageFormData(
  initiative: InitiativeFragment,
  // variants: InitiativeDetailsVariantFragment[],
): InitiativeUpdateFormData {
  // const variant = initiative?.variants[0];

  return {
    // category: maybe(() => initiative.category.id, ""),
    // changeTaxCode: !!initiative?.taxType.taxCode,
    // chargeTaxes: maybe(() => initiative.chargeTaxes, false),
    // collections: maybe(
    //   () => initiative.collections.map(collection => collection.id),
    //   [],
    // ),
    // isAvailable: !!initiative?.isAvailable,
    metadata: initiative?.metadata?.map(mapMetadataItemToInput),
    // name: maybe(() => initiative.name, ""),
    title: maybe(() => initiative.title, ""),
    privateMetadata: initiative?.privateMetadata?.map(mapMetadataItemToInput),
    // rating: maybe(() => initiative.rating, null),
    seoDescription: maybe(() => initiative.seoDescription, ""),
    seoTitle: maybe(() => initiative.seoTitle, ""),
    // sku: maybe(
    //   () =>
    //     initiative.initiativeType.hasVariants
    //       ? undefined
    //       : variants && variants[0]
    //       ? variants[0].sku
    //       : undefined,
    //   "",
    // ),
    slug: initiative?.slug || "",
    // taxCode: initiative?.taxType.taxCode,
    // trackInventory: !!variant?.trackInventory,
    // weight: initiative?.weight?.value.toString() || "",
    // isPreorder: !!variant?.preorder || false,
    // globalThreshold: variant?.preorder?.globalThreshold?.toString() || "",
    // globalSoldUnits: variant?.preorder?.globalSoldUnits || 0,
    // hasPreorderEndDate: !!variant?.preorder?.endDate,
    // preorderEndDateTime: variant?.preorder?.endDate,
  };
}

export function mapFormsetStockToStockInput(
  stock: FormsetAtomicData<null, string>,
): StockInput {
  return {
    quantity: parseInt(stock.value, 10) || 0,
    warehouse: stock.id,
  };
}

export const getPreorderEndDateFormData = (endDate?: string) =>
  endDate ? moment(endDate).format("YYYY-MM-DD") : "";

export const getPreorderEndHourFormData = (endDate?: string) =>
  endDate ? moment(endDate).format("HH:mm") : "";
