import {
  Node,
  InitiativeFragment,
  InitiativeMediaCreateMutationVariables,
  InitiativeMediaReorderMutationVariables,
  InitiativeVariantReorderMutationFn,
} from "@saleor/graphql";
import { ReorderEvent } from "@saleor/types";
import { move } from "@saleor/utils/lists";
import { arrayMove } from "react-sortable-hoc";

export function createImageUploadHandler(
  id: string,
  createInitiativeImage: (variables: InitiativeMediaCreateMutationVariables) => void,
) {
  return (file: File) =>
    createInitiativeImage({
      alt: "",
      image: file,
      initiative: id,
    });
}

export function createImageReorderHandler(
  initiative: InitiativeFragment,
  reorderInitiativeImages: (
    variables: InitiativeMediaReorderMutationVariables,
  ) => void,
) {
  return ({ newIndex, oldIndex }: ReorderEvent) => {
    let ids = initiative.media.map(image => image.id);
    ids = arrayMove(ids, oldIndex, newIndex);
    reorderInitiativeImages({
      mediaIds: ids,
      initiativeId: initiative.id,
    });
  };
}

function areVariantsEqual(a: Node, b: Node) {
  return a.id === b.id;
}

export function createVariantReorderHandler<
  T extends { id: string; variants: any[] }
>(initiative: T, reorderInitiativeVariants: InitiativeVariantReorderMutationFn) {
  return ({ newIndex, oldIndex }: ReorderEvent) => {
    const oldVariantOrder = [...initiative.variants];

    reorderInitiativeVariants({
      variables: {
        move: {
          id: oldVariantOrder[oldIndex].id,
          sortOrder: newIndex - oldIndex,
        },
        initiativeId: initiative.id,
      },
      optimisticResponse: () => ({
        __typename: "Mutation",
        initiativeVariantReorder: {
          __typename: "InitiativeVariantReorder",
          errors: [],
          initiative: {
            __typename: "Initiative",
            id: initiative.id,
            variants: [
              ...move<T["variants"][0]>(
                initiative.variants[oldIndex],
                initiative!.variants,
                areVariantsEqual,
                newIndex,
              ),
            ],
          },
        },
      }),
    });
  };
}
