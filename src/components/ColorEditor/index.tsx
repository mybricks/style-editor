import React, { CSSProperties, useRef, useState } from "react";
import Input from "../Input";
import classes from "./index.module.less";
import ColorPicker from "@mybricks/color-picker";
import * as Portal from "@radix-ui/react-portal";
import { ReactComponent as Unbinding } from "../../assets/unbinding.svg";
import { getHex, toRgba, checkColorType } from "./utils";
import { transparentBg } from "./constant";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ({ value, onChange }: Props) {
  const [hex, setHex] = useState(getHex(value).hex),
    [alpha, setAlpha] = useState(getHex(value).alpha);

  const ref = useRef<HTMLDivElement>(null);
  const swatchRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

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
                  const { hex, alpha } = getHex(rgb);
                  setHex(hex);
                  setAlpha(alpha);
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
      <div ref={ref} className={classes.colorEditor}>
        <div className={classes.content}>
          <div
            ref={swatchRef}
            className={classes.swatch}
            onClick={() => {
              setShowColorPicker(true);
            }}
          >
            <div
              className={classes.block}
              style={{
                background:
                  parseInt(alpha) !== 0 ? toRgba(hex, alpha) : transparentBg,
              }}
            ></div>
          </div>
          <Input
            value={hex}
            onChange={(value) => {
              if (value.length > 7) value = value.slice(0, 7);
              setHex(value);
            }}
            onBlur={(value) => {
              if (value.length > 7) value = value.slice(0, 7);
              setHex(value);
              onChange(toRgba(value, alpha));
            }}
          />
          <Input
            value={alpha}
            onChange={(value) => {
              setAlpha(value);
            }}
            onBlur={(value) => {
              let alpha = parseInt(value);
              if (alpha < 0) alpha = 0;
              if (alpha > 100) alpha = 100;
              onChange(toRgba(hex, alpha));
            }}
          />
        </div>
        <div className={classes.extra}>
          <Unbinding />
        </div>
      </div>
      {renderColorPicker()}
    </>
  );
}
