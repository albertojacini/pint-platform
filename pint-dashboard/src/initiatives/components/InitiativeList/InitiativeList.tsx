import { TableBody, TableCell, TableFooter, TableRow } from "@material-ui/core";
// import { ChannelsAvailabilityDropdown } from "@saleor/components/ChannelsAvailabilityDropdown";
// import {
//   getChannelAvailabilityColor,
//   getChannelAvailabilityLabel,
// } from "@saleor/components/ChannelsAvailabilityDropdown/utils";
import Checkbox from "@saleor/components/Checkbox";
import Date from "@saleor/components/Date";
// import MoneyRange from "@saleor/components/MoneyRange";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellAvatar from "@saleor/components/TableCellAvatar";
import { AVATAR_MARGIN } from "@saleor/components/TableCellAvatar/Avatar";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import { TablePaginationWithContext } from "@saleor/components/TablePagination";
import TableRowLink from "@saleor/components/TableRowLink";
import TooltipTableCellHeader from "@saleor/components/TooltipTableCellHeader";
import { commonTooltipMessages } from "@saleor/components/TooltipTableCellHeader/messages";
import { InitiativeListColumns } from "@saleor/config";
// import { GridAttributesQuery, InitiativeListQuery } from "@saleor/graphql";
import { InitiativeListQuery } from "@saleor/graphql";
import { makeStyles, Pill } from "@saleor/macaw-ui";
import { maybe, renderCollection } from "@saleor/misc";
import {
  getAttributeIdFromColumnValue,
  isAttributeColumnValue,
} from "@saleor/initiatives/components/InitiativeListPage/utils";
import { InitiativeListUrlSortField, initiativeUrl } from "@saleor/initiatives/urls";
import { canBeSorted } from "@saleor/initiatives/views/InitiativeList/sort";
import {
  ChannelProps,
  ListActions,
  ListProps,
  RelayToFlat,
  SortPage,
} from "@saleor/types";
import TDisplayColumn, {
  DisplayColumnProps,
} from "@saleor/utils/columns/DisplayColumn";
import { getArrowDirection } from "@saleor/utils/sort";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { columnsMessages } from "./messages";
import InitiativeListAttribute from "./InitiativeListAttribute";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("md")]: {
      colName: {
        minWidth: 250,
      },
      colPrice: {
        width: 300,
      },
      colPublished: {
        width: 200,
      },
      colType: {
        width: 200,
      },
      colDate: {
        width: 200,
      },
    },
    colAttribute: {
      width: 200,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    colFill: {
      padding: 0,
      width: "100%",
    },
    colName: {
      "&$colNameFixed": {
        width: 250,
      },
    },
    colNameFixed: {},
    colNameHeader: {
      marginLeft: AVATAR_MARGIN,
    },
    colNameWrapper: {
      display: "block",
    },
    colPrice: {
      textAlign: "right",
    },
    colPublished: {},
    colType: {},
    link: {
      cursor: "pointer",
    },
    table: {
      tableLayout: "fixed",
    },
    tableContainer: {
      overflowX: "scroll",
    },
    textLeft: {
      textAlign: "left",
    },
    textRight: {
      textAlign: "right",
    },
  }),
  { name: "InitiativeList" },
);

const DisplayColumn = TDisplayColumn as React.FunctionComponent<
  DisplayColumnProps<InitiativeListColumns>
>;

interface InitiativeListProps
  extends ListProps<InitiativeListColumns>,
    ListActions,
    SortPage<InitiativeListUrlSortField>,
    ChannelProps {
  activeAttributeSortId: string;
  // gridAttributes: RelayToFlat<GridAttributesQuery["grid"]>;
  initiatives: RelayToFlat<InitiativeListQuery["initiatives"]>;
}

export const InitiativeList: React.FC<InitiativeListProps> = props => {
  const {
    activeAttributeSortId,
    settings,
    disabled,
    isChecked,
    // gridAttributes,
    initiatives,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
    onUpdateListSettings,
    onSort,
    selectedChannelId,
    filterDependency,
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const gridAttributesFromSettings = settings.columns.filter(
    isAttributeColumnValue,
  );
  const numberOfColumns =
    (initiatives?.length === 0 ? 1 : 2) + settings.columns.length;

  return (
    <div className={classes.tableContainer}>
      <ResponsiveTable className={classes.table}>
        <colgroup>
          {initiatives?.length !== 0 && <col />}
          <col className={classes.colName} />
          <DisplayColumn column="initiativeType" displayColumns={settings.columns}>
            <col className={classes.colType} />
          </DisplayColumn>
          <DisplayColumn
            column="availability"
            displayColumns={settings.columns}
          >
            <col className={classes.colPublished} />
          </DisplayColumn>
          {gridAttributesFromSettings.map(gridAttribute => (
            <col className={classes.colAttribute} key={gridAttribute} />
          ))}
          <DisplayColumn column="date" displayColumns={settings.columns}>
            <col className={classes.colDate} />
          </DisplayColumn>
          <DisplayColumn column="price" displayColumns={settings.columns}>
            <col className={classes.colPrice} />
          </DisplayColumn>
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={initiatives}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            data-test-id="col-name-header"
            arrowPosition="right"
            className={classNames(classes.colName, {
              [classes.colNameFixed]: settings.columns.length > 4,
            })}
            direction={
              sort.sort === InitiativeListUrlSortField.name
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(InitiativeListUrlSortField.name)}
          >
            <span className={classes.colNameHeader}>
              <FormattedMessage
                id="VQLIXd"
                defaultMessage="Name"
                description="initiative"
              />
            </span>
          </TableCellHeader>
          <DisplayColumn column="initiativeType" displayColumns={settings.columns}>
            <TableCellHeader
              data-test-id="col-type-header"
              className={classes.colType}
              direction={
                sort.sort === InitiativeListUrlSortField.initiativeType
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              onClick={() => onSort(InitiativeListUrlSortField.initiativeType)}
            >
              <FormattedMessage {...columnsMessages.type} />
            </TableCellHeader>
          </DisplayColumn>
          <DisplayColumn
            column="availability"
            displayColumns={settings.columns}
          >
            <TooltipTableCellHeader
              data-test-id="col-availability-header"
              className={classes.colPublished}
              direction={
                sort.sort === InitiativeListUrlSortField.status
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              onClick={() => onSort(InitiativeListUrlSortField.status)}
              disabled={
                !canBeSorted(
                  InitiativeListUrlSortField.status,
                  !!selectedChannelId,
                )
              }
              tooltip={intl.formatMessage(
                commonTooltipMessages.noFilterSelected,
                { filterName: filterDependency.label },
              )}
            >
              <FormattedMessage {...columnsMessages.availability} />
            </TooltipTableCellHeader>
          </DisplayColumn>
          {gridAttributesFromSettings.map(gridAttributeFromSettings => {
            const attributeId = getAttributeIdFromColumnValue(
              gridAttributeFromSettings,
            );

            return (
              <TableCellHeader
                className={classes.colAttribute}
                direction={
                  sort.sort === InitiativeListUrlSortField.attribute &&
                  attributeId === activeAttributeSortId
                    ? getArrowDirection(sort.asc)
                    : undefined
                }
                onClick={() =>
                  onSort(InitiativeListUrlSortField.attribute, attributeId)
                }
                key={gridAttributeFromSettings}
              >
                {maybe<React.ReactNode>(
                  () =>
                    gridAttributes.find(
                      gridAttribute => attributeId === gridAttribute.id,
                    ).name,
                  <Skeleton />,
                )}
              </TableCellHeader>
            );
          })}
          <DisplayColumn column="date" displayColumns={settings.columns}>
            <TableCellHeader
              data-test-id="col-date-header"
              className={classes.colDate}
              direction={
                sort.sort === InitiativeListUrlSortField.date
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              onClick={() => onSort(InitiativeListUrlSortField.date)}
            >
              <FormattedMessage {...columnsMessages.updatedAt} />
            </TableCellHeader>
          </DisplayColumn>
          <DisplayColumn column="price" displayColumns={settings.columns}>
            <TooltipTableCellHeader
              data-test-id="col-price-header"
              className={classes.colPrice}
              direction={
                sort.sort === InitiativeListUrlSortField.price
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              textAlign="right"
              onClick={() => onSort(InitiativeListUrlSortField.price)}
              disabled={
                !canBeSorted(InitiativeListUrlSortField.price, !!selectedChannelId)
              }
              tooltip={intl.formatMessage(
                commonTooltipMessages.noFilterSelected,
                { filterName: filterDependency.label },
              )}
            >
              <FormattedMessage {...columnsMessages.price} />
            </TooltipTableCellHeader>
          </DisplayColumn>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePaginationWithContext
              colSpan={numberOfColumns}
              settings={settings}
              onUpdateListSettings={onUpdateListSettings}
            />
          </TableRow>
        </TableFooter>
        {/*<TableBody>*/}
        {/*  {renderCollection(*/}
        {/*    initiatives,*/}
        {/*    initiative => {*/}
        {/*      const isSelected = initiative ? isChecked(initiative.id) : false;*/}
        {/*      const channel = initiative?.channelListings.find(*/}
        {/*        listing => listing.channel.id === selectedChannelId,*/}
        {/*      );*/}

        {/*      return (*/}
        {/*        <TableRowLink*/}
        {/*          selected={isSelected}*/}
        {/*          hover={!!initiative}*/}
        {/*          key={initiative ? initiative.id : "skeleton"}*/}
        {/*          href={initiative && initiativeUrl(initiative.id)}*/}
        {/*          className={classes.link}*/}
        {/*          data-test-id={"id-" + (initiative ? initiative?.id : "skeleton")}*/}
        {/*        >*/}
        {/*          <TableCell padding="checkbox">*/}
        {/*            <Checkbox*/}
        {/*              checked={isSelected}*/}
        {/*              disabled={disabled}*/}
        {/*              disableClickPropagation*/}
        {/*              onChange={() => toggle(initiative.id)}*/}
        {/*            />*/}
        {/*          </TableCell>*/}
        {/*          <TableCellAvatar*/}
        {/*            thumbnail={maybe(() => initiative.thumbnail.url)}*/}
        {/*          >*/}
        {/*            {initiative?.name ? (*/}
        {/*              <span data-test-id="name">{initiative.name}</span>*/}
        {/*            ) : (*/}
        {/*              <Skeleton />*/}
        {/*            )}*/}
        {/*          </TableCellAvatar>*/}
        {/*          <DisplayColumn*/}
        {/*            column="initiativeType"*/}
        {/*            displayColumns={settings.columns}*/}
        {/*          >*/}
        {/*            <TableCell*/}
        {/*              className={classes.colType}*/}
        {/*              data-test-id="initiative-type"*/}
        {/*            >*/}
        {/*              {initiative?.initiativeType?.name || <Skeleton />}*/}
        {/*            </TableCell>*/}
        {/*          </DisplayColumn>*/}
        {/*          <DisplayColumn*/}
        {/*            column="availability"*/}
        {/*            displayColumns={settings.columns}*/}
        {/*          >*/}
        {/*            <TableCell*/}
        {/*              className={classes.colPublished}*/}
        {/*              data-test-id="availability"*/}
        {/*              data-test-availability={*/}
        {/*                !!initiative?.channelListings?.length*/}
        {/*              }*/}
        {/*            >*/}
        {/*              {(initiative &&*/}
        {/*                (channel ? (*/}
        {/*                  <Pill*/}
        {/*                    label={intl.formatMessage(*/}
        {/*                      getChannelAvailabilityLabel(channel),*/}
        {/*                    )}*/}
        {/*                    color={getChannelAvailabilityColor(channel)}*/}
        {/*                  />*/}
        {/*                ) : (*/}
        {/*                  <ChannelsAvailabilityDropdown*/}
        {/*                    channels={initiative?.channelListings}*/}
        {/*                  />*/}
        {/*                ))) ?? <Skeleton />}*/}
        {/*            </TableCell>*/}
        {/*          </DisplayColumn>*/}
        {/*          {gridAttributesFromSettings.map(gridAttribute => (*/}
        {/*            <TableCell*/}
        {/*              className={classes.colAttribute}*/}
        {/*              key={gridAttribute}*/}
        {/*              data-test-id="attribute"*/}
        {/*              data-test-attribute={getAttributeIdFromColumnValue(*/}
        {/*                gridAttribute,*/}
        {/*              )}*/}
        {/*            >*/}
        {/*              <InitiativeListAttribute*/}
        {/*                attribute={gridAttribute}*/}
        {/*                initiativeAttributes={initiative?.attributes}*/}
        {/*              />*/}
        {/*            </TableCell>*/}
        {/*          ))}*/}
        {/*          <DisplayColumn*/}
        {/*            column="date"*/}
        {/*            displayColumns={settings.columns}*/}
        {/*          >*/}
        {/*            <TableCell className={classes.colDate} data-test-id="date">*/}
        {/*              {initiative?.updatedAt ? (*/}
        {/*                <Date date={initiative.updatedAt} />*/}
        {/*              ) : (*/}
        {/*                <Skeleton />*/}
        {/*              )}*/}
        {/*            </TableCell>*/}
        {/*          </DisplayColumn>*/}
        {/*          <DisplayColumn*/}
        {/*            column="price"*/}
        {/*            displayColumns={settings.columns}*/}
        {/*          >*/}
        {/*            <TableCell*/}
        {/*              className={classes.colPrice}*/}
        {/*              data-test-id="price"*/}
        {/*            >*/}
        {/*              {initiative?.channelListings ? (*/}
        {/*                <MoneyRange*/}
        {/*                  from={channel?.pricing?.priceRange?.start?.net}*/}
        {/*                  to={channel?.pricing?.priceRange?.stop?.net}*/}
        {/*                />*/}
        {/*              ) : (*/}
        {/*                <Skeleton />*/}
        {/*              )}*/}
        {/*            </TableCell>*/}
        {/*          </DisplayColumn>*/}
        {/*        </TableRowLink>*/}
        {/*      );*/}
        {/*    },*/}
        {/*    () => (*/}
        {/*      <TableRow>*/}
        {/*        <TableCell colSpan={numberOfColumns}>*/}
        {/*          <FormattedMessage*/}
        {/*            id="Q1Uzbb"*/}
        {/*            defaultMessage="No initiatives found"*/}
        {/*          />*/}
        {/*        </TableCell>*/}
        {/*      </TableRow>*/}
        {/*    ),*/}
        {/*  )}*/}
        {/*</TableBody>*/}
      </ResponsiveTable>
    </div>
  );
};
InitiativeList.displayName = "InitiativeList";
export default InitiativeList;
