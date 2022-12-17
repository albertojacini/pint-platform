import { Card, TableBody, TableCell, Typography } from "@material-ui/core";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import RequirePermissions from "@saleor/components/RequirePermissions";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableRowLink from "@saleor/components/TableRowLink";
import { PermissionEnum } from "@saleor/graphql";
import { makeStyles } from "@saleor/macaw-ui";
import React from "react";
import { useIntl } from "react-intl";

import { homeNotificationTableMessages as messages } from "./messages";

const useStyles = makeStyles(
  () => ({
    arrowIcon: {
      textAlign: "right",
      width: 100,
    },
    tableCard: {
      overflow: "hidden",
    },
    tableRow: {
      cursor: "pointer",
    },
  }),
  { name: "HomeNotificationTable" },
);

interface HomeNotificationTableProps {
  ordersToCapture: number;
  ordersToFulfill: number;
  initiativesOutOfStock: number;
  createNewChannelHref: string;
  ordersToFulfillHref: string;
  ordersToCaptureHref: string;
  initiativesOutOfStockHref: string;
  noChannel: boolean;
}

const HomeNotificationTable: React.FC<HomeNotificationTableProps> = props => {
  const {
    createNewChannelHref,
    ordersToFulfillHref,
    ordersToCaptureHref,
    initiativesOutOfStockHref,
    ordersToCapture,
    ordersToFulfill,
    initiativesOutOfStock,
    noChannel,
  } = props;

  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card className={classes.tableCard}>
      <ResponsiveTable>
        <TableBody className={classes.tableRow}>
          {noChannel && (
            <RequirePermissions
              requiredPermissions={[PermissionEnum.MANAGE_CHANNELS]}
            >
              <TableRowLink hover={true} href={createNewChannelHref}>
                <TableCell>
                  <Typography>
                    {intl.formatMessage(messages.createNewChannel)}
                  </Typography>
                </TableCell>
                <TableCell className={classes.arrowIcon}>
                  <KeyboardArrowRight />
                </TableCell>
              </TableRowLink>
            </RequirePermissions>
          )}
          <RequirePermissions
            requiredPermissions={[PermissionEnum.MANAGE_ORDERS]}
          >
            <TableRowLink hover={true} href={ordersToFulfillHref}>
              <TableCell data-test-id="orders-to-fulfill">
                {ordersToFulfill === undefined ? (
                  <Skeleton />
                ) : ordersToFulfill === 0 ? (
                  <Typography>
                    {intl.formatMessage(messages.noOrders)}
                  </Typography>
                ) : (
                  <Typography>
                    {intl.formatMessage(messages.orderReady, {
                      amount: <strong>{ordersToFulfill}</strong>,
                    })}
                  </Typography>
                )}
              </TableCell>
              <TableCell className={classes.arrowIcon}>
                <KeyboardArrowRight />
              </TableCell>
            </TableRowLink>
            <TableRowLink hover={true} href={ordersToCaptureHref}>
              <TableCell data-test-id="orders-to-capture">
                {ordersToCapture === undefined ? (
                  <Skeleton />
                ) : ordersToCapture === 0 ? (
                  <Typography>
                    {intl.formatMessage(messages.noPaymentWaiting)}
                  </Typography>
                ) : (
                  <Typography>
                    {intl.formatMessage(messages.paymentCapture, {
                      amount: <strong>{ordersToCapture}</strong>,
                    })}
                  </Typography>
                )}
              </TableCell>
              <TableCell className={classes.arrowIcon}>
                <KeyboardArrowRight />
              </TableCell>
            </TableRowLink>
          </RequirePermissions>
          <RequirePermissions
            requiredPermissions={[PermissionEnum.MANAGE_INITIATIVES]}
          >
            <TableRowLink hover={true} href={initiativesOutOfStockHref}>
              <TableCell data-test-id="initiatives-out-of-stock">
                {initiativesOutOfStock === undefined ? (
                  <Skeleton />
                ) : initiativesOutOfStock === 0 ? (
                  <Typography>
                    {intl.formatMessage(messages.noInitiativesOut)}
                  </Typography>
                ) : (
                  <Typography>
                    {intl.formatMessage(messages.initiativeOut, {
                      amount: <strong>{initiativesOutOfStock}</strong>,
                    })}
                  </Typography>
                )}
              </TableCell>
              <TableCell className={classes.arrowIcon}>
                <KeyboardArrowRight />
              </TableCell>
            </TableRowLink>
          </RequirePermissions>
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
HomeNotificationTable.displayName = "HomeNotificationTable";
export default HomeNotificationTable;
