import { Backlink } from "@saleor/components/Backlink";
import CardSpacer from "@saleor/components/CardSpacer";
import Container from "@saleor/components/Container";
import LanguageSwitch from "@saleor/components/LanguageSwitch";
import PageHeader from "@saleor/components/PageHeader";
import { LanguageCodeEnum, InitiativeTranslationFragment } from "@saleor/graphql";
import { commonMessages, sectionNames } from "@saleor/intl";
import { getStringOrPlaceholder } from "@saleor/misc";
import {
  TranslationInputFieldName,
  TranslationsEntitiesPageProps,
} from "@saleor/translations/types";
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from "@saleor/translations/urls";
import React from "react";
import { useIntl } from "react-intl";

import InitiativeContextSwitcher from "../InitiativeContextSwitcher";
import TranslationFields from "../TranslationFields";

export interface TranslationsInitiativesPageProps
  extends TranslationsEntitiesPageProps {
  data: InitiativeTranslationFragment;
  initiativeId: string;
  onAttributeValueSubmit: TranslationsEntitiesPageProps["onSubmit"];
}

const TranslationsInitiativesPage: React.FC<TranslationsInitiativesPageProps> = ({
  translationId,
  initiativeId,
  activeField,
  disabled,
  languageCode,
  languages,
  data,
  saveButtonState,
  onDiscard,
  onEdit,
  onSubmit,
  onAttributeValueSubmit,
}) => {
  const intl = useIntl();

  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.initiatives,
        })}
      >
        {intl.formatMessage(sectionNames.translations)}
      </Backlink>
      <PageHeader
        title={intl.formatMessage(
          {
            id: "22x9tu",
            defaultMessage:
              'Translation Initiative "{initiativeName}" - {languageCode}',
            description: "header",
          },
          {
            languageCode,
            initiativeName: getStringOrPlaceholder(data?.initiative?.name),
          },
        )}
      >
        <InitiativeContextSwitcher
          languageCode={languageCode}
          initiativeId={initiativeId}
          selectedId={initiativeId}
        />
        <LanguageSwitch
          currentLanguage={LanguageCodeEnum[languageCode]}
          languages={languages}
          getLanguageUrl={lang =>
            languageEntityUrl(
              lang,
              TranslatableEntities.initiatives,
              translationId,
            )
          }
        />
      </PageHeader>
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage(commonMessages.generalInformations)}
        fields={[
          {
            displayName: intl.formatMessage({
              id: "ZIc5lM",
              defaultMessage: "Initiative Name",
            }),
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: "short" as "short",
            value: data?.initiative?.name,
          },
          {
            displayName: intl.formatMessage({
              id: "Q8Qw5B",
              defaultMessage: "Description",
            }),
            name: TranslationInputFieldName.description,
            translation: data?.translation?.description || null,
            type: "rich" as "rich",
            value: data?.initiative?.description,
          },
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
      <CardSpacer />
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage({
          id: "TGX4T1",
          defaultMessage: "Search Engine Preview",
        })}
        fields={[
          {
            displayName: intl.formatMessage({
              id: "HlEpii",
              defaultMessage: "Search Engine Title",
            }),
            name: TranslationInputFieldName.seoTitle,
            translation: data?.translation?.seoTitle || null,
            type: "short" as "short",
            value: data?.initiative?.seoTitle,
          },
          {
            displayName: intl.formatMessage({
              id: "US3IPU",
              defaultMessage: "Search Engine Description",
            }),
            name: TranslationInputFieldName.seoDescription,
            translation: data?.translation?.seoDescription || null,
            type: "long" as "long",
            value: data?.initiative?.seoDescription,
          },
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
      <CardSpacer />
      {data?.attributeValues?.length > 0 && (
        <>
          <TranslationFields
            activeField={activeField}
            disabled={disabled}
            initialState={true}
            title={intl.formatMessage(commonMessages.translationAttributes)}
            fields={
              data.attributeValues.map((attrVal, i) => ({
                id: attrVal.attributeValue.id,
                displayName: intl.formatMessage(
                  {
                    id: "PajjqE",
                    defaultMessage: "Attribute {number}",
                    description: "attribute list",
                  },
                  {
                    number: i + 1,
                  },
                ),
                name: attrVal?.name,
                translation: attrVal?.translation?.richText || null,
                type: "rich" as "rich",
                value: attrVal?.richText,
              })) || []
            }
            saveButtonState={saveButtonState}
            richTextResetKey={languageCode}
            onEdit={onEdit}
            onDiscard={onDiscard}
            onSubmit={onAttributeValueSubmit}
          />
          <CardSpacer />
        </>
      )}
    </Container>
  );
};
TranslationsInitiativesPage.displayName = "TranslationsInitiativesPage";
export default TranslationsInitiativesPage;
