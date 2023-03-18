import React from "react";
import { createSceenContext, TestSceenContext } from "./fixtures/context";
import { Widgets } from "neo-blessed";

describe("hooks", () => {
  let context: TestSceenContext;
  beforeEach(() => {
    context = createSceenContext();
  });

  it("hooks - useRef", async () => {
    const { render, RootBox, settle } = context;
    let testRef: React.RefObject<any>;
    const RefTester: React.FC = () => {
      const ref = React.useRef<Widgets.ButtonElement>(null);
      testRef = ref;
      return <RootBox ref={ref} children="use-ref-test" />;
    };
    await render(<RefTester />);
    await settle();
    expect(testRef!.current).toBeTruthy();
  });

  it("not-hooks :) - createRef", async () => {
    const { render, RootBox, settle, screenToString } = context;
    let testRef: React.RefObject<any>;
    class RefTester extends React.PureComponent {
      private ref: React.RefObject<any>;
      constructor(props: any) {
        super(props);
        this.ref = React.createRef();
        testRef = this.ref;
      }
      render() {
        return <RootBox ref={this.ref} children="use-ref-test" />;
      }
    }
    await render(<RefTester />);
    await settle();
    expect(screenToString()).toMatchSnapshot();
    expect(testRef!.current).toBeTruthy(); // @todo fail! :(
  });
});
