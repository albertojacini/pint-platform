import { InitiativeTypeKindEnum } from "@saleor/graphql";
import { isInEnum } from "@saleor/misc";
import { IntlShape } from "react-intl";

import { initiativeKindMessages as messages } from "./messages";

interface InitiativeKindChoice {
  label: string;
  value: InitiativeTypeKindEnum;
}

// export const getAvailableInitiativeKinds = (): InitiativeKindChoice[] =>
//   Object.keys(InitiativeTypeKindEnum).map(kind => ({
//     label: kind,
//     value: kind as InitiativeTypeKindEnum,
//   }));

// export const getInitiativeKindOpts = (
//   availableInitiatives: InitiativeKindChoice[],
//   intl: IntlShape,
// ): InitiativeKindChoice[] =>
//   availableInitiatives.map(kind => {
//     switch (kind.value) {
//       case InitiativeTypeKindEnum.GIFT_CARD:
//         return {
//           ...kind,
//           label: intl.formatMessage(messages.giftCardLabel),
//         };
//       case InitiativeTypeKindEnum.NORMAL:
//         return {
//           ...kind,
//           label: intl.formatMessage(messages.normalLabel),
//         };
//     }
//   });

export const getInitiativeGiftCardFilterParam = (initiativeKind?: string) => {
  if (
    initiativeKind === undefined ||
    !isInEnum(initiativeKind, InitiativeTypeKindEnum)
  ) {
    return null;
  }

  return initiativeKind === InitiativeTypeKindEnum.GIFT_CARD;
};
