import AssignInitiativeDialog, {
  AssignInitiativeDialogProps,
} from "@saleor/components/AssignInitiativeDialog";
import { fetchMoreProps } from "@saleor/fixtures";
import { initiatives } from "@saleor/shipping/fixtures";
import { storiesOf } from "@storybook/react";
import React from "react";

import Decorator from "../../Decorator";

const props: AssignInitiativeDialogProps = {
  ...fetchMoreProps,
  confirmButtonState: "default",
  loading: false,
  onClose: () => undefined,
  onFetch: () => undefined,
  onSubmit: () => undefined,
  open: true,
  initiatives,
};

storiesOf("Generics / Assign initiative", module)
  .addDecorator(Decorator)
  .add("default", () => <AssignInitiativeDialog {...props} />);
