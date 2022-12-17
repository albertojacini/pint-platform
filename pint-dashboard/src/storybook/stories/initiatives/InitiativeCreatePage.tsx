import { channelsList } from "@saleor/channels/fixtures";
import { createChannelsData } from "@saleor/channels/utils";
import { fetchMoreProps } from "@saleor/fixtures";
import { InitiativeErrorCode } from "@saleor/graphql";
import { warehouseList } from "@saleor/warehouses/fixtures";
import { storiesOf } from "@storybook/react";
import React from "react";

import InitiativeCreatePage, {
  InitiativeCreateFormData,
} from "../../../initiatives/components/InitiativeCreatePage";
import { initiative as initiativeFixture } from "../../../initiatives/fixtures";
import {
  initiativeTypes,
  initiativeTypeSearch,
} from "../../../initiativeTypes/fixtures";
import Decorator from "../../Decorator";
import { taxTypes } from "../taxes/fixtures";

const initiative = initiativeFixture("");
const channels = createChannelsData(channelsList);

storiesOf("Views / Initiatives / Create initiative", module)
  .addDecorator(Decorator)
  .add("default", () => (
    <InitiativeCreatePage
      channelsErrors={[]}
      currentChannels={channels}
      allChannelsCount={5}
      loading={false}
      errors={[]}
      header="Add initiative"
      collections={initiative.collections}
      fetchCategories={() => undefined}
      fetchCollections={() => undefined}
      fetchInitiativeTypes={() => undefined}
      fetchAttributeValues={() => undefined}
      fetchMoreCategories={fetchMoreProps}
      fetchMoreCollections={fetchMoreProps}
      fetchMoreInitiativeTypes={fetchMoreProps}
      fetchMoreAttributeValues={fetchMoreProps}
      initiativeTypes={initiativeTypes}
      categories={[initiative.category]}
      onChannelsChange={() => undefined}
      onSubmit={() => undefined}
      openChannelsModal={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
      onWarehouseConfigure={() => undefined}
      taxTypes={taxTypes}
      weightUnit="kg"
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onSelectInitiativeType={() => undefined}
      onAttributeSelectBlur={() => undefined}
    />
  ))
  .add("When loading", () => (
    <InitiativeCreatePage
      channelsErrors={[]}
      currentChannels={channels}
      allChannelsCount={5}
      loading={true}
      errors={[]}
      header="Add initiative"
      collections={initiative.collections}
      fetchCategories={() => undefined}
      fetchCollections={() => undefined}
      fetchInitiativeTypes={() => undefined}
      fetchAttributeValues={() => undefined}
      fetchMoreCategories={fetchMoreProps}
      fetchMoreCollections={fetchMoreProps}
      fetchMoreInitiativeTypes={fetchMoreProps}
      fetchMoreAttributeValues={fetchMoreProps}
      initiativeTypes={initiativeTypes}
      categories={[initiative.category]}
      onChannelsChange={() => undefined}
      onSubmit={() => undefined}
      openChannelsModal={() => undefined}
      saveButtonBarState="default"
      warehouses={undefined}
      onWarehouseConfigure={() => undefined}
      taxTypes={taxTypes}
      weightUnit="kg"
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onSelectInitiativeType={() => undefined}
      onAttributeSelectBlur={() => undefined}
    />
  ))
  .add("form errors", () => (
    <InitiativeCreatePage
      channelsErrors={[]}
      currentChannels={channels}
      allChannelsCount={5}
      loading={false}
      errors={([
        "attributes",
        "name",
        "initiativeType",
        "category",
        "sku",
      ] as Array<keyof InitiativeCreateFormData | "attributes">).map(field => ({
        __typename: "InitiativeError",
        attributes:
          field === "attributes"
            ? [initiativeTypeSearch.initiativeAttributes[0].id]
            : null,
        code: InitiativeErrorCode.INVALID,
        field,
        message: "Attributes invalid",
      }))}
      header="Add initiative"
      collections={initiative.collections}
      fetchCategories={() => undefined}
      fetchCollections={() => undefined}
      fetchInitiativeTypes={() => undefined}
      fetchAttributeValues={() => undefined}
      fetchMoreCategories={fetchMoreProps}
      fetchMoreCollections={fetchMoreProps}
      fetchMoreInitiativeTypes={fetchMoreProps}
      selectedInitiativeType={initiativeTypeSearch}
      fetchMoreAttributeValues={fetchMoreProps}
      initiativeTypes={initiativeTypes}
      categories={[initiative.category]}
      onChannelsChange={() => undefined}
      onSubmit={() => undefined}
      openChannelsModal={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
      onWarehouseConfigure={() => undefined}
      taxTypes={taxTypes}
      weightUnit="kg"
      referencePages={[]}
      referenceInitiatives={[]}
      attributeValues={[]}
      onAssignReferencesClick={() => undefined}
      onCloseDialog={() => undefined}
      onSelectInitiativeType={() => undefined}
      onAttributeSelectBlur={() => undefined}
    />
  ));
