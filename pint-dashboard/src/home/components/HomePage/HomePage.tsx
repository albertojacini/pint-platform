import CardSpacer from "@saleor/components/CardSpacer";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
// import Money from "@saleor/components/Money";
import RequirePermissions from "@saleor/components/RequirePermissions";
import Skeleton from "@saleor/components/Skeleton";
import { HomeQuery, PermissionEnum } from "@saleor/graphql";
import { makeStyles } from "@saleor/macaw-ui";
import { RelayToFlat } from "@saleor/types";
import React from "react";

// import Orders from "../../../icons/Orders";
// import Sales from "../../../icons/Sales";
import HomeActivityCard from "../HomeActivityCard";
import HomeAnalyticsCard from "../HomeAnalyticsCard";
import HomeHeader from "../HomeHeader";
import HomeNotificationTable from "../HomeNotificationTable/HomeNotificationTable";
import HomeInitiativeListCard from "../HomeInitiativeListCard";

const useStyles = makeStyles(
  theme => ({
    cardContainer: {
      display: "grid",
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr",
      [theme.breakpoints.down("sm")]: {
        gridColumnGap: theme.spacing(1),
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr",
      },
    },
    icon: {
      "& path": {
        fill: theme.palette.primary.main,
      },
    },
  }),
  { name: "HomePage" },
);

export interface HomePageProps {
  activities: RelayToFlat<HomeQuery["activities"]>;
  orders: number | null;
  ordersToCapture: number | null;
  ordersToFulfill: number | null;
  initiativesOutOfStock: number;
  sales: HomeQuery["salesToday"]["gross"];
  topInitiatives: RelayToFlat<HomeQuery["initiativeTopToday"]> | null;
  userName: string;
  createNewChannelHref: string;
  ordersToFulfillHref: string;
  ordersToCaptureHref: string;
  initiativesOutOfStockHref: string;
  noChannel: boolean;
}

const HomePage: React.FC<HomePageProps> = props => {
  const {
    userName,
    orders,
    sales,
    topInitiatives,
    activities,
    createNewChannelHref,
    ordersToFulfillHref,
    ordersToCaptureHref,
    initiativesOutOfStockHref,
    ordersToCapture = 0,
    ordersToFulfill = 0,
    initiativesOutOfStock = 0,
    noChannel,
  } = props;

  const classes = useStyles(props);

  return (
    <Container>
      <HomeHeader userName={userName} />
      <CardSpacer />
      <Grid>
        <div>
          <RequirePermissions
            requiredPermissions={[PermissionEnum.MANAGE_ORDERS]}
          >
            <div className={classes.cardContainer}>
              <HomeAnalyticsCard
                title={"Sales"}
                testId="sales-analytics"
                icon={
                  <Sales
                    className={classes.icon}
                    fontSize={"inherit"}
                    viewBox="0 0 64 64"
                  />
                }
              >
                {noChannel ? (
                  0
                ) : sales ? (
                  <Money money={sales} />
                ) : (
                  <Skeleton style={{ width: "5em" }} />
                )}
              </HomeAnalyticsCard>
              <HomeAnalyticsCard
                title={"Orders"}
                testId="orders-analytics"
                icon={
                  <Orders
                    className={classes.icon}
                    fontSize={"inherit"}
                    viewBox="0 0 64 64"
                  />
                }
              >
                {noChannel ? (
                  0
                ) : orders !== undefined ? (
                  orders
                ) : (
                  <Skeleton style={{ width: "5em" }} />
                )}
              </HomeAnalyticsCard>
            </div>
          </RequirePermissions>
          <HomeNotificationTable
            createNewChannelHref={createNewChannelHref}
            ordersToFulfillHref={ordersToFulfillHref}
            ordersToCaptureHref={ordersToCaptureHref}
            initiativesOutOfStockHref={initiativesOutOfStockHref}
            ordersToCapture={ordersToCapture}
            ordersToFulfill={ordersToFulfill}
            initiativesOutOfStock={initiativesOutOfStock}
            noChannel={noChannel}
          />
          <CardSpacer />
          {topInitiatives && (
            <RequirePermissions
              requiredPermissions={[
                PermissionEnum.MANAGE_ORDERS,
                PermissionEnum.MANAGE_INITIATIVES,
              ]}
            >
              <HomeInitiativeListCard
                testId="top-initiatives"
                topInitiatives={topInitiatives}
              />
              <CardSpacer />
            </RequirePermissions>
          )}
        </div>
        {activities && (
          <div>
            <RequirePermissions
              requiredPermissions={[PermissionEnum.MANAGE_ORDERS]}
            >
              <HomeActivityCard
                activities={activities}
                testId="activity-card"
              />
            </RequirePermissions>
          </div>
        )}
      </Grid>
    </Container>
  );
};
HomePage.displayName = "HomePage";
export default HomePage;
