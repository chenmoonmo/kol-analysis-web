"use client";

import { Tooltip, Text } from "@radix-ui/themes";
import { memo, useMemo } from "react";

export const EllipsisName = memo(({ children }: { children: string }) => {
  const ellipsisdText = useMemo(() => {
    if (!children) return "";
    if (children.includes("/")) {
      return children
        .split("/")
        .map((item) => (item.length > 10 ? item.slice(0, 10) + "..." : item))
        .join("/");
    } else {
      return children.length > 10 ? children.slice(0, 10) + "..." : children;
    }
  }, [children]);

  return (
    <Tooltip content={children}>
      <Text>{ellipsisdText}</Text>
    </Tooltip>
  );
});

EllipsisName.displayName = "EllipsisName";
