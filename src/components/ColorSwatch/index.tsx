import React, { CSSProperties, useRef, useState } from "react";
import classes from "./index.module.less";
import ColorPicker from "@mybricks/color-picker";
import * as Portal from "@radix-ui/react-portal";
import { transparentBg } from "./constant";
import Input from "../Input";
import Color from "color";

interface Props {
  value: string;
  style?: CSSProperties;
  onChange: (value: string) => void;
}

const getHex = (str: string) => {
  const color = new Color(str);
  if (color.alpha() === 1) {
    return color.hex();
  } else {
    return color.hexa();
  }
};

const getAlpha = (color: string) => new Color(color).alpha();

const ColorSwatch = ({ value, style, onChange }: Props) => {
  const ref = useRef<HTMLDivElement>(null),
    [color, setColor] = useState(getHex(value)),
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
                onChange={({ hexa, hex, rgba }) => {
                  const alpha = rgba.a;

                  if (alpha === 1) {
                    setColor(hex);
                    onChange(hex);
                  } else {
                    setColor(hexa);
                    onChange(hexa);
                  }
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
      <div ref={ref} className={classes.swatch} style={style}>
        <Input
          className={classes.input}
          maxLength={9}
          value={color}
          onChange={(value) => setColor(value)}
          onBlur={() => {
            const hex = new Color(color).hex();
            onChange(hex);
          }}
        />
        <div
          className={classes.block}
          style={{
            background: getAlpha(value) !== 0 ? value : transparentBg,
          }}
          onClick={() => {
            setShowColorPicker(true);
          }}
        ></div>
      </div>
      {renderColorPicker()}
    </>
  );
};

export default ColorSwatch;
