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
  customComponents?: Record<string, Function>;
}

const BackgroundPlugin = ({
  value,
  options,
  customComponents,
  onChange,
}: Props) => {
  return (
    <Panel title="背景">
      {options?.backgroundColor && (
        <>
          {customComponents?.backgroundColor ? (
            customComponents.backgroundImage({
              value,
              onChange: (value: string) => {
                onChange({
                  backgroundColor: value,
                });
              },
            })
          ) : (
            <ColorEditor
              // @ts-ignore
              value={value?.backgroundColor || "rgba(255, 255, 255, 0)"}
              onChange={(color) => {
                onChange({ backgroundColor: color });
              }}
            />
          )}
        </>
      )}
      {options?.backgroundImage && (
        <>
          {customComponents?.backgroundImage ? (
            customComponents?.backgroundImage({
              value,
              onChange: (value: React.CSSProperties) => {
                onChange({ ...value });
              },
            })
          ) : (
            <ImageEditor
              value={value}
              onChange={(value) => {
                onChange({ ...value });
              }}
            />
          )}
        </>
      )}
    </Panel>
  );
};

export default BackgroundPlugin;
