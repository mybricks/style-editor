import React from "react";
import classes from "./index.module.less";
import * as Tooltip from "@radix-ui/react-tooltip";

interface Props {
  title: string;
  children: React.ReactElement;
}

export default function ({ title, children }: Props) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          asChild
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={classes.tooltipContent} sideOffset={5}>
            {title}
            <Tooltip.Arrow fill="#FFF" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
