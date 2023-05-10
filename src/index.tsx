import React, { CSSProperties, useMemo } from "react";
import "./index.less";
import pkg from "../package.json";
import { StyleEditorProps, StylePlugin } from "./types";
import BackgroundPlugin from "./plugins/Background";
import BorderPlugin from "./plugins/Border";
import FontPlugin from "./plugins/Font";
import PaddingPlugin from "./plugins/Padding";
import SizePlugin from "./plugins/Size";

console.log(
  `%c ${pkg.name} %c@${pkg.version}`,
  `color:#FFF;background:#fa6400`,
  ``,
  ``
);

const StyleEditor = ({
  value,
  customComponents,
  options = ["font", "border", "background", "padding", "size"],
  onChange,
}: StyleEditorProps) => {
  const onValueChange = (changedValue: CSSProperties) => {
    onChange({ ...value, ...changedValue });
  };

  const plugins = useMemo(() => {
    let plugins;
    if (Array.isArray(options)) {
      plugins = options;
    } else {
      plugins = options.uses || options.plugins;
    }
    plugins = plugins.map((item) => item.toLowerCase());

    if (
      plugins.indexOf("bgcolor") !== -1 ||
      plugins.indexOf("bgimage") !== -1
    ) {
      plugins.push("background");
    }
    return plugins;
  }, [options]);

  const renderPlugin = (plugin: StylePlugin) => {
    const {
      backgroundOptions = {},
      fontOptions = {},
      borderOptions = {},
    } = options as Record<string, any>;

    // 兼容旧版本
    if (plugins.includes("bgcolor") && !plugins.includes("bgimage")) {
      backgroundOptions.backgroundColor = true;
      backgroundOptions.backgroundImage = false;
    } else if (!plugins.includes("bgcolor") && plugins.includes("bgimage")) {
      backgroundOptions.backgroundColor = false;
      backgroundOptions.backgroundImage = true;
    } else {
      backgroundOptions.backgroundColor = true;
      backgroundOptions.backgroundImage = true;
    }

    switch (plugin) {
      case "background":
        return (
          <BackgroundPlugin
            key={plugin}
            customComponents={customComponents}
            options={backgroundOptions || {}}
            value={value}
            onChange={onValueChange}
          />
        );
      case "border":
        return (
          <BorderPlugin
            key={plugin}
            borderOptions={borderOptions || {}}
            value={value}
            onChange={onValueChange}
          />
        );
      case "font":
        return (
          <FontPlugin
            key={plugin}
            value={value}
            onChange={onValueChange}
            fontOptions={fontOptions}
          />
        );
      case "padding":
        return (
          <PaddingPlugin key={plugin} value={value} onChange={onValueChange} />
        );
      // case "size":
      //   return (
      //     <SizePlugin key={plugin} value={value} onChange={onValueChange} />
      //   );
    }
  };

  return (
    <div className="styleEditor">
      <div style={{ display: "flex", flexDirection: "column" }}>
        {
          //@ts-ignore
          plugins?.map((plugin) => renderPlugin(plugin))
        }
      </div>
    </div>
  );
};

export default StyleEditor;
