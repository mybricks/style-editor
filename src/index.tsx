import React, { CSSProperties, useMemo } from "react";
import "./index.less";
import pkg from '../package.json';
import { StyleEditorProps, StylePlugin } from "./types";
import BackgroundPlugin from "./plugins/Background";
import BorderPlugin from "./plugins/Border";
import FontPlugin from "./plugins/Font";
import PaddingPlugin from "./plugins/Padding";

console.log(`%c ${pkg.name} %c@${pkg.version}`,`color:#FFF;background:#fa6400`,``,``)

const StyleEditor = ({
  value,
  customComponents,
  options,
  onChange,
}: StyleEditorProps) => {
  const onValueChange = (changedValue: CSSProperties) => {
    onChange({ ...value, ...changedValue });
  };

  const plugins = useMemo(() => {
    if (Array.isArray(options)) {
      // @ts-ignore
      // 'border', 'font', 'bgcolor', 'bgimage', 'padding'
      options = options.map((option) => option.toLowerCase());
      // @ts-ignore
      if (options.includes("bgcolor") || options.includes("bgimage")) {
        // @ts-ignore
        const index = options.indexOf("bgcolor") || options.indexOf("bgimage");
        // @ts-ignore
        options.splice(index, 0, "background");
      }
      // 旧版API兼容
      return options;
    } else {
      // 新版API
      if (options.uses) return options.uses;
      else if (options.plugins) return options.plugins;
    }
  }, [options]);

  const renderPlugin = (plugin: StylePlugin) => {
    const { backgroundOptions = {} } = options as Record<string, any>;

    if (Array.isArray(plugins)) {
      // @ts-ignore
      if (plugins.includes("bgcolor")) {
        backgroundOptions.backgroundColor = true;
      }
      // @ts-ignore
      if (plugins.includes("bgimage")) {
        backgroundOptions.backgroundImage = true;
      }
    }

    if (!Array.isArray(options)) {
      backgroundOptions.backgroundColor = true;
      backgroundOptions.backgroundImage = true;
    }

    switch (plugin) {
      case "background":
        // @ts-ignore
        return (
          <BackgroundPlugin
            key={plugin}
            customComponents={customComponents}
            // @ts-ignore
            options={backgroundOptions || {}}
            value={value}
            onChange={onValueChange}
          />
        );
      case "border":
        // @ts-ignore
        return (
          <BorderPlugin
            key={plugin}
            // @ts-ignore
            borderProps={options?.borderProps || {}}
            value={value}
            onChange={onValueChange}
          />
        );
      case "font":
        return (
          <FontPlugin key={plugin} value={value} onChange={onValueChange} />
        );
      case "padding":
        return (
          <PaddingPlugin key={plugin} value={value} onChange={onValueChange} />
        );
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
