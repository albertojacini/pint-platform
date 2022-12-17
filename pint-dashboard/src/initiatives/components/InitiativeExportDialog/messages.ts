import { InitiativeFieldEnum } from "@saleor/graphql";
import { defineMessages, useIntl } from "react-intl";

export const initiativeExportDialogMessages = defineMessages({
  title: {
    id: "xkjRu5",
    defaultMessage: "Export Information",
    description: "export initiatives to csv file, dialog header",
  },
  confirmButtonLabel: {
    id: "oOFrUd",
    defaultMessage: "export initiatives",
    description: "export initiatives to csv file, button",
  },
  initiativesLabel: {
    id: "dc5KWn",
    defaultMessage: "initiatives",
    description: "initiatives export type label",
  },
});

function useInitiativeExportFieldMessages() {
  const intl = useIntl();

  const messages = {
    [InitiativeFieldEnum.CATEGORY]: intl.formatMessage({
      id: "KupNHw",
      defaultMessage: "Category",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.CHARGE_TAXES]: intl.formatMessage({
      id: "QVNg8A",
      defaultMessage: "Charge Taxes",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.COLLECTIONS]: intl.formatMessage({
      id: "jxoMLL",
      defaultMessage: "Collections",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.DESCRIPTION]: intl.formatMessage({
      id: "YVIajc",
      defaultMessage: "Description",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.NAME]: intl.formatMessage({
      id: "W8i2Ez",
      defaultMessage: "Name",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.INITIATIVE_MEDIA]: intl.formatMessage({
      id: "6y+k8V",
      defaultMessage: "Initiative Images",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.INITIATIVE_TYPE]: intl.formatMessage({
      id: "Q/Nbku",
      defaultMessage: "Type",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.INITIATIVE_WEIGHT]: intl.formatMessage({
      id: "7JAAul",
      defaultMessage: "Export Initiative Weight",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.VARIANT_MEDIA]: intl.formatMessage({
      id: "Uo5MoU",
      defaultMessage: "Variant Images",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.VARIANT_ID]: intl.formatMessage({
      id: "HYHLsB",
      defaultMessage: "Export Variant ID",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.VARIANT_SKU]: intl.formatMessage({
      id: "5kvaFR",
      defaultMessage: "Export Variant SKU",
      description: "initiative field",
    }),
    [InitiativeFieldEnum.VARIANT_WEIGHT]: intl.formatMessage({
      id: "XBwpUv",
      defaultMessage: "Export Variant Weight",
      description: "initiative field",
    }),
  };

  return (field: InitiativeFieldEnum) => messages[field];
}

export default useInitiativeExportFieldMessages;
