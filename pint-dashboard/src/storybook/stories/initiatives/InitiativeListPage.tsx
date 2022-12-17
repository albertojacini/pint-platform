import placeholderImage from "@assets/images/placeholder255x255.png";
import { defaultListSettings } from "@saleor/config";
import { initiatives as initiativeListFixture } from "@saleor/initiatives/fixtures";
import { InitiativeListUrlSortField } from "@saleor/initiatives/urls";
import { initiativeListFilterOpts } from "@saleor/initiatives/views/InitiativeList/fixtures";
import { attributes } from "@saleor/initiativeTypes/fixtures";
import { PaginatorContextDecorator } from "@saleor/storybook/PaginatorContextDecorator";
import { ListViews } from "@saleor/types";
import { storiesOf } from "@storybook/react";
import React from "react";

import {
  fetchMoreProps,
  filterPageProps,
  limits,
  limitsReached,
  listActionsProps,
  pageListProps,
  sortPageProps,
} from "../../../fixtures";
import InitiativeListPage, {
  InitiativeListPageProps,
} from "../../../initiatives/components/InitiativeListPage";
import Decorator from "../../Decorator";

const initiatives = initiativeListFixture(placeholderImage);

const props: InitiativeListPageProps = {
  ...listActionsProps,
  ...pageListProps.default,
  ...filterPageProps,
  ...fetchMoreProps,
  ...{
    ...sortPageProps,
    sort: {
      ...sortPageProps.sort,
      sort: InitiativeListUrlSortField.name,
    },
  },
  activeAttributeSortId: undefined,
  availableInGridAttributes: attributes,
  columnQuery: "",
  onColumnQueryChange: () => undefined,
  currencySymbol: "USD",
  defaultSettings: defaultListSettings[ListViews.INITIATIVE_LIST],
  filterOpts: initiativeListFilterOpts,
  gridAttributes: attributes,
  limits,
  onExport: () => undefined,
  initiatives,
  selectedChannelId: "123",
  settings: {
    ...pageListProps.default.settings,
    columns: ["availability", "initiativeType", "price"],
  },
};

storiesOf("Views / Initiatives / Initiative list", module)
  .addDecorator(Decorator)
  .addDecorator(PaginatorContextDecorator)
  .add("default", () => <InitiativeListPage {...props} />)
  .add("loading", () => (
    <InitiativeListPage
      {...props}
      initiatives={undefined}
      currentTab={undefined}
      disabled={true}
    />
  ))
  .add("with data", () => <InitiativeListPage {...props} initiatives={initiatives} />)
  .add("no data", () => <InitiativeListPage {...props} initiatives={[]} />)
  .add("no channels", () => (
    <InitiativeListPage
      {...props}
      selectedChannelId={""}
      initiatives={initiatives.map(initiative => ({ ...initiative, channelListings: [] }))}
    />
  ))
  .add("no limits", () => <InitiativeListPage {...props} limits={undefined} />)
  .add("limits reached", () => (
    <InitiativeListPage {...props} limits={limitsReached} />
  ));
