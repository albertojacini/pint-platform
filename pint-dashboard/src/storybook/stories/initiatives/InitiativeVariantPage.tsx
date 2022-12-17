import placeholderImage from "@assets/images/placeholder60x60.png";
import { createVariantChannels } from "@saleor/channels/utils";
import { InitiativeErrorCode } from "@saleor/graphql";
import { warehouseList } from "@saleor/warehouses/fixtures";
import { storiesOf } from "@storybook/react";
import React from "react";

import InitiativeVariantPage from "../../../initiatives/components/InitiativeVariantPage";
import { variant as variantFixture } from "../../../initiatives/fixtures";
import Decorator from "../../Decorator";

const variant = variantFixture(placeholderImage);
const channels = createVariantChannels(variant);

storiesOf("Views / Initiatives / Initiative variant details", module)
  .addDecorator(Decorator)
  .add("when loaded data", () => (
    <InitiativeVariantPage
      initiativeId=""
      defaultWeightUnit="kg"
      header={variant.name || variant.sku}
      errors={[]}
      channels={channels}
      channelErrors={[]}
      variant={variant}
      onDelete={undefined}
      onSetDefaultVariant={() => undefined}
      onMediaSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantReorder={() => undefined}
      saveButtonBarState="default"
      variantDeactivatePreoderButtonState="default"
      warehouses={warehouseList}
      onWarehouseConfigure={() => undefined}
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      fetchAttributeValues={() => undefined}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onAttributeSelectBlur={() => undefined}
      onVariantPreorderDeactivate={() => undefined}
    />
  ))
  .add("when loading data", () => (
    <InitiativeVariantPage
      initiativeId=""
      defaultWeightUnit="kg"
      header={undefined}
      errors={[]}
      channels={channels}
      channelErrors={[]}
      loading={true}
      placeholderImage={placeholderImage}
      onDelete={undefined}
      onSetDefaultVariant={() => undefined}
      onMediaSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantReorder={() => undefined}
      saveButtonBarState="default"
      variantDeactivatePreoderButtonState="default"
      warehouses={warehouseList}
      onWarehouseConfigure={() => undefined}
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      fetchAttributeValues={() => undefined}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onAttributeSelectBlur={() => undefined}
      onVariantPreorderDeactivate={() => undefined}
    />
  ))
  .add("no warehouses", () => (
    <InitiativeVariantPage
      initiativeId=""
      defaultWeightUnit="kg"
      header={variant.name || variant.sku}
      errors={[]}
      channels={channels}
      channelErrors={[]}
      variant={variant}
      onDelete={undefined}
      onSetDefaultVariant={() => undefined}
      onMediaSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantReorder={() => undefined}
      saveButtonBarState="default"
      variantDeactivatePreoderButtonState="default"
      warehouses={[]}
      onWarehouseConfigure={() => undefined}
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      fetchAttributeValues={() => undefined}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onAttributeSelectBlur={() => undefined}
      onVariantPreorderDeactivate={() => undefined}
    />
  ))
  .add("attribute errors", () => (
    <InitiativeVariantPage
      initiativeId=""
      defaultWeightUnit="kg"
      header={variant.name || variant.sku}
      channels={channels}
      variant={variant}
      onDelete={undefined}
      onSetDefaultVariant={() => undefined}
      onMediaSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantReorder={() => undefined}
      saveButtonBarState="default"
      variantDeactivatePreoderButtonState="default"
      errors={[
        {
          attributes: [variant.selectionAttributes[0].attribute.id],
          code: InitiativeErrorCode.REQUIRED,
          field: "attributes",
        },
        {
          attributes: null,
          code: InitiativeErrorCode.UNIQUE,
          field: "attributes",
        },
        {
          attributes: null,
          code: InitiativeErrorCode.ALREADY_EXISTS,
          field: "sku",
        },
      ].map(error => ({
        __typename: "InitiativeError",
        message: "Generic form error",
        ...error,
      }))}
      channelErrors={[
        {
          __typename: "InitiativeChannelListingError",
          channels: ["Q2hhbm5lbDox"],
          code: InitiativeErrorCode.INVALID,
          field: "price",
          message: "Initiative price cannot be lower than 0.",
        },
      ]}
      warehouses={warehouseList}
      onWarehouseConfigure={() => undefined}
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      fetchAttributeValues={() => undefined}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onAttributeSelectBlur={() => undefined}
      onVariantPreorderDeactivate={() => undefined}
    />
  ));
