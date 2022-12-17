import { useInitiativeTranslationsQuery } from "@saleor/graphql";
import usePaginator, { PaginatorContext } from "@saleor/hooks/usePaginator";
import TranslationsEntitiesList from "@saleor/translations/components/TranslationsEntitiesList";
import {
  languageEntityUrl,
  TranslatableEntities,
} from "@saleor/translations/urls";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";

import { TranslationsEntityListProps } from "./types";
import { sumCompleted } from "./utils";

const TranslationsInitiativeList: React.FC<TranslationsEntityListProps> = ({
  params,
  variables,
}) => {
  const { data, loading } = useInitiativeTranslationsQuery({
    displayLoader: true,
    variables,
  });

  const paginationValues = usePaginator({
    pageInfo: data?.translations?.pageInfo,
    paginationState: variables,
    queryString: params,
  });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <TranslationsEntitiesList
        disabled={loading}
        entities={mapEdgesToItems(data?.translations)?.map(
          node =>
            node.__typename === "InitiativeTranslatableContent" && {
              completion: {
                current: sumCompleted([
                  node.translation?.description,
                  node.translation?.name,
                  node.translation?.seoDescription,
                  node.translation?.seoTitle,
                  ...(node.attributeValues?.map(
                    ({ translation }) => translation?.richText,
                  ) || []),
                ]),
                max: 4 + (node.attributeValues?.length || 0),
              },
              id: node?.initiative?.id,
              name: node?.initiative?.name,
            },
        )}
        getRowHref={id =>
          languageEntityUrl(
            variables.language,
            TranslatableEntities.initiatives,
            id,
          )
        }
      />
    </PaginatorContext.Provider>
  );
};

export default TranslationsInitiativeList;
