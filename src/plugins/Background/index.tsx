import React from "react";
import Panel from "../../components/Panel";
import { StylePluginProps } from "../../types";
import ColorEditor from "../../components/ColorEditor";

const BackgroundPlugin = ({ value, onChange }: StylePluginProps) => {
  return (
    <Panel title="背景">
      <ColorEditor
        // @ts-ignore
        value={value?.backgroundColor || "rgba(255, 255, 255, 0)"}
        onChange={(color) => {
          onChange({ backgroundColor: color });
        }}
      />
    </Panel>
  );
};

export default BackgroundPlugin;
