import { Node, useInitiativeVariantSetDefaultMutation } from "@saleor/graphql";
import useNotifier from "@saleor/hooks/useNotifier";
import { getInitiativeErrorMessage } from "@saleor/utils/errors";
import { useIntl } from "react-intl";

function useOnSetDefaultVariant(initiativeId: string, variant: Node) {
  const notify = useNotifier();
  const intl = useIntl();

  const [initiativeVariantSetDefault] = useInitiativeVariantSetDefaultMutation({
    onCompleted: data => {
      const errors = data.initiativeVariantSetDefault.errors;
      if (errors.length) {
        errors.map(error =>
          notify({
            status: "error",
            text: getInitiativeErrorMessage(error, intl),
          }),
        );
      } else {
        const defaultVariant = data.initiativeVariantSetDefault.initiative.variants.find(
          variant =>
            variant.id ===
            data.initiativeVariantSetDefault.initiative.defaultVariant.id,
        );
        if (defaultVariant) {
          notify({
            status: "success",
            text: intl.formatMessage(
              {
                id: "gSQ0Ge",
                defaultMessage: "Variant {name} has been set as default.",
              },
              { name: defaultVariant.name },
            ),
          });
        }
      }
    },
  });

  const onSetDefaultVariant = (selectedVariant = null) => {
    initiativeVariantSetDefault({
      variables: {
        initiativeId,
        variantId: variant ? variant.id : selectedVariant.id,
      },
    });
  };

  return onSetDefaultVariant;
}
export default useOnSetDefaultVariant;
