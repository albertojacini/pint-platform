import Decorator from "@saleor/storybook/Decorator";
import { mapNodeToChoice } from "@saleor/utils/maps";
import { storiesOf } from "@storybook/react";
import React from "react";

import { initiativeTypesList } from "../../fixtures";
import InitiativeTypePickerDialog, {
  InitiativeTypePickerDialogProps,
} from "./InitiativeTypePickerDialog";

const initiativeTypes = mapNodeToChoice(initiativeTypesList);

const props: InitiativeTypePickerDialogProps = {
  initiativeTypes,
  confirmButtonState: "default",
  fetchInitiativeTypes: () => undefined,
  fetchMoreInitiativeTypes: {
    hasMore: false,
    loading: false,
    onFetchMore: () => undefined,
  },
  onClose: () => undefined,
  onConfirm: () => undefined,
  open: true,
};

storiesOf("Views / Initiatives / Initiative type dialog", module)
  .addDecorator(Decorator)
  .add("default", () => <InitiativeTypePickerDialog {...props} />);
