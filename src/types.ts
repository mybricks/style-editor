import { CSSProperties } from "react";

export type StylePlugin = "background" | "border" | "padding" | "font";

export interface StyleEditorProps {
  options:
    | StylePlugin[]
    | {
        presets: [];
        uses: StylePlugin[];
        plugins: StylePlugin[];
        backgroundProps?: {};
      };
  value: CSSProperties;
  onChange: (value: CSSProperties) => void;
}

export interface StylePluginProps {
  value: CSSProperties;
  onChange: (value: CSSProperties) => void;
}
