import { ChannelOpts } from "@saleor/components/ChannelsAvailabilityCard/types";
import {
  InitiativeChannelListingAddInput,
  InitiativeChannelListingUpdateInput,
  InitiativeFragment,
} from "@saleor/graphql";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import uniq from "lodash/uniq";
import uniqBy from "lodash/uniqBy";
import { useCallback, useRef } from "react";

import { InitiativeChannelsListingDialogSubmit } from "./InitiativeChannelsListingsDialog";

const emptyListing: Omit<InitiativeChannelListingAddInput, "channelId"> = {
  availableForPurchaseDate: null,
  isAvailableForPurchase: false,
  isPublished: false,
  publicationDate: null,
  visibleInListings: false,
};

export function useInitiativeChannelListingsForm(
  initiative: Pick<InitiativeFragment, "channelListings">,
  triggerChange: () => void,
) {
  const [channels, setChannels] = useStateFromProps<
    InitiativeChannelListingUpdateInput
  >({
    removeChannels: [],
    updateChannels:
      initiative?.channelListings.map(listing => ({
        channelId: listing.channel.id,
        availableForPurchaseDate: listing.availableForPurchase,
        ...listing,
      })) ?? [],
  });
  const touched = useRef<string[]>([]);

  const touch = (id: string) => {
    touched.current = uniq([...touched.current, id]);
  };

  const handleChannelChange = useCallback((id: string, data: ChannelOpts) => {
    setChannels(prevData => ({
      ...prevData,
      updateChannels: prevData.updateChannels.map(prevListing =>
        prevListing.channelId === id
          ? { ...prevListing, ...data }
          : prevListing,
      ),
    }));
    triggerChange();
    touch(id);
  }, []);

  const handleChannelListUpdate: InitiativeChannelsListingDialogSubmit = useCallback(
    ({ added, removed }) => {
      setChannels(prevData => ({
        ...prevData,
        updateChannels: uniqBy(
          [
            ...prevData.updateChannels,
            ...added.map(id => ({
              channelId: id,
              ...emptyListing,
            })),
          ],
          "channelId",
        ).filter(({ channelId }) => !removed.includes(channelId)),
        removeChannels: uniq([...prevData.removeChannels, ...removed]).filter(
          id => !added.includes(id),
        ),
      }));
      triggerChange();
      added.forEach(id => touch(id));
    },
    [initiative],
  );

  return {
    channels,
    handleChannelChange,
    handleChannelListUpdate,
    touched,
  };
}
