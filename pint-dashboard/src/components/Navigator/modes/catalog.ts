// import { categoryUrl } from "@saleor/categories/urls";
// import { collectionUrl } from "@saleor/collections/urls";
import { SearchCatalogQuery } from "@saleor/graphql";
import { UseNavigatorResult } from "@saleor/hooks/useNavigator";
import { initiativeUrl } from "@saleor/initiatives/urls";
import { mapEdgesToItems } from "@saleor/utils/maps";
import { score } from "fuzzaldrin";
import { IntlShape } from "react-intl";

import { QuickSearchAction, QuickSearchActionInput } from "../types";
import messages from "./messages";
import { sortScores } from "./utils";

const maxActions = 5;

export function searchInCatalog(
  search: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
  catalog: SearchCatalogQuery,
): QuickSearchAction[] {
  // const categories: QuickSearchActionInput[] = (
  //   mapEdgesToItems(catalog?.categories) || []
  // )
  //   .map<QuickSearchActionInput>(category => ({
  //     caption: intl.formatMessage(messages.category),
  //     label: category.name,
  //     onClick: () => {
  //       navigate(categoryUrl(category.id));
  //       return false;
  //     },
  //     score: score(category.name, search),
  //     text: category.name,
  //     type: "catalog",
  //   }))
  //   .sort(sortScores);
  //
  // const collections: QuickSearchActionInput[] = (
  //   mapEdgesToItems(catalog?.collections) || []
  // )
  //   .map<QuickSearchActionInput>(collection => ({
  //     caption: intl.formatMessage(messages.collection),
  //     label: collection.name,
  //     onClick: () => {
  //       navigate(collectionUrl(collection.id));
  //       return false;
  //     },
  //     score: score(collection.name, search),
  //     text: collection.name,
  //     type: "catalog",
  //   }))
  //   .sort(sortScores);

  const initiatives: QuickSearchActionInput[] = (
    mapEdgesToItems(catalog?.initiatives) || []
  )
    .map<QuickSearchActionInput>(initiative => ({
      caption: intl.formatMessage(messages.initiative),
      // extraInfo: initiative.category.name,
      label: initiative.title,
      onClick: () => {
        navigate(initiativeUrl(initiative.id));
        return false;
      },
      score: score(initiative.title, search),
      text: initiative.title,
      type: "catalog",
    }))
    .sort(sortScores);

  const baseActions = [
    // ...categories.slice(0, 1),
    // ...collections.slice(0, 1),
    ...initiatives.slice(0, 1),
  ];

  return [
    ...baseActions,
    // ...[...categories.slice(1), ...collections.slice(1), ...initiatives.slice(1)]
    ...[...initiatives.slice(1)]
      .sort(sortScores)
      .slice(0, maxActions - baseActions.length),
  ].sort(sortScores);
}

function getCatalogModeActions(
  query: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
  catalog: SearchCatalogQuery,
): QuickSearchAction[] {
  return searchInCatalog(query, intl, navigate, catalog);
}

export default getCatalogModeActions;
