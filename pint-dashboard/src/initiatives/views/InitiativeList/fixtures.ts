import { attributes } from "@saleor/attributes/fixtures";
import { categories } from "@saleor/categories/fixtures";
import { collections } from "@saleor/collections/fixtures";
import { fetchMoreProps, searchPageProps } from "@saleor/fixtures";
import { StockAvailability } from "@saleor/graphql";
import { InitiativeListFilterOpts } from "@saleor/initiatives/components/InitiativeListPage";
import { initiativeTypes } from "@saleor/initiativeTypes/fixtures";
import { mapEdgesToItems, mapSlugNodeToChoice } from "@saleor/utils/maps";

export const initiativeListFilterOpts: InitiativeListFilterOpts = {
  attributes: attributes.map(attr => ({
    id: attr.id,
    active: false,
    inputType: attr.inputType,
    name: attr.name,
    slug: attr.slug,
    value: [
      attr.choices.edges[0].node.slug,
      attr.choices.edges.length > 2 && attr.choices.edges[2].node.slug,
    ],
  })),
  attributeChoices: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    value: null,
    choices: mapSlugNodeToChoice(mapEdgesToItems(attributes[0].choices)),
    displayValues: mapSlugNodeToChoice(mapEdgesToItems(attributes[0].choices)),
  },
  categories: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: categories.slice(5).map(category => ({
      label: category.name,
      value: category.id,
    })),
    displayValues: [
      {
        label: categories[5].name,
        value: categories[5].id,
      },
    ],
    value: [categories[5].id],
  },
  channel: {
    active: false,
    value: "default-channel",
    choices: [
      {
        value: "default-channel",
        label: "Default channel",
      },
    ],
  },
  metadata: {
    active: false,
    value: [{ key: "metadataKey", value: "metadataValue" }],
  },
  initiativeKind: {
    active: false,
    value: "NORMAL",
    choices: [
      {
        value: "NORMAL",
        label: "Normal",
      },
    ],
  },
  collections: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: collections.slice(5).map(category => ({
      label: category.name,
      value: category.id,
    })),
    displayValues: [
      {
        label: collections[5].name,
        value: collections[5].id,
      },
    ],
    value: [collections[5].id],
  },
  price: {
    active: false,
    value: {
      max: "20",
      min: "10",
    },
  },
  initiativeType: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: initiativeTypes.slice(3).map(category => ({
      label: category.name,
      value: category.id,
    })),
    displayValues: [
      {
        label: initiativeTypes[3].name,
        value: initiativeTypes[3].id,
      },
    ],
    value: [initiativeTypes[4].id],
  },
  stockStatus: {
    active: false,
    value: StockAvailability.IN_STOCK,
  },
};
