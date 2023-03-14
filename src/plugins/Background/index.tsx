import React, { ReactElement } from "react";
import Panel from "../../components/Panel";
import { StylePluginProps } from "../../types";
import ColorEditor from "../../components/ColorEditor";

interface Props extends StylePluginProps {
  backgroundProps?: {
    backgroundImage?: ReactElement;
  };
}

const BackgroundPlugin = ({ value, backgroundProps, onChange }: Props) => {
  return (
    <Panel title="背景">
      <ColorEditor
        // @ts-ignore
        value={value?.backgroundColor || "rgba(255, 255, 255, 0)"}
        onChange={(color) => {
          onChange({ backgroundColor: color });
        }}
      />
      {Object.keys(backgroundProps || {})
        // @ts-ignore
        .filter((key) => typeof backgroundProps[key] === "function")
        .map((key) => {
          // @ts-ignore
          const Component = backgroundProps[key];
          return (
            <Panel.Content>
              {
                // @ts-ignore
                <Component value={value[key]} onChange={onChange} />
              }
            </Panel.Content>
          );
        })}
    </Panel>
  );
};

export default BackgroundPlugin;
