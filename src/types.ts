import { CSSProperties } from "react";

export type StylePlugin = "background" | "border" | "padding" | "font";

export interface StyleEditorProps {
  options:
    | StylePlugin[]
    | {
        presets: [];
        uses: StylePlugin[];
        plugins: StylePlugin[];
        backgroundOptions?: {};
        fontOptions?: {};
      };
  value: CSSProperties;
  customComponents?: Record<string, Function>;
  onChange: (value: CSSProperties) => void;
}

export interface StylePluginProps {
  value: CSSProperties;
  onChange: (value: CSSProperties) => void;
}
