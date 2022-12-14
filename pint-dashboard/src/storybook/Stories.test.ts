import createGenerateClassName from "@material-ui/styles/createGenerateClassName";
import initStoryshots from "@storybook/addon-storyshots";
// tslint:disable no-submodule-imports
import { configure, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import { mockRandomForEach } from "jest-mock-random";
import React from "react";

// Fixes useLayoutEffect warnings
React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });

jest.mock("@material-ui/styles/createGenerateClassName");
(createGenerateClassName as any).mockImplementation(() => (rule, stylesheet) =>
  [stylesheet.options.meta, rule.key, "id"].join("-"),
);

initStoryshots({
  configPath: "src/storybook/",
  test({ story }) {
    mockRandomForEach(
      Array.from(Array(25).keys()).map(x => parseFloat(`0.${x + 1}`)),
    );

    const result = render(story.render() as any);
    expect(toJSON(result)).toMatchSnapshot();
  },
});
