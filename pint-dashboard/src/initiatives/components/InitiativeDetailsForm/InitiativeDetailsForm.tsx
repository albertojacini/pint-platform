import { OutputData } from "@editorjs/editorjs";
import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import Hr from "@saleor/components/Hr";
// import RichTextEditor from "@saleor/components/RichTextEditor";
// import { RichTextEditorLoading } from "@saleor/components/RichTextEditor/RichTextEditorLoading";
import { InitiativeErrorFragment } from "@saleor/graphql";
import { commonMessages } from "@saleor/intl";
import { getFormErrors, getInitiativeErrorMessage } from "@saleor/utils/errors";
// import { useRichTextContext } from "@saleor/utils/richText/context";
import React from "react";
import { useIntl } from "react-intl";

interface InitiativeDetailsFormProps {
  data: {
    description: OutputData;
    title: string;
    rating: number;
  };
  disabled?: boolean;
  errors: InitiativeErrorFragment[];

  onChange(event: any);
}

export const InitiativeDetailsForm: React.FC<InitiativeDetailsFormProps> = ({
  data,
  disabled,
  errors,
  onChange,
}) => {
  const intl = useIntl();
  // const {
  //   editorRef,
  //   defaultValue,
  //   isReadyForMount,
  //   handleChange,
  // } = useRichTextContext();

  const formErrors = getFormErrors(["title", "description", "rating"], errors);
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          error={!!formErrors.name}
          helperText={getInitiativeErrorMessage(formErrors.name, intl)}
          disabled={disabled}
          fullWidth
          label={intl.formatMessage({
            id: "6AMFki",
            defaultMessage: "Title",
            description: "initiative title",
          })}
          name="title"
          value={data.title}
          onChange={onChange}
        />
        <FormSpacer />
        {/*{isReadyForMount ? (*/}
        {/*  <RichTextEditor*/}
        {/*    editorRef={editorRef}*/}
        {/*    defaultValue={defaultValue}*/}
        {/*    onChange={handleChange}*/}
        {/*    disabled={disabled}*/}
        {/*    error={!!formErrors.description}*/}
        {/*    helperText={getInitiativeErrorMessage(formErrors.description, intl)}*/}
        {/*    label={intl.formatMessage(commonMessages.description)}*/}
        {/*    name="description"*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <RichTextEditorLoading*/}
        {/*    label={intl.formatMessage(commonMessages.description)}*/}
        {/*    name="description"*/}
        {/*  />*/}
        {/*)}*/}
        <FormSpacer />
        <Hr />
        <FormSpacer />
        <Grid variant="uniform">
          <TextField
            type="number"
            error={!!formErrors.rating}
            helperText={getInitiativeErrorMessage(formErrors.rating, intl)}
            disabled={disabled}
            label={intl.formatMessage({
              id: "L7N+0y",
              defaultMessage: "Initiative Rating",
              description: "initiative rating",
            })}
            name="rating"
            value={data.rating || ""}
            onChange={onChange}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
export default InitiativeDetailsForm;
