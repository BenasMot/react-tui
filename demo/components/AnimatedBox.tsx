import React from "react";
import { Box } from "@benas_mot/react-tui";

export function AnimatedBox(props: {
  width?: string;
  height?: string;
  time?: number;
  initialPosition?: number;
}) {
  const [position, setPosition] = React.useState(props.initialPosition || 0);
  const [dir, setDir] = React.useState(true);

  React.useEffect(() => {
    const iv = setInterval(() => {
      const newDirection = position === (dir ? 90 : 0) ? !dir : dir;
      setDir(newDirection);
      const newPosition = newDirection ? position + 1 : position - 1;
      setPosition(newPosition);
    }, props.time || 33.333333);
    return () => clearInterval(iv);
  });

  return (
    <Box
      border={{ type: "line" }}
      height={props.height || "40%"}
      left={position + "%"}
      style={{ bg: "cyan", border: { fg: "blue" } }}
      top="center"
      width={props.width || "10%"}
    />
  );
}
