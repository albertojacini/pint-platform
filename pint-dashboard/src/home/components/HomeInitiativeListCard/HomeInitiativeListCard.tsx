import {
  Card,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
// import Money from "@saleor/components/Money";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellAvatar from "@saleor/components/TableCellAvatar";
import TableRowLink from "@saleor/components/TableRowLink";
import { HomeQuery } from "@saleor/graphql";
import { makeStyles } from "@saleor/macaw-ui";
import { initiativeVariantEditUrl } from "@saleor/initiatives/urls";
import { RelayToFlat } from "@saleor/types";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe, renderCollection } from "../../../misc";

const useStyles = makeStyles(
  theme => ({
    avatarProps: {
      height: 64,
      width: 64,
    },
    colAvatar: {
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(),
      paddingTop: theme.spacing(2),
      width: 112,
    },
    colName: {
      width: "auto",
    },
    label: {
      paddingLeft: 0,
    },
    noInitiatives: {
      paddingBottom: 20,
      paddingTop: 20,
    },
    tableRow: {
      cursor: "pointer",
    },
  }),
  { name: "HomeInitiativeListCard" },
);

interface HomeInitiativeListProps {
  testId?: string;
  topInitiatives: RelayToFlat<HomeQuery["initiativeTopToday"]>;
}

export const HomeInitiativeList: React.FC<HomeInitiativeListProps> = props => {
  const { topInitiatives, testId } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card data-test-id={testId}>
      <CardTitle
        title={intl.formatMessage({
          id: "rr8fyf",
          defaultMessage: "Top Initiatives",
          description: "header",
        })}
      />
      <ResponsiveTable>
        <colgroup>
          <col className={classes.colAvatar} />
          <col className={classes.colName} />
          <col />
        </colgroup>
        <TableBody>
          {renderCollection(
            topInitiatives,
            variant => (
              <TableRowLink
                key={variant ? variant.id : "skeleton"}
                hover={!!variant}
                className={classNames({
                  [classes.tableRow]: !!variant,
                })}
                href={initiativeVariantEditUrl(variant.initiative.id, variant.id)}
              >
                <TableCellAvatar
                  className={classes.colAvatar}
                  thumbnail={maybe(() => variant.initiative.thumbnail.url)}
                  avatarProps={classes.avatarProps}
                />

                <TableCell className={classes.label}>
                  {variant ? (
                    <>
                      <Typography color={"primary"}>
                        {variant.initiative.name}
                      </Typography>
                      <Typography color={"textSecondary"}>
                        {maybe(() =>
                          variant.attributes
                            .map(attribute => attribute.values[0].name)
                            .join(" / "),
                        )}
                      </Typography>
                      <Typography color={"textSecondary"}>
                        <FormattedMessage
                          id="0opVvi"
                          defaultMessage="{amount, plural,one {One ordered}other {{amount} Ordered}}"
                          description="number of ordered initiatives"
                          values={{
                            amount: variant.quantityOrdered,
                          }}
                        />
                      </Typography>
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>

                <TableCell>
                  <Typography align={"right"}>
                    {maybe(
                      () => (
                        <Money money={variant.revenue.gross} />
                      ),
                      <Skeleton />,
                    )}
                  </Typography>
                </TableCell>
              </TableRowLink>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={3} className={classes.noInitiatives}>
                  <Typography>
                    <FormattedMessage
                      id="Q1Uzbb"
                      defaultMessage="No initiatives found"
                    />
                  </Typography>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

HomeInitiativeList.displayName = "HomeInitiativeList";
export default HomeInitiativeList;
