import { Card, CardContent, Typography } from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import { FormSpacer } from "@saleor/components/FormSpacer";
import Hr from "@saleor/components/Hr";
import Link from "@saleor/components/Link";
import MultiAutocompleteSelectField, {
  MultiAutocompleteChoiceType,
} from "@saleor/components/MultiAutocompleteSelectField";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType,
} from "@saleor/components/SingleAutocompleteSelectField";
import {
  // InitiativeChannelListingErrorFragment,
  InitiativeErrorCode,
  InitiativeErrorFragment,
} from "@saleor/graphql";
import { ChangeEvent } from "@saleor/hooks/useForm";
import { commonMessages } from "@saleor/intl";
import { makeStyles } from "@saleor/macaw-ui";
import { maybe } from "@saleor/misc";
// import { initiativeTypeUrl } from "@saleor/initiativeTypes/urls";
import { FetchMoreProps } from "@saleor/types";
import { getFormErrors, getInitiativeErrorMessage } from "@saleor/utils/errors";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface InitiativeType {
  hasVariants: boolean;
  id: string;
  name: string;
}

const useStyles = makeStyles(
  theme => ({
    card: {
      overflow: "visible",
    },
    cardSubtitle: {
      fontSize: theme.typography.body1.fontSize,
      marginBottom: theme.spacing(0.5),
    },
    label: {
      marginBottom: theme.spacing(0.5),
    },
  }),
  { name: "InitiativeOrganization" },
);

interface InitiativeOrganizationProps {
  canChangeType: boolean;
  categories?: SingleAutocompleteChoiceType[];
  categoryInputDisplayValue: string;
  collections?: MultiAutocompleteChoiceType[];
  collectionsInputDisplayValue: MultiAutocompleteChoiceType[];
  data: {
    category: string;
    collections: string[];
    initiativeType?: InitiativeType;
  };
  disabled: boolean;
  errors: Array<InitiativeErrorFragment | InitiativeChannelListingErrorFragment>;
  initiativeType?: InitiativeType;
  initiativeTypeInputDisplayValue?: string;
  initiativeTypes?: SingleAutocompleteChoiceType[];
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  fetchMoreInitiativeTypes?: FetchMoreProps;
  fetchInitiativeTypes?: (data: string) => void;
  onCategoryChange: (event: ChangeEvent) => void;
  onCollectionChange: (event: ChangeEvent) => void;
  onInitiativeTypeChange?: (event: ChangeEvent) => void;
}

const InitiativeOrganization: React.FC<InitiativeOrganizationProps> = props => {
  const {
    canChangeType,
    categories,
    categoryInputDisplayValue,
    collections,
    collectionsInputDisplayValue,
    data,
    disabled,
    errors,
    fetchCategories,
    fetchCollections,
    fetchMoreCategories,
    fetchMoreCollections,
    fetchMoreInitiativeTypes,
    fetchInitiativeTypes,
    initiativeType,
    initiativeTypeInputDisplayValue,
    initiativeTypes,
    onCategoryChange,
    onCollectionChange,
    onInitiativeTypeChange,
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(
    // ["initiativeType", "category", "collections", "isPublished"],
    [],
    errors,
  );
  // const noCategoryError =
  //   formErrors.isPublished?.code === InitiativeErrorCode.INITIATIVE_WITHOUT_CATEGORY
  //     ? formErrors.isPublished
  //     : null;

  return (
    <Card className={classes.card}>
      <CardTitle
        title={intl.formatMessage({
          id: "JjeZEG",
          defaultMessage: "Organize Initiative",
          description: "section header",
        })}
      />
      <CardContent>
        {canChangeType ? (
          <SingleAutocompleteSelectField
            displayValue={initiativeTypeInputDisplayValue}
            error={!!formErrors.initiativeType}
            helperText={getInitiativeErrorMessage(formErrors.initiativeType, intl)}
            name="initiativeType"
            disabled={disabled}
            label={intl.formatMessage({
              id: "anK7jD",
              defaultMessage: "Initiative Type",
            })}
            choices={initiativeTypes}
            value={data.initiativeType?.id}
            onChange={onInitiativeTypeChange}
            fetchChoices={fetchInitiativeTypes}
            data-test-id="initiative-type"
            {...fetchMoreInitiativeTypes}
          />
        ) : (
          <>
            <Typography className={classes.label} variant="caption">
              <FormattedMessage id="anK7jD" defaultMessage="Initiative Type" />
            </Typography>
            {/*<Typography>*/}
            {/*  <Link*/}
            {/*    href={initiativeTypeUrl(initiativeType?.id) ?? ""}*/}
            {/*    disabled={!initiativeType?.id}*/}
            {/*  >*/}
            {/*    {initiativeType?.name ?? "..."}*/}
            {/*  </Link>*/}
            {/*</Typography>*/}
            <CardSpacer />
            <Typography className={classes.label} variant="caption">
              <FormattedMessage id="Be+J13" defaultMessage="Configurable" />
            </Typography>
            <Typography>
              {maybe(
                () =>
                  initiativeType.hasVariants
                    ? intl.formatMessage(commonMessages.yes)
                    : intl.formatMessage(commonMessages.no),
                "...",
              )}
            </Typography>
          </>
        )}
        <FormSpacer />
        <Hr />
        <FormSpacer />
        {/*<SingleAutocompleteSelectField*/}
        {/*  displayValue={categoryInputDisplayValue}*/}
        {/*  error={!!(formErrors.category || noCategoryError)}*/}
        {/*  helperText={getInitiativeErrorMessage(*/}
        {/*    formErrors.category || noCategoryError,*/}
        {/*    intl,*/}
        {/*  )}*/}
        {/*  disabled={disabled}*/}
        {/*  label={intl.formatMessage({*/}
        {/*    id: "ccXLVi",*/}
        {/*    defaultMessage: "Category",*/}
        {/*  })}*/}
        {/*  choices={disabled ? [] : categories}*/}
        {/*  name="category"*/}
        {/*  value={data.category}*/}
        {/*  onChange={onCategoryChange}*/}
        {/*  fetchChoices={fetchCategories}*/}
        {/*  data-test-id="category"*/}
        {/*  {...fetchMoreCategories}*/}
        {/*/>*/}
        <FormSpacer />
        <Hr />
        <FormSpacer />
        <MultiAutocompleteSelectField
          displayValues={collectionsInputDisplayValue}
          error={!!formErrors.collections}
          label={intl.formatMessage({
            id: "ulh3kf",
            defaultMessage: "Collections",
          })}
          choices={disabled ? [] : collections}
          name="collections"
          value={data.collections}
          helperText={
            getInitiativeErrorMessage(formErrors.collections, intl) ||
            intl.formatMessage({
              id: "v+Pkm+",
              defaultMessage:
                "*Optional. Adding initiative to collection helps users find it.",
              description: "field is optional",
            })
          }
          onChange={onCollectionChange}
          fetchChoices={fetchCollections}
          data-test-id="collections"
          testId="collection"
          {...fetchMoreCollections}
        />
      </CardContent>
    </Card>
  );
};
InitiativeOrganization.displayName = "InitiativeOrganization";
export default InitiativeOrganization;
