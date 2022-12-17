import { Card, CardContent, TextField } from "@material-ui/core";
import { Backlink } from "@saleor/components/Backlink";
import CardTitle from "@saleor/components/CardTitle";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import Skeleton from "@saleor/components/Skeleton";
import { InitiativeMediaType } from "@saleor/graphql";
import useNavigator from "@saleor/hooks/useNavigator";
import { commonMessages } from "@saleor/intl";
import { ConfirmButtonTransitionState, makeStyles } from "@saleor/macaw-ui";
import { initiativeUrl } from "@saleor/initiatives/urls";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import InitiativeMediaNavigation from "../InitiativeMediaNavigation";

const messages = defineMessages({
  editMedia: {
    id: "Ihp4D3",
    defaultMessage: "Edit Media",
    description: "header",
  },
  mediaInformation: {
    id: "9RvXNg",
    defaultMessage: "Media Information",
    description: "section header",
  },
  mediaView: {
    id: "cW1RIo",
    defaultMessage: "Media View",
    description: "section header",
  },
  optional: {
    id: "lzdvwp",
    defaultMessage: "Optional",
    description: "field is optional",
  },
});

const useStyles = makeStyles(
  theme => ({
    image: {
      height: "100%",
      objectFit: "contain",
      width: "100%",
    },
    imageContainer: {
      "& iframe": {
        width: "100%",
        maxHeight: 420,
      },
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      margin: `0 auto ${theme.spacing(2)}px`,
      width: "100%",
      padding: theme.spacing(2),
    },
  }),
  { name: "InitiativeMediaPage" },
);

interface InitiativeMediaPageProps {
  initiativeId: string;
  mediaObj?: {
    id: string;
    alt: string;
    url: string;
    type: string;
    oembedData?: string;
  };
  media?: Array<{
    id: string;
    url: string;
  }>;
  disabled: boolean;
  initiative: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  onDelete: () => void;
  onRowClick: (id: string) => () => void;
  onSubmit: (data: { description: string }) => void;
}

const InitiativeMediaPage: React.FC<InitiativeMediaPageProps> = props => {
  const {
    initiativeId,
    disabled,
    mediaObj,
    media,
    initiative,
    saveButtonBarState,
    onDelete,
    onRowClick,
    onSubmit,
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const navigate = useNavigator();

  return (
    <Form
      initial={{ description: mediaObj ? mediaObj.alt : "" }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, submit }) => (
        <Container>
          <Backlink href={initiativeUrl(initiativeId)}>{initiative}</Backlink>
          <PageHeader title={intl.formatMessage(messages.editMedia)} />
          <Grid variant="inverted">
            <div>
              <InitiativeMediaNavigation
                disabled={disabled}
                media={media}
                highlighted={media ? mediaObj.id : undefined}
                onRowClick={onRowClick}
              />
              <Card>
                <CardTitle
                  title={intl.formatMessage(messages.mediaInformation)}
                />
                <CardContent>
                  <TextField
                    name="description"
                    label={intl.formatMessage(commonMessages.description)}
                    helperText={intl.formatMessage(messages.optional)}
                    disabled={disabled}
                    onChange={change}
                    value={data.description}
                    multiline
                    fullWidth
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardTitle title={intl.formatMessage(messages.mediaView)} />
                <CardContent>
                  {!!mediaObj ? (
                    mediaObj?.type === InitiativeMediaType.IMAGE ? (
                      <div className={classes.imageContainer}>
                        <img
                          className={classes.image}
                          src={mediaObj.url}
                          alt={mediaObj.alt}
                        />
                      </div>
                    ) : (
                      <div
                        className={classes.imageContainer}
                        dangerouslySetInnerHTML={{
                          __html: JSON.parse(mediaObj?.oembedData)?.html,
                        }}
                      />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </CardContent>
              </Card>
            </div>
          </Grid>
          <Savebar
            disabled={disabled || !onSubmit}
            state={saveButtonBarState}
            onCancel={() => navigate(initiativeUrl(initiativeId))}
            onDelete={onDelete}
            onSubmit={submit}
          />
        </Container>
      )}
    </Form>
  );
};
InitiativeMediaPage.displayName = "InitiativeMediaPage";
export default InitiativeMediaPage;
