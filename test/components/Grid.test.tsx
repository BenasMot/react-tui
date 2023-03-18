import React from "react";
import { createSceenContext, TestSceenContext } from "../fixtures/context";
import { Box, Grid, GridItem } from "../../";

describe("Grid", () => {
  let context: TestSceenContext;
  beforeEach(() => {
    context = createSceenContext();
  });

  it("<Grid /> - 3x3", async () => {
    const { render, RootBox, screenToString, settle } = context;
    await render(
      <RootBox>
        <Grid
          width="100%-2"
          height="100%-2"
          rows={3}
          cols={3}
          items={[...Array<any>(3)].flatMap((_: undefined, row: number) =>
            [...Array(3)].map(
              (_: undefined, col: number) =>
                ({
                  row,
                  col,
                  rowSpan: 1,
                  colSpan: 1,
                  render: (props) => (
                    <Box
                      border={{ type: "line" }}
                      style={{ border: { fg: "blue" } }}
                      {...props}
                    >
                      {`${row},${col}`}
                    </Box>
                  ),
                } as GridItem)
            )
          )}
        />
      </RootBox>
    );
    await settle();
    expect(screenToString()).toMatchSnapshot();
  });

  it("<Grid /> - 3x3 with colSpan and rowSpan", async () => {
    const { render, RootBox, screenToString, settle } = context;
    const Cell: React.FC<React.ComponentProps<typeof Box>> = (props) => (
      <Box
        {...props}
        border={{ type: "line" }}
        style={{ border: { fg: "blue" } }}
      />
    );
    await render(
      <RootBox>
        <Grid
          width="100%-2"
          height="100%-2"
          rows={3}
          cols={3}
          items={[
            {
              row: 1,
              col: 0,
              rowSpan: 1,
              colSpan: 2,
              render: (props) => <Cell {...props} children="rowspan" />,
            },
            {
              row: 0,
              col: 2,
              rowSpan: 3,
              colSpan: 1,
              render: (props) => <Cell {...props} children="colspan" />,
            },
          ]}
        />
      </RootBox>
    );
    await settle();
    expect(screenToString()).toMatchSnapshot();
  });
});
