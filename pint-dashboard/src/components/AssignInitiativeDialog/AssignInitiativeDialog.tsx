import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import ConfirmButton from "@saleor/components/ConfirmButton";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import TableCellAvatar from "@saleor/components/TableCellAvatar";
import { SearchInitiativesQuery } from "@saleor/graphql";
import useModalDialogOpen from "@saleor/hooks/useModalDialogOpen";
import useSearchQuery from "@saleor/hooks/useSearchQuery";
import { ConfirmButtonTransitionState } from "@saleor/macaw-ui";
import { maybe } from "@saleor/misc";
import useScrollableDialogStyle from "@saleor/styles/useScrollableDialogStyle";
import { DialogProps, FetchMoreProps, RelayToFlat } from "@saleor/types";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage, useIntl } from "react-intl";

import BackButton from "../BackButton";
import Checkbox from "../Checkbox";
import { messages } from "./messages";
import { useStyles } from "./styles";

export interface AssignInitiativeDialogFormData {
  initiatives: RelayToFlat<SearchInitiativesQuery["search"]>;
  query: string;
}

export interface AssignInitiativeDialogProps extends FetchMoreProps, DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  initiatives: RelayToFlat<SearchInitiativesQuery["search"]>;
  selectedIds?: Record<string, boolean>;
  loading: boolean;
  onFetch: (value: string) => void;
  onSubmit: (data: string[]) => void;
}

const scrollableTargetId = "assignInitiativeScrollableDialog";

const AssignInitiativeDialog: React.FC<AssignInitiativeDialogProps> = props => {
  const {
    confirmButtonState,
    hasMore,
    open,
    loading,
    initiatives,
    onClose,
    onFetch,
    onFetchMore,
    onSubmit,
    selectedIds,
  } = props;
  const classes = useStyles(props);
  const scrollableDialogClasses = useScrollableDialogStyle({});
  const intl = useIntl();
  const [query, onQueryChange, queryReset] = useSearchQuery(onFetch);
  const [initiativesDict, setInitiativesDict] = React.useState(selectedIds || {});

  useEffect(() => {
    if (selectedIds) {
      setInitiativesDict(prev => {
        const prevIds = Object.keys(prev);
        const newIds = Object.keys(selectedIds);

        const preSelected = newIds
          .filter(n => !prevIds.includes(n))
          .reduce((p, c) => ({ ...p, [c]: true }), {});

        return { ...prev, ...preSelected };
      });
    }
  }, [selectedIds]);

  useModalDialogOpen(open, {
    onOpen: () => {
      queryReset();
      setInitiativesDict(selectedIds || {});
    },
  });

  const handleSubmit = () => {
    const selectedInitiativesAsArray = Object.keys(initiativesDict)
      .filter(key => initiativesDict[key])
      .map(key => key);

    onSubmit(selectedInitiativesAsArray);
  };

  const handleChange = initiativeId => {
    setInitiativesDict(prev => ({
      ...prev,
      [initiativeId]: !prev[initiativeId] ?? true,
    }));
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      classes={{ paper: scrollableDialogClasses.dialog }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <FormattedMessage {...messages.assignVariantDialogHeader} />
      </DialogTitle>
      <DialogContent>
        <TextField
          name="query"
          value={query}
          onChange={onQueryChange}
          label={intl.formatMessage(messages.assignInitiativeDialogSearch)}
          placeholder={intl.formatMessage(messages.assignInitiativeDialogContent)}
          fullWidth
          InputProps={{
            autoComplete: "off",
            endAdornment: loading && <CircularProgress size={16} />,
          }}
        />
      </DialogContent>
      <DialogContent
        className={scrollableDialogClasses.scrollArea}
        id={scrollableTargetId}
      >
        <InfiniteScroll
          dataLength={initiatives?.length ?? 0}
          next={onFetchMore}
          hasMore={hasMore}
          scrollThreshold="100px"
          loader={
            <div className={scrollableDialogClasses.loadMoreLoaderContainer}>
              <CircularProgress size={16} />
            </div>
          }
          scrollableTarget={scrollableTargetId}
        >
          <ResponsiveTable key="table">
            <TableBody>
              {initiatives &&
                initiatives.map(initiative => {
                  const isSelected = initiativesDict[initiative.id] || false;

                  return (
                    <TableRow
                      key={initiative.id}
                      data-test-id="assign-initiative-table-row"
                    >
                      <TableCellAvatar
                        className={classes.avatar}
                        thumbnail={maybe(() => initiative.thumbnail.url)}
                      />
                      <TableCell className={classes.colName}>
                        {initiative.name}
                      </TableCell>
                      <TableCell
                        padding="checkbox"
                        className={classes.checkboxCell}
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleChange(initiative.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </ResponsiveTable>
        </InfiniteScroll>
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <ConfirmButton
          data-test-id="submit"
          transitionState={confirmButtonState}
          type="submit"
          onClick={handleSubmit}
        >
          <FormattedMessage {...messages.assignInitiativeDialogButton} />
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
AssignInitiativeDialog.displayName = "AssignInitiativeDialog";
export default AssignInitiativeDialog;
