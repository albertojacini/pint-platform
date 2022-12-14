import { StockAvailability } from "@saleor/graphql";
import { createFilterStructure } from "@saleor/initiatives/components/InitiativeListPage";
import { InitiativeListUrlFilters } from "@saleor/initiatives/urls";
import { getFilterQueryParams } from "@saleor/utils/filters";
import { stringifyQs } from "@saleor/utils/urls";
import { getExistingKeys, setFilterOptsStatus } from "@test/filters";
import { config } from "@test/intl";
import { createIntl } from "react-intl";

import { getFilterQueryParam, getFilterVariables } from "./filters";
import { initiativeListFilterOpts } from "./fixtures";

describe("Filtering query params", () => {
  it("should be empty object if no params given", () => {
    const params: InitiativeListUrlFilters = {};
    const filterVariables = getFilterVariables(params, undefined);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it("should not be empty object if params given", () => {
    const params: InitiativeListUrlFilters = {
      priceFrom: "10",
      priceTo: "20",
      status: true.toString(),
      stockStatus: StockAvailability.IN_STOCK,
    };
    const filterVariables = getFilterVariables(params, true);

    expect(getExistingKeys(filterVariables)).toHaveLength(2);
  });
});

describe("Filtering URL params", () => {
  const intl = createIntl(config);

  const filters = createFilterStructure(intl, initiativeListFilterOpts);

  it("should be empty if no active filters", () => {
    const filterQueryParams = getFilterQueryParams(
      filters,
      getFilterQueryParam,
    );

    expect(getExistingKeys(filterQueryParams)).toHaveLength(0);
  });

  it("should not be empty if active filters are present", () => {
    const filterQueryParams = getFilterQueryParams(
      setFilterOptsStatus(filters, true),
      getFilterQueryParam,
    );

    expect(filterQueryParams).toMatchSnapshot();
    expect(stringifyQs(filterQueryParams)).toMatchSnapshot();
  });
});
