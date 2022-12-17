import Date, { DateTime } from "@saleor/components/Date";
import Skeleton from "@saleor/components/Skeleton";
import { InitiativeListAttributeFragment } from "@saleor/graphql";
import React from "react";

import { getAttributeIdFromColumnValue } from "../InitiativeListPage/utils";

export interface InitiativeListAttributeProps {
  attribute: string;
  initiativeAttributes: InitiativeListAttributeFragment[];
}

const InitiativeListAttribute: React.FC<InitiativeListAttributeProps> = ({
  attribute: gridAttribute,
  initiativeAttributes,
}) => {
  if (!initiativeAttributes) {
    return <Skeleton />;
  }

  const initiativeAttribute = initiativeAttributes.find(
    attribute =>
      attribute.attribute.id === getAttributeIdFromColumnValue(gridAttribute),
  );
  if (initiativeAttribute) {
    if (initiativeAttribute.values.length) {
      if (initiativeAttribute.values[0].date) {
        return <Date date={initiativeAttribute.values[0].date} />;
      }
      if (initiativeAttribute.values[0].dateTime) {
        return <DateTime date={initiativeAttribute.values[0].dateTime} />;
      }
    }

    const textValue = initiativeAttribute.values
      .map(value => value.name)
      .join(", ");

    return <span title={textValue}>{textValue}</span>;
  }
  return <span>-</span>;
};

export default InitiativeListAttribute;
