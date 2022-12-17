import { OutputData } from "@editorjs/editorjs";
import {
  LanguageCodeEnum,
  useInitiativeTranslationDetailsQuery,
  useUpdateAttributeValueTranslationsMutation,
  useUpdateInitiativeTranslationsMutation,
} from "@saleor/graphql";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useShop from "@saleor/hooks/useShop";
import { commonMessages } from "@saleor/intl";
import { stringifyQs } from "@saleor/utils/urls";
import React from "react";
import { useIntl } from "react-intl";

import { extractMutationErrors, maybe } from "../../misc";
import TranslationsInitiativesPage from "../components/TranslationsInitiativesPage";
import { TranslationField, TranslationInputFieldName } from "../types";
import { getParsedTranslationInputData } from "../utils";

export interface TranslationsInitiativesQueryParams {
  activeField: string;
}
export interface TranslationsInitiativesProps {
  id: string;
  languageCode: LanguageCodeEnum;
  params: TranslationsInitiativesQueryParams;
}

const TranslationsInitiatives: React.FC<TranslationsInitiativesProps> = ({
  id,
  languageCode,
  params,
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const intl = useIntl();

  const initiativeTranslations = useInitiativeTranslationDetailsQuery({
    variables: { id, language: languageCode },
  });

  const onUpdate = (errors: unknown[]) => {
    if (errors.length === 0) {
      initiativeTranslations.refetch();
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges),
      });
      navigate("?", { replace: true });
    }
  };

  const [
    updateTranslations,
    updateTranslationsOpts,
  ] = useUpdateInitiativeTranslationsMutation({
    onCompleted: data => onUpdate(data.initiativeTranslate.errors),
  });

  const [
    updateAttributeValueTranslations,
  ] = useUpdateAttributeValueTranslationsMutation({
    onCompleted: data => onUpdate(data.attributeValueTranslate.errors),
  });

  const onEdit = (field: string) =>
    navigate(
      "?" +
        stringifyQs({
          activeField: field,
        }),
      { replace: true },
    );

  const onDiscard = () => {
    navigate("?", { replace: true });
  };

  const handleSubmit = (
    { name: fieldName }: TranslationField<TranslationInputFieldName>,
    data: string,
  ) =>
    extractMutationErrors(
      updateTranslations({
        variables: {
          id,
          input: getParsedTranslationInputData({
            data,
            fieldName,
          }),
          language: languageCode,
        },
      }),
    );

  const handleAttributeValueSubmit = (
    { id }: TranslationField<TranslationInputFieldName>,
    data: OutputData,
  ) =>
    extractMutationErrors(
      updateAttributeValueTranslations({
        variables: {
          id,
          input: { richText: JSON.stringify(data) },
          language: languageCode,
        },
      }),
    );

  const translation = initiativeTranslations?.data?.translation;

  return (
    <TranslationsInitiativesPage
      translationId={id}
      initiativeId={id}
      activeField={params.activeField}
      disabled={initiativeTranslations.loading || updateTranslationsOpts.loading}
      languageCode={languageCode}
      languages={maybe(() => shop.languages, [])}
      saveButtonState={updateTranslationsOpts.status}
      onEdit={onEdit}
      onDiscard={onDiscard}
      onSubmit={handleSubmit}
      onAttributeValueSubmit={handleAttributeValueSubmit}
      data={
        translation?.__typename === "InitiativeTranslatableContent"
          ? translation
          : null
      }
    />
  );
};
TranslationsInitiatives.displayName = "TranslationsInitiatives";
export default TranslationsInitiatives;
