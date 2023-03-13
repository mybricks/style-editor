import { CSSProperties } from "react";

export type StylePlugin = "background" | "border" | "padding" | "font";

export interface StyleEditorProps {
  options: {
    presets: [];
    plugins: StylePlugin[];
    borderProps?: {
      borderColor: boolean;
      borderRadius: boolean;
      borderWidth: boolean;
    };
  };
  value: CSSProperties;
  onChange: (value: CSSProperties) => void;
}

export interface StylePluginProps {
  value: CSSProperties;
  onChange: (value: CSSProperties) => void;
}
