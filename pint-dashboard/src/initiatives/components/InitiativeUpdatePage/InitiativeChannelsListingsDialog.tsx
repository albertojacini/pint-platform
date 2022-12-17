import ChannelsAvailabilityDialog from "@saleor/components/ChannelsAvailabilityDialog";
import { ChannelFragment } from "@saleor/graphql";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { DialogProps } from "@saleor/types";
import { arrayDiff } from "@saleor/utils/arrays";
import { toggle } from "@saleor/utils/lists";
import React from "react";
import { useIntl } from "react-intl";

import { InitiativeUpdateData } from "./types";

export type InitiativeChannelsListingDialogSubmit = (
  update: Record<"added" | "removed", string[]>,
) => void;

export interface InitiativeChannelsListingsDialogProps extends DialogProps {
  channels: ChannelFragment[];
  data: Pick<InitiativeUpdateData, "channels">;
  onConfirm: InitiativeChannelsListingDialogSubmit;
}

const InitiativeChannelsListingsDialog: React.FC<InitiativeChannelsListingsDialogProps> = ({
  channels,
  data,
  open,
  onClose,
  onConfirm,
}) => {
  const intl = useIntl();

  const [selected, setSelected] = useStateFromProps(
    data.channels.updateChannels.map(listing => listing.channelId),
  );

  const handleConfirm = () => {
    onConfirm(
      arrayDiff(
        data.channels.updateChannels.map(({ channelId }) => channelId),
        selected,
      ),
    );
    onClose();
  };

  const handleToggleAll = () =>
    selected.length !== channels.length
      ? setSelected(channels.map(({ id }) => id))
      : setSelected([]);

  return (
    <ChannelsAvailabilityDialog
      toggleAll={handleToggleAll}
      isSelected={({ id }) => selected.includes(id)}
      channels={channels}
      onChange={({ id }) =>
        setSelected(toggle(id, selected, (a, b) => a === b))
      }
      onClose={onClose}
      open={open}
      title={intl.formatMessage({
        id: "Eau5AV",
        defaultMessage: "Manage Initiatives Channel Availability",
      })}
      confirmButtonState="default"
      selected={selected.length}
      onConfirm={handleConfirm}
    />
  );
};

InitiativeChannelsListingsDialog.displayName = "InitiativeChannelsListingsDialog";
export default InitiativeChannelsListingsDialog;
