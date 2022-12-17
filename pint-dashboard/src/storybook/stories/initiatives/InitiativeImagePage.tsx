import placeholder from "@assets/images/placeholder1080x1080.png";
import { InitiativeMediaType } from "@saleor/graphql";
import { storiesOf } from "@storybook/react";
import React from "react";

import InitiativeMediaPage from "../../../initiatives/components/InitiativeMediaPage";
import Decorator from "../../Decorator";

const mediaObj = {
  alt: "Lorem ipsum",
  id: "",
  type: InitiativeMediaType.IMAGE,
  url: placeholder,
};
const media = (Array(8) as any)
  .fill({ id: "img", url: placeholder, oembedData: "{}" })
  .map((image, imageIndex) => ({ ...image, id: image.id + imageIndex }));

storiesOf("Views / Initiatives / Initiative image details", module)
  .addDecorator(Decorator)
  .add("when loaded data", () => (
    <InitiativeMediaPage
      initiativeId=""
      initiative="Example initiative"
      disabled={false}
      mediaObj={mediaObj}
      media={media}
      onDelete={undefined}
      onRowClick={() => undefined}
      onSubmit={() => undefined}
      saveButtonBarState="default"
    />
  ))
  .add("when loading data", () => (
    <InitiativeMediaPage
      initiativeId=""
      initiative="Example initiative"
      disabled={true}
      onDelete={undefined}
      onRowClick={() => undefined}
      onSubmit={() => undefined}
      saveButtonBarState="default"
    />
  ));
