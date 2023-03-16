import React, { ReactElement } from "react";
import Panel from "../../components/Panel";
import { StylePluginProps } from "../../types";
import ColorEditor from "../../components/ColorEditor";
import ImageEditor from "../../components/ImageEditor";

interface Props extends StylePluginProps {
  options?: {
    backgroundImage?: boolean;
    backgroundColor?: boolean;
  };
}

const BackgroundPlugin = ({ value, options, onChange }: Props) => {
  return (
    <Panel title="背景">
      {options?.backgroundColor && (
        <ColorEditor
          // @ts-ignore
          value={value?.backgroundColor || "rgba(255, 255, 255, 0)"}
          onChange={(color) => {
            onChange({ backgroundColor: color });
          }}
        />
      )}
      {options?.backgroundImage && (
        <ImageEditor
          value={value}
          onChange={(value) => {
            console.log("value", value);
            onChange({ ...value });
          }}
        />
      )}
    </Panel>
  );
};

export default BackgroundPlugin;
