import React, { CSSProperties, useRef, useState } from "react";
import Input from "../Input";
import classes from "./index.module.less";
import ColorPicker from "@mybricks/color-picker";
import * as Portal from "@radix-ui/react-portal";
import { ReactComponent as Unbinding } from "../../assets/unbinding.svg";
import { getHex, checkColorType } from "./utils";
import { transparentBg } from "./constant";
import Color from "color";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ({ value, onChange }: Props) {
  const [hex, setHex] = useState(new Color(value).hex().toLowerCase()),
    [alpha, setAlpha] = useState(`${new Color(value).alpha() * 100}%`);

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
                onChange={(props) => {
                  const { hexa, rgba, hex } = props;
                  setHex(hex);
                  let alpha = parseInt(String(rgba.a * 100));
                  if (alpha < 0) alpha = 0;
                  if (alpha > 100) alpha = 100;
                  setAlpha(`${alpha}%`);
                  if (alpha === 100) {
                    onChange(hex);
                  } else {
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
                  parseInt(alpha) !== 0 ? getHex(hex, alpha) : transparentBg,
              }}
            ></div>
          </div>
          <Input
            value={hex}
            onBlur={(val) => {
              if (!val.startsWith("#")) {
                val = `#${val}`;
              }
              let hex;
              try {
                hex = new Color(val).hex().toLowerCase();
              } catch (e) {
                console.log(e);
                hex = new Color("#ffffff").hex().toLowerCase();
              }
              setHex(hex);
              const newColor = getHex(hex, alpha);

              // 值为默认值 transparent，且新值还是默认值，表示未改变颜色，不触发onChange
              if (value === "transparent" && newColor === "#00000000") {
                return;
              }

              onChange(newColor);
            }}
          />
          <Input
            value={alpha}
            onBlur={(val) => {
              let alpha = parseInt(val);
              if (alpha < 0) alpha = 0;
              if (alpha > 100) alpha = 100;
              setAlpha(`${alpha}%`);
              const newColor = getHex(hex, `${alpha}%`);

              // 值为默认值 transparent，且新值还是默认值，表示未改变颜色，不触发onChange
              if (value === "transparent" && newColor === "#00000000") {
                return;
              }

              onChange(newColor);
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
