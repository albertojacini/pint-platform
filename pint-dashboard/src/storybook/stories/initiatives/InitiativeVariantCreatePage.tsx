import placeholderImage from "@assets/images/placeholder255x255.png";
import { InitiativeErrorCode } from "@saleor/graphql";
import { warehouseList } from "@saleor/warehouses/fixtures";
import { storiesOf } from "@storybook/react";
import React from "react";

import InitiativeVariantCreatePage from "../../../initiatives/components/InitiativeVariantCreatePage";
import { initiative as initiativeFixture } from "../../../initiatives/fixtures";
import Decorator from "../../Decorator";

const initiative = initiativeFixture(placeholderImage);

storiesOf("Views / Initiatives / Create initiative variant", module)
  .addDecorator(Decorator)
  .add("default", () => (
    <InitiativeVariantCreatePage
      initiativeId=""
      weightUnit="kg"
      disabled={false}
      errors={[]}
      header="Add variant"
      initiative={initiative}
      onSubmit={() => undefined}
      onVariantClick={undefined}
      onVariantReorder={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
      onWarehouseConfigure={() => undefined}
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      fetchAttributeValues={() => undefined}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onAttributeSelectBlur={() => undefined}
    />
  ))
  .add("with errors", () => (
    <InitiativeVariantCreatePage
      initiativeId=""
      weightUnit="kg"
      disabled={false}
      errors={[
        {
          attributes: [initiative.initiativeType.variantAttributes[0].id],
          code: InitiativeErrorCode.REQUIRED,
          field: "attributes",
          message: "Attributes required",
        },
        {
          attributes: null,
          code: InitiativeErrorCode.UNIQUE,
          field: "attributes",
          message: "Attributes has unique",
        },
        {
          attributes: null,
          code: InitiativeErrorCode.ALREADY_EXISTS,
          field: "sku",
          message: "Sku already exists",
        },
      ].map(error => ({
        __typename: "InitiativeError",
        ...error,
      }))}
      header="Add variant"
      initiative={initiative}
      onSubmit={() => undefined}
      onVariantClick={undefined}
      onVariantReorder={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
      onWarehouseConfigure={() => undefined}
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      fetchAttributeValues={() => undefined}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onAttributeSelectBlur={() => undefined}
    />
  ))
  .add("when loading data", () => (
    <InitiativeVariantCreatePage
      initiativeId=""
      weightUnit="kg"
      disabled={true}
      errors={[]}
      header="Add variant"
      initiative={undefined}
      onSubmit={() => undefined}
      onVariantClick={undefined}
      onVariantReorder={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
      onWarehouseConfigure={() => undefined}
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      fetchAttributeValues={() => undefined}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onAttributeSelectBlur={() => undefined}
    />
  ))
  .add("add first variant", () => (
    <InitiativeVariantCreatePage
      initiativeId=""
      weightUnit="kg"
      disabled={false}
      errors={[]}
      header="Add variant"
      initiative={{
        ...initiative,
        variants: [],
      }}
      onSubmit={() => undefined}
      onVariantClick={undefined}
      onVariantReorder={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
      onWarehouseConfigure={() => undefined}
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      fetchAttributeValues={() => undefined}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onAttributeSelectBlur={() => undefined}
    />
  ))
  .add("no warehouses", () => (
    <InitiativeVariantCreatePage
      initiativeId=""
      weightUnit="kg"
      disabled={false}
      errors={[]}
      header="Add variant"
      initiative={initiative}
      onSubmit={() => undefined}
      onVariantClick={undefined}
      onVariantReorder={() => undefined}
      saveButtonBarState="default"
      warehouses={[]}
      onWarehouseConfigure={() => undefined}
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      fetchAttributeValues={() => undefined}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onAttributeSelectBlur={() => undefined}
    />
  ));
