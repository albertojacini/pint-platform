import ActionDialog from "@saleor/components/ActionDialog";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType,
} from "@saleor/components/SingleAutocompleteSelectField";
import useModalDialogOpen from "@saleor/hooks/useModalDialogOpen";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { ConfirmButtonTransitionState } from "@saleor/macaw-ui";
import { FetchMoreProps } from "@saleor/types";
import React from "react";
import { useIntl } from "react-intl";

import { messages } from "./messages";

export interface InitiativeTypePickerDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  initiativeTypes?: SingleAutocompleteChoiceType[];
  fetchInitiativeTypes: (data: string) => void;
  fetchMoreInitiativeTypes: FetchMoreProps;
  onClose: () => void;
  onConfirm: (choice: string) => void;
}

const InitiativeTypePickerDialog: React.FC<InitiativeTypePickerDialogProps> = ({
  confirmButtonState,
  open,
  // initiativeTypes,
  // fetchInitiativeTypes,
  // fetchMoreInitiativeTypes,
  onClose,
  onConfirm,
}) => {
  const intl = useIntl();
  const [choice, setChoice] = useStateFromProps("");
  // const initiativeTypeDisplayValue = initiativeTypes.find(
  //   initiativeType => initiativeType.value === choice,
  // )?.label;

  useModalDialogOpen(open, {
    onClose: () => {
      setChoice("");
      // fetchInitiativeTypes("");
    },
  });

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={() => onConfirm(choice)}
      title={intl.formatMessage(messages.selectInitiativeType)}
      disabled={!choice}
    >
      <button onClick={onConfirm}>Vai alla pagina crea iniziativa</button>
      {/*<SingleAutocompleteSelectField*/}
      {/*  displayValue={initiativeTypeDisplayValue}*/}
      {/*  name="initiativeType"*/}
      {/*  label={intl.formatMessage(messages.initiativeType)}*/}
      {/*  choices={initiativeTypes}*/}
      {/*  value={choice}*/}
      {/*  onChange={e => setChoice(e.target.value)}*/}
      {/*  fetchChoices={fetchInitiativeTypes}*/}
      {/*  data-test-id="dialog-initiative-type"*/}
      {/*  {...fetchMoreInitiativeTypes}*/}
      {/*/>*/}
    </ActionDialog>
  );
};
InitiativeTypePickerDialog.displayName = "InitiativeTypePickerDialog";
export default InitiativeTypePickerDialog;
