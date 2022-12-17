import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { getArrayQueryParam } from "@saleor/utils/urls";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  initiativeAddPath,
  InitiativeCreateUrlQueryParams,
  initiativeImagePath,
  InitiativeImageUrlQueryParams,
  initiativeListPath,
  InitiativeListUrlQueryParams,
  InitiativeListUrlSortField,
  initiativePath,
  InitiativeUrlQueryParams,
  // initiativeVariantAddPath,
  // InitiativeVariantAddUrlQueryParams,
  // initiativeVariantEditPath,
  // InitiativeVariantEditUrlQueryParams,
} from "./urls";
import InitiativeCreateComponent from "./views/InitiativeCreate";
import InitiativeImageComponent from "./views/InitiativeImage";
import InitiativeListComponent from "./views/InitiativeList";
import InitiativeUpdateComponent from "./views/InitiativeUpdate";
// import InitiativeVariantComponent from "./views/InitiativeVariant";
// import InitiativeVariantCreateComponent from "./views/InitiativeVariantCreate";

const InitiativeList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: InitiativeListUrlQueryParams = asSortParams(
    {
      ...qs,
      categories: getArrayQueryParam(qs.categories),
      collections: getArrayQueryParam(qs.collections),
      ids: getArrayQueryParam(qs.ids),
      initiativeTypes: getArrayQueryParam(qs.initiativeTypes),
      initiativeKind: qs.initiativeKind,
    },
    InitiativeListUrlSortField,
  );

  return <InitiativeListComponent params={params} />;
};

const InitiativeUpdate: React.FC<RouteComponentProps<any>> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: InitiativeUrlQueryParams = qs;

  return (
    <InitiativeUpdateComponent
      id={decodeURIComponent(match.params.id)}
      params={{
        ...params,
        ids: getArrayQueryParam(qs.ids),
      }}
    />
  );
};

const InitiativeCreate: React.FC<RouteComponentProps<any>> = () => {
  const qs = parseQs(location.search.substr(1));
  const params: InitiativeCreateUrlQueryParams = qs;

  return <InitiativeCreateComponent params={params} />;
};

// const InitiativeVariant: React.FC<RouteComponentProps<any>> = ({ match }) => {
//   const qs = parseQs(location.search.substr(1));
//   const params: InitiativeVariantEditUrlQueryParams = qs;
//
//   return (
//     <InitiativeVariantComponent
//       variantId={decodeURIComponent(match.params.variantId)}
//       initiativeId={decodeURIComponent(match.params.initiativeId)}
//       params={params}
//     />
//   );
// };

const InitiativeImage: React.FC<RouteComponentProps<any>> = ({
  location,
  match,
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: InitiativeImageUrlQueryParams = qs;

  return (
    <InitiativeImageComponent
      mediaId={decodeURIComponent(match.params.imageId)}
      initiativeId={decodeURIComponent(match.params.initiativeId)}
      params={params}
    />
  );
};

// const InitiativeVariantCreate: React.FC<RouteComponentProps<any>> = ({
//   match,
// }) => {
//   const qs = parseQs(location.search.substr(1));
//   const params: InitiativeVariantAddUrlQueryParams = qs;
//
//   return (
//     <InitiativeVariantCreateComponent
//       initiativeId={decodeURIComponent(match.params.id)}
//       params={params}
//     />
//   );
// };

const Component = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.initiatives)} />
      <Switch>
        <Route exact path={initiativeListPath} component={InitiativeList} />
        <Route exact path={initiativeAddPath} component={InitiativeCreate} />
        {/*<Route*/}
        {/*  exact*/}
        {/*  path={initiativeVariantAddPath(":id")}*/}
        {/*  component={InitiativeVariantCreate}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path={initiativeVariantEditPath(":initiativeId", ":variantId")}*/}
        {/*  component={InitiativeVariant}*/}
        {/*/>*/}
        <Route
          path={initiativeImagePath(":initiativeId", ":imageId")}
          component={InitiativeImage}
        />
        <Route path={initiativePath(":id")} component={InitiativeUpdate} />
      </Switch>
    </>
  );
};

export default Component;
