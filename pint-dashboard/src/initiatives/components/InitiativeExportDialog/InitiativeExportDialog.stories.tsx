import { channelsList } from "@saleor/channels/fixtures";
import { ExportErrorCode, ExportInitiativesInput } from "@saleor/graphql";
import Decorator from "@saleor/storybook/Decorator";
import { warehouseList } from "@saleor/warehouses/fixtures";
import { storiesOf } from "@storybook/react";
import React from "react";

import { attributes } from "../../../attributes/fixtures";
import InitiativeExportDialog, {
  InitiativeExportDialogProps,
} from "./InitiativeExportDialog";

const props: InitiativeExportDialogProps = {
  attributes: attributes.map(attr => ({
    __typename: "Attribute",
    id: attr.id,
    name: attr.name,
  })),
  channels: channelsList,
  confirmButtonState: "default",
  errors: [],
  hasMore: true,
  loading: true,
  onClose: () => undefined,
  onFetch: () => undefined,
  onFetchMore: () => undefined,
  onSubmit: () => undefined,
  open: true,
  initiativeQuantity: {
    all: 100,
    filter: 32,
  },
  selectedInitiatives: 18,
  warehouses: warehouseList,
};

storiesOf("Views / Initiatives / Export / Export settings", module)
  .addDecorator(Decorator)
  .add("interactive", () => <InitiativeExportDialog {...props} />)
  .add("no initiatives selected", () => (
    <InitiativeExportDialog {...props} selectedInitiatives={0} />
  ))
  .add("errors", () => (
    <InitiativeExportDialog
      {...props}
      errors={(["fileType", "scope", null] as Array<
        keyof ExportInitiativesInput | null
      >).map(field => ({
        __typename: "ExportError",
        code: ExportErrorCode.INVALID,
        field,
        message: "Export invalid",
      }))}
    />
  ));
