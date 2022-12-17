import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Button } from "@saleor/components/Button";
import ConfirmButton from "@saleor/components/ConfirmButton";
import makeCreatorSteps, { Step } from "@saleor/components/CreatorSteps";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import {
  ChannelFragment,
  ExportErrorFragment,
  ExportInitiativesInput,
  SearchAttributesQuery,
  WarehouseFragment,
} from "@saleor/graphql";
import useForm, { FormChange } from "@saleor/hooks/useForm";
import useModalDialogErrors from "@saleor/hooks/useModalDialogErrors";
import useModalDialogOpen from "@saleor/hooks/useModalDialogOpen";
import useWizard from "@saleor/hooks/useWizard";
import { buttonMessages } from "@saleor/intl";
import { ConfirmButtonTransitionState } from "@saleor/macaw-ui";
import { DialogProps, FetchMoreProps, RelayToFlat } from "@saleor/types";
import getExportErrorMessage from "@saleor/utils/errors/export";
import { toggle } from "@saleor/utils/lists";
import { mapNodeToChoice } from "@saleor/utils/maps";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ExportDialogSettings, {
  ExportItemsQuantity,
} from "./ExportDialogSettings";
import { initiativeExportDialogMessages as messages } from "./messages";
import InitiativeExportDialogInfo, {
  attributeNamePrefix,
  warehouseNamePrefix,
} from "./InitiativeExportDialogInfo";
import { exportSettingsInitialFormData } from "./types";

export enum InitiativeExportStep {
  INFO,
  SETTINGS,
}

function useSteps(): Array<Step<InitiativeExportStep>> {
  const intl = useIntl();

  return [
    {
      label: intl.formatMessage({
        id: "/68iG8",
        defaultMessage: "Information exported",
        description: "initiative export to csv file, header",
      }),
      value: InitiativeExportStep.INFO,
    },
    {
      label: intl.formatMessage({
        id: "ki7Mr8",
        defaultMessage: "Export Settings",
        description: "initiative export to csv file, header",
      }),
      value: InitiativeExportStep.SETTINGS,
    },
  ];
}

const initialForm: ExportInitiativesInput = {
  exportInfo: {
    attributes: [],
    channels: [],
    fields: [],
    warehouses: [],
  },
  ...exportSettingsInitialFormData,
};

const InitiativeExportSteps = makeCreatorSteps<InitiativeExportStep>();

export interface InitiativeExportDialogProps extends DialogProps, FetchMoreProps {
  attributes: RelayToFlat<SearchAttributesQuery["search"]>;
  channels: ChannelFragment[];
  confirmButtonState: ConfirmButtonTransitionState;
  errors: ExportErrorFragment[];
  initiativeQuantity: ExportItemsQuantity;
  selectedInitiatives: number;
  warehouses: WarehouseFragment[];
  onFetch: (query: string) => void;
  onSubmit: (data: ExportInitiativesInput) => void;
}

const InitiativeExportDialog: React.FC<InitiativeExportDialogProps> = ({
  attributes,
  channels,
  confirmButtonState,
  errors,
  initiativeQuantity,
  onClose,
  onSubmit,
  open,
  selectedInitiatives,
  warehouses,
  ...fetchMoreProps
}) => {
  const [step, { next, prev, set: setStep }] = useWizard(
    InitiativeExportStep.INFO,
    [InitiativeExportStep.INFO, InitiativeExportStep.SETTINGS],
  );
  const steps = useSteps();
  const dialogErrors = useModalDialogErrors(errors, open);
  const notFormErrors = dialogErrors.filter(err => !err.field);
  const intl = useIntl();
  const [selectedAttributes, setSelectedAttributes] = React.useState<
    MultiAutocompleteChoiceType[]
  >([]);
  const [selectedChannels, setSelectedChannels] = React.useState([]);
  const { change, data, reset, submit } = useForm(initialForm, onSubmit);

  useModalDialogOpen(open, {
    onClose: () => {
      reset();
      setStep(InitiativeExportStep.INFO);
    },
  });

  const attributeChoices = mapNodeToChoice(attributes);
  const warehouseChoices = mapNodeToChoice(warehouses);

  const handleAttributeSelect: FormChange = event => {
    const id = event.target.name.substr(attributeNamePrefix.length);

    change({
      target: {
        name: "exportInfo",
        value: {
          ...data.exportInfo,
          attributes: toggle(id, data.exportInfo.attributes, (a, b) => a === b),
        },
      },
    });

    const choice = attributeChoices.find(choice => choice.value === id);

    setSelectedAttributes(
      toggle(choice, selectedAttributes, (a, b) => a.value === b.value),
    );
  };

  const handleChannelSelect = (option: ChannelFragment) => {
    change({
      target: {
        name: "exportInfo",
        value: {
          ...data.exportInfo,
          channels: toggle(
            option.id,
            data.exportInfo.channels,
            (a, b) => a === b,
          ),
        },
      },
    });
    const choice = channels.find(choice => choice.id === option.id);

    setSelectedChannels(
      toggle(choice, selectedChannels, (a, b) => a.id === b.id),
    );
  };

  const handleToggleAllChannels = (
    items: ChannelFragment[],
    selected: number,
  ) => {
    setSelectedChannels(selected === items.length ? [] : channels);

    change({
      target: {
        name: "exportInfo",
        value: {
          ...data.exportInfo,
          channels:
            selected === items.length
              ? []
              : channels.map(channel => channel.id),
        },
      },
    });
  };

  const handleWarehouseSelect: FormChange = event =>
    change({
      target: {
        name: "exportInfo",
        value: {
          ...data.exportInfo,
          warehouses: toggle(
            event.target.name.substr(warehouseNamePrefix.length),
            data.exportInfo.warehouses,
            (a, b) => a === b,
          ),
        },
      },
    });

  const handleToggleAllWarehouses: FormChange = () =>
    change({
      target: {
        name: "exportInfo",
        value: {
          ...data.exportInfo,
          warehouses:
            data.exportInfo.warehouses.length === warehouses.length
              ? []
              : warehouses.map(warehouse => warehouse.id),
        },
      },
    });

  const exportScopeLabels = {
    allItems: intl.formatMessage(
      {
        id: "xtUXnK",
        defaultMessage: "All initiatives ({number})",
        description: "export all items to csv file",
      },
      {
        number: initiativeQuantity.all || "...",
      },
    ),
    selectedItems: intl.formatMessage(
      {
        id: "qEZ463",
        defaultMessage: "Selected initiatives ({number})",
        description: "export selected items to csv file",
      },
      {
        number: selectedInitiatives,
      },
    ),
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <>
        <DialogTitle>
          <FormattedMessage {...messages.title} />
        </DialogTitle>
        <DialogContent>
          <InitiativeExportSteps
            currentStep={step}
            steps={steps}
            onStepClick={setStep}
          />
          {step === InitiativeExportStep.INFO && (
            <InitiativeExportDialogInfo
              attributes={attributeChoices}
              channels={channels}
              data={data}
              selectedChannels={selectedChannels}
              selectedAttributes={selectedAttributes}
              onAttrtibuteSelect={handleAttributeSelect}
              onWarehouseSelect={handleWarehouseSelect}
              onChange={change}
              warehouses={warehouseChoices}
              onChannelSelect={handleChannelSelect}
              onSelectAllChannels={handleToggleAllChannels}
              onSelectAllWarehouses={handleToggleAllWarehouses}
              {...fetchMoreProps}
            />
          )}
          {step === InitiativeExportStep.SETTINGS && (
            <ExportDialogSettings
              data={data}
              errors={dialogErrors}
              onChange={change}
              itemsQuantity={initiativeQuantity}
              selectedItems={selectedInitiatives}
              exportScopeLabels={exportScopeLabels}
            />
          )}
        </DialogContent>

        {notFormErrors.length > 0 && (
          <DialogContent>
            {notFormErrors.map(err => (
              <Typography color="error" key={err.field + err.code}>
                {getExportErrorMessage(err, intl)}
              </Typography>
            ))}
          </DialogContent>
        )}

        <DialogActions>
          {step === InitiativeExportStep.INFO && (
            <Button
              variant="secondary"
              color="text"
              onClick={onClose}
              data-test-id="cancel"
            >
              <FormattedMessage {...buttonMessages.cancel} />
            </Button>
          )}
          {step === InitiativeExportStep.SETTINGS && (
            <Button
              variant="secondary"
              color="text"
              onClick={prev}
              data-test-id="back"
            >
              <FormattedMessage {...buttonMessages.back} />
            </Button>
          )}
          {step === InitiativeExportStep.INFO && (
            <Button variant="primary" onClick={next} data-test-id="next">
              <FormattedMessage {...buttonMessages.nextStep} />
            </Button>
          )}
          {step === InitiativeExportStep.SETTINGS && (
            <ConfirmButton
              transitionState={confirmButtonState}
              type="submit"
              data-test-id="submit"
              onClick={submit}
            >
              <FormattedMessage {...messages.confirmButtonLabel} />
            </ConfirmButton>
          )}
        </DialogActions>
      </>
    </Dialog>
  );
};

InitiativeExportDialog.displayName = "InitiativeExportDialog";
export default InitiativeExportDialog;
