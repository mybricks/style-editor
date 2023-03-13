import React, { CSSProperties, useRef, useState } from "react";
import classes from "./index.module.less";
import ColorPicker from "@mybricks/color-picker";
import * as Portal from "@radix-ui/react-portal";
import { transparentBg } from "./constant";

interface Props {
  value: string;
  style?: CSSProperties;
  onChange: (value: string) => void;
}

const ColorSwatch = ({ value, style, onChange }: Props) => {
  const ref = useRef<HTMLDivElement>(null),
    [showColorPicker, setShowColorPicker] = useState(false);

  const renderColorPicker = () => {
    if (!ref.current) return;
    const targetBoundingClientRect = ref.current?.getBoundingClientRect();
    const top =
      targetBoundingClientRect.top + targetBoundingClientRect.height + 5;
    const style: CSSProperties = {};
    if (window.innerHeight - top < 333) {
      style.top =
        (targetBoundingClientRect.top - 333 > 0
          ? targetBoundingClientRect.top - 333
          : 0) + "px";
    } else {
      style.top = top - 4 + "px";
    }
    style.right =
      window.innerWidth -
      targetBoundingClientRect.x -
      targetBoundingClientRect.width +
      218;

    return (
      <Portal.Root>
        {showColorPicker && (
          <div
            className={classes.popup}
            onClick={() => {
              setShowColorPicker(false);
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={style}
            >
              <ColorPicker
                color={value}
                onChange={({ hexa, rgba }) => {
                  const rgb = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

                  onChange(rgb);
                }}
              />
            </div>
          </div>
        )}
      </Portal.Root>
    );
  };

  return (
    <>
      <div
        ref={ref}
        className={classes.swatch}
        style={style}
        onClick={() => {
          setShowColorPicker(true);
        }}
      >
        <div
          className={classes.block}
          style={{
            background:
              value !== "rgba(255, 255, 255, 0)" ? value : transparentBg,
          }}
        ></div>
      </div>
      {renderColorPicker()}
    </>
  );
};

export default ColorSwatch;
