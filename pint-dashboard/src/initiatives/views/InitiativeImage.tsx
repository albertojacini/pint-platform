import { DialogContentText } from "@material-ui/core";
import ActionDialog from "@saleor/components/ActionDialog";
import NotFoundPage from "@saleor/components/NotFoundPage";
import {
  useInitiativeMediaByIdQuery,
  useInitiativeMediaDeleteMutation,
  useInitiativeMediaUpdateMutation,
} from "@saleor/graphql";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import InitiativeMediaPage from "../components/InitiativeMediaPage";
import {
  initiativeImageUrl,
  InitiativeImageUrlQueryParams,
  initiativeListUrl,
  initiativeUrl,
} from "../urls";

interface InitiativeMediaProps {
  mediaId: string;
  initiativeId: string;
  params: InitiativeImageUrlQueryParams;
}

export const InitiativeImage: React.FC<InitiativeMediaProps> = ({
  mediaId,
  initiativeId,
  params,
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleBack = () => navigate(initiativeUrl(initiativeId));

  const { data, loading } = useInitiativeMediaByIdQuery({
    displayLoader: true,
    variables: {
      mediaId,
      initiativeId,
    },
  });

  const [updateImage, updateResult] = useInitiativeMediaUpdateMutation({
    onCompleted: data => {
      if (data.initiativeMediaUpdate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
      }
    },
  });

  const [deleteImage, deleteResult] = useInitiativeMediaDeleteMutation({
    onCompleted: handleBack,
  });

  const initiative = data?.initiative;

  if (initiative === null) {
    return <NotFoundPage onBack={() => navigate(initiativeListUrl())} />;
  }

  const handleDelete = () => deleteImage({ variables: { id: mediaId } });
  const handleImageClick = (id: string) => () =>
    navigate(initiativeImageUrl(initiativeId, id));
  const handleUpdate = (formData: { description: string }) => {
    updateImage({
      variables: {
        alt: formData.description,
        id: mediaId,
      },
    });
  };
  const mediaObj = data?.initiative?.mainImage;

  return (
    <>
      <InitiativeMediaPage
        initiativeId={initiativeId}
        disabled={loading}
        initiative={data?.initiative?.name}
        mediaObj={mediaObj || null}
        media={data?.initiative?.media}
        onDelete={() =>
          navigate(
            initiativeImageUrl(initiativeId, mediaId, {
              action: "remove",
            }),
          )
        }
        onRowClick={handleImageClick}
        onSubmit={handleUpdate}
        saveButtonBarState={updateResult.status}
      />
      <ActionDialog
        onClose={() =>
          navigate(initiativeImageUrl(initiativeId, mediaId), { replace: true })
        }
        onConfirm={handleDelete}
        open={params.action === "remove"}
        title={intl.formatMessage({
          id: "uCn/rd",
          defaultMessage: "Delete Image",
          description: "dialog header",
        })}
        variant="delete"
        confirmButtonState={deleteResult.status}
      >
        <DialogContentText>
          <FormattedMessage
            id="VEext+"
            defaultMessage="Are you sure you want to delete this image?"
          />
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default InitiativeImage;
