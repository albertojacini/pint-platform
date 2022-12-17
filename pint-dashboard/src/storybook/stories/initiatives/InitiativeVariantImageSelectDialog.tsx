import placeholderImage from "@assets/images/placeholder255x255.png";
import Decorator from "@saleor/storybook/Decorator";
import { storiesOf } from "@storybook/react";
import React from "react";

import InitiativeVariantMediaSelectDialog from "../../../initiatives/components/InitiativeVariantImageSelectDialog";
import {
  variantMedia as variantImagesFixture,
  variantInitiativeImages as variantInitiativeImagesFixture,
} from "../../../initiatives/fixtures";

const variantImages = variantImagesFixture(placeholderImage);
const variantInitiativeImages = variantInitiativeImagesFixture(placeholderImage);

storiesOf("Initiatives / InitiativeVariantImageSelectDialog", module)
  .addDecorator(Decorator)
  .add("default", () => (
    <InitiativeVariantMediaSelectDialog
      media={variantInitiativeImages}
      selectedMedia={variantImages.map(image => image.id)}
      onClose={() => undefined}
      onMediaSelect={() => undefined}
      open={true}
    />
  ));
