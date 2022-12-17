import placeholderImage from "@assets/images/placeholder255x255.png";
// import { channelsList } from "@saleor/channels/fixtures";
// import { collections } from "@saleor/collections/fixtures";
import { fetchMoreProps, limits, limitsReached } from "@saleor/fixtures";
import { InitiativeErrorCode } from "@saleor/graphql";
import InitiativeUpdatePage, {
  InitiativeUpdatePageProps,
} from "@saleor/initiatives/components/InitiativeUpdatePage";
import { InitiativeUpdateFormData } from "@saleor/initiatives/components/InitiativeUpdatePage/types";
import { initiative as initiativeFixture } from "@saleor/initiatives/fixtures";
// import { warehouseList } from "@saleor/warehouses/fixtures";
import { storiesOf } from "@storybook/react";
import React from "react";

import Decorator from "../../Decorator";
// import { taxTypes } from "../taxes/fixtures";

const initiative = initiativeFixture(placeholderImage);

const props: InitiativeUpdatePageProps = {
  // channels: channelsList,
  // variantListErrors: [
  //   {
  //     __typename: "DatagridError",
  //     variantId: initiative.variants[0].id,
  //     type: "channel",
  //     channelIds: [channelsList[1].id],
  //     error: InitiativeErrorCode.ALREADY_EXISTS,
  //   },
  // ],
  initiativeId: "123",
  isSimpleInitiative: false,
  // categories: [initiative.category],
  // channelsErrors: [],
  // collections,
  disabled: false,
  errors: [],
  // fetchCategories: () => undefined,
  // fetchCollections: () => undefined,
  // fetchAttributeValues: () => undefined,
  // onAttributeSelectBlur: () => undefined,
  // fetchMoreCategories: fetchMoreProps,
  // fetchMoreCollections: fetchMoreProps,
  // fetchMoreAttributeValues: fetchMoreProps,
  header: initiative.name,
  media: initiative.media,
  limits,
  // onAttributeValuesSearch: () => Promise.resolve([]),
  onAssignReferencesClick: () => undefined,
  onCloseDialog: () => undefined,
  onDelete: () => undefined,
  onImageDelete: () => undefined,
  onImageUpload: () => undefined,
  onMediaUrlUpload: () => undefined,
  onSubmit: () => undefined,
  onVariantShow: () => undefined,
  refetch: () => undefined,
  placeholderImage,
  initiative,
  referencePages: [],
  referenceInitiatives: [],
  saveButtonBarState: "default",
  // taxTypes,
  // variants: initiative.variants,
  // warehouses: warehouseList,
  // attributeValues: [],
};

storiesOf("Views / Initiatives / Initiative edit", module)
  .addDecorator(Decorator)
  .add("when data is fully loaded", () => <InitiativeUpdatePage {...props} />)
  .add("when initiative has no images", () => (
    <InitiativeUpdatePage {...props} media={[]} />
  ))
  .add("when initiative has no variants", () => (
    <InitiativeUpdatePage
      {...props}
      initiative={{
        ...initiative,
        initiativeType: { ...initiative.initiativeType, hasVariants: false },
      }}
    />
  ))
  .add("when loading data", () => (
    <InitiativeUpdatePage
      {...props}
      disabled={true}
      header={undefined}
      categories={[]}
      variants={undefined}
      initiative={undefined}
      collections={undefined}
      media={undefined}
    />
  ))
  // .add("no variants", () => (
  //   <InitiativeUpdatePage
  //     {...props}
  //     initiative={{
  //       ...props.initiative,
  //       initiativeType: {
  //         ...initiative.initiativeType,
  //         hasVariants: false,
  //       },
  //     }}
  //   />
  // ))
  .add("no stock and no variants", () => (
    <InitiativeUpdatePage
      {...props}
      initiative={{
        ...initiative,

        initiativeType: {
          ...initiative.initiativeType,
          hasVariants: false,
        },
        variants: [
          {
            ...initiative.variants[0],
            stocks: [],
          },
        ],
      }}
    />
  ))
  .add("no stock, no variants and no warehouses", () => (
    <InitiativeUpdatePage
      {...props}
      warehouses={[]}
      initiative={{
        ...initiative,
        initiativeType: {
          ...initiative.initiativeType,
          hasVariants: false,
        },
        variants: [
          {
            ...initiative.variants[0],
            stocks: [],
          },
        ],
      }}
    />
  ))
  // .add("no initiative attributes", () => (
  //   <InitiativeUpdatePage
  //     {...props}
  //     initiative={{
  //       ...props.initiative,
  //       attributes: [],
  //     }}
  //   />
  // ))
  .add("form errors", () => (
    <InitiativeUpdatePage
      {...props}
      errors={([
        "attributes",
        "category",
        "chargeTaxes",
        "collections",
        "name",
        "publicationDate",
        "seoDescription",
        "seoTitle",
        "sku",
        "stockQuantity",
      ] as Array<keyof InitiativeUpdateFormData | "attributes">).map(field => ({
        __typename: "InitiativeError",
        attributes:
          field === "attributes" ? [initiative.attributes[0].attribute.id] : null,
        code: InitiativeErrorCode.INVALID,
        field,
        message: "Attributes invalid",
      }))}
    />
  ))
  .add("no limits", () => <InitiativeUpdatePage {...props} limits={undefined} />)
  .add("limits reached", () => (
    <InitiativeUpdatePage {...props} limits={limitsReached} />
  ));
