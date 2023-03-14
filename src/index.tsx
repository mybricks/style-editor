import React, { CSSProperties } from "react";
import "./index.less";
import { StyleEditorProps, StylePlugin } from "./types";
import BackgroundPlugin from "./plugins/Background";
import BorderPlugin from "./plugins/Border";
import FontPlugin from "./plugins/Font";
import PaddingPlugin from "./plugins/Padding";

const StyleEditor = ({ options, value, onChange }: StyleEditorProps) => {
  const onValueChange = (changedValue: CSSProperties) => {
    onChange({ ...value, ...changedValue });
  };

  const renderPlugin = (plugin: StylePlugin) => {
    switch (plugin) {
      case "background":
        // @ts-ignore
        return (
          <BackgroundPlugin
            backgroundProps={options?.backgroundProps || {}}
            value={value}
            onChange={onValueChange}
          />
        );
      case "border":
        // @ts-ignore
        return (
          <BorderPlugin
            // @ts-ignore
            borderProps={options?.borderProps || {}}
            value={value}
            onChange={onValueChange}
          />
        );
      case "font":
        return <FontPlugin value={value} onChange={onValueChange} />;
      case "padding":
        return <PaddingPlugin value={value} onChange={onValueChange} />;
    }
  };

  return (
    <div className="styleEditor">
      <div style={{ display: "flex", flexDirection: "column" }}>
        {options?.plugins?.map((plugin) => renderPlugin(plugin))}
      </div>
    </div>
  );
};

export default StyleEditor;
