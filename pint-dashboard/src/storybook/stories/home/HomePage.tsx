import placeholderImage from "@assets/images/placeholder60x60.png";
import { adminUserPermissions } from "@saleor/fixtures";
import { PermissionEnum } from "@saleor/graphql";
import { mapEdgesToItems } from "@saleor/utils/maps";
import { storiesOf } from "@storybook/react";
import React from "react";

import HomePageComponent, {
  HomePageProps,
} from "../../../home/components/HomePage";
import { shop as shopFixture } from "../../../home/fixtures";
import Decorator from "../../Decorator";
import { MockedUserProvider } from "../customers/MockedUserProvider";

const shop = shopFixture(placeholderImage);

const homePageProps: Omit<HomePageProps, "classes"> = {
  activities: mapEdgesToItems(shop.activities),
  noChannel: false,
  createNewChannelHref: "",
  ordersToFulfillHref: "",
  ordersToCaptureHref: "",
  initiativesOutOfStockHref: "",
  orders: shop.ordersToday.totalCount,
  ordersToCapture: shop.ordersToCapture.totalCount,
  ordersToFulfill: shop.ordersToFulfill.totalCount,
  initiativesOutOfStock: shop.initiativesOutOfStock.totalCount,
  sales: shop.salesToday.gross,
  topInitiatives: mapEdgesToItems(shop.initiativeTopToday),
  userName: "admin@example.com",
};

const HomePage = props => {
  const customPermissions = props?.customPermissions;

  return (
    <MockedUserProvider customPermissions={customPermissions}>
      <HomePageComponent {...props} />
    </MockedUserProvider>
  );
};

storiesOf("Views / HomePage", module)
  .addDecorator(Decorator)
  .add("default", () => <HomePage {...homePageProps} />)
  .add("loading", () => (
    <HomePage
      {...homePageProps}
      activities={undefined}
      orders={undefined}
      ordersToCapture={undefined}
      ordersToFulfill={undefined}
      initiativesOutOfStock={undefined}
      sales={undefined}
      topInitiatives={undefined}
      userName={undefined}
    />
  ))
  .add("no data", () => (
    <HomePage {...homePageProps} topInitiatives={[]} activities={[]} />
  ))
  .add("no permissions", () => (
    <HomePage {...homePageProps} customPermissions={[]} />
  ))
  .add("initiative permissions", () => (
    <HomePage
      {...homePageProps}
      customPermissions={adminUserPermissions.filter(
        perm => perm.code === PermissionEnum.MANAGE_INITIATIVES,
      )}
    />
  ))
  .add("order permissions", () => (
    <HomePage
      {...homePageProps}
      customPermissions={adminUserPermissions.filter(
        perm => perm.code === PermissionEnum.MANAGE_ORDERS,
      )}
    />
  ));
