import React from "react";
import { getScreen } from "./fixtures/screen";
import { screenToString } from "./util/screen";
import { createTestRenderer, settle } from "./fixtures/render";
import { RootBox } from "./fixtures/components/RootBox";

it("<box />", async () => {
  const screen = getScreen();
  const renderer = createTestRenderer(screen);
  renderer.render(
    <RootBox>
      <box
        label="child-box"
        border={{ type: "line" }}
        style={{ border: { fg: "blue" } }}
      >
        best-box
      </box>
    </RootBox>
  );
  await settle();
  expect(screenToString(screen)).toMatchSnapshot();
});

it("<list />", async () => {
  const screen = getScreen();
  const renderer = createTestRenderer(screen);
  renderer.render(
    <RootBox>
      <list
        label="child-list"
        border={{ type: "line" }}
        style={{ border: { fg: "blue" } }}
        items={["a", "b", "c", "1", "2", "3"]}
      ></list>
    </RootBox>
  );
  await settle();
  expect(screenToString(screen)).toMatchSnapshot();
});

it("<list />, long", async () => {
  const screen = getScreen();
  const renderer = createTestRenderer(screen);
  renderer.render(
    <RootBox>
      <list
        label="long-list"
        border={{ type: "line" }}
        style={{ border: { fg: "blue" } }}
        items={" "
          .repeat(30)
          .split("")
          .map((_, i) => `${i}`)}
      ></list>
    </RootBox>
  );
  await settle();
  expect(screenToString(screen)).toMatchSnapshot();
});
