import React from "react";
import { getScreen } from "./fixtures/screen";
import { screenToString } from "./util/screen";
import { createTestRenderer, settle } from "./fixtures/render";
import { RootBox } from "./fixtures/components/RootBox";

it("<box /> updates", async () => {
  const screen = getScreen();
  const renderer = createTestRenderer(screen);
  const firstProps = {
    label: "first-label",
    border: { type: "line" },
  };
  const secondProps = {
    label: "second-label",
    border: { type: "bg", ch: "@" },
  };
  let setIsBoxVisible: any = () => null;
  let setProps: any = () => null;
  const UpdatingStyleBox = () => {
    const [props, _setProps] = React.useState(firstProps);
    const [isBoxVisible, _setIsBoxVisible] = React.useState(true);
    setIsBoxVisible = _setIsBoxVisible;
    setProps = _setProps; // gross.
    return <RootBox>{isBoxVisible && <box {...props} />}</RootBox>;
  };
  renderer.render(<UpdatingStyleBox />);
  // assert first paint OK
  await settle();
  expect(screenToString(screen)).toMatchSnapshot();
  // update props, assert second paint OK
  setProps(secondProps);
  await settle();
  expect(screenToString(screen)).toMatchSnapshot();
  // hide content, assert third paint OK
  setIsBoxVisible(false);
  await settle();
  expect(screenToString(screen)).toMatchSnapshot();
});
