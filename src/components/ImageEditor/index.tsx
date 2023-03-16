import React, { CSSProperties, useMemo, useRef, useState } from "react";
import classes from "./index.module.less";
import * as Portal from "@radix-ui/react-portal";
import {
  backgroundPositionOptions,
  backgroundRepeatOptions,
  backgroundSizeOptions,
  defaultImage,
} from "./constant";
import { file2Base64, getBackgroundImage } from "./utils";
import Select from "../Select";

interface Props {
  value: CSSProperties;
  onChange: (value: CSSProperties) => void;
}

export default function ({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const swatchRef = useRef<HTMLDivElement>(null);

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);

  const onChooseImage = (e: React.MouseEvent) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!e.target.files) return;
    const file = e.target.files[0],
      base64 = await file2Base64(file);

    onChange({
      backgroundImage: `url(${base64})`,
    });
  };

  const renderImagePicker = () => {
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
        {showImagePicker && (
          <div
            className={classes.popup}
            onClick={() => {
              setShowImagePicker(false);
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={style}
            >
              <div className={classes.imageSelector}>
                <div
                  style={{
                    position: "relative",
                  }}
                  onMouseEnter={() => setShowImageSelector(true)}
                  onMouseLeave={() => setShowImageSelector(false)}
                >
                  <img
                    style={{ width: 216, height: 154, objectFit: "contain" }}
                    src={
                      /\url\s*\(\s*["']?([^"'\r\n\)\(]+)["']?\s*\)/gi.exec(
                        value?.backgroundImage || ""
                      )?.[1] || defaultImage
                    }
                  />
                  <div
                    className={classes.chooseImage}
                    style={{
                      opacity: showImageSelector ? 1 : 0,
                    }}
                  >
                    <>
                      <button onClick={onChooseImage}>选择图片...</button>
                      <input
                        ref={inputRef}
                        type="file"
                        accept="image"
                        onChange={onImageChange}
                        style={{ display: "none" }}
                      />
                    </>
                  </div>
                </div>
                <div className={classes.backgroundOptions}>
                  <div>平铺</div>
                  <Select
                    style={{
                      height: 30,
                      borderRadius: 4,
                      backgroundColor: "#EFEFEF",
                    }}
                    value={value.backgroundRepeat || "no-repeat"}
                    options={backgroundRepeatOptions}
                    onChange={(value) => {
                      onChange({ backgroundRepeat: value });
                    }}
                  />
                </div>
                <div className={classes.backgroundOptions}>
                  <div>位置</div>
                  <Select
                    style={{
                      height: 30,
                      borderRadius: 4,
                      backgroundColor: "#EFEFEF",
                    }}
                    // @ts-ignore
                    value={value.backgroundPosition || "center top"}
                    options={backgroundPositionOptions}
                    onChange={(value) => {
                      onChange({ backgroundPosition: value });
                    }}
                  />
                </div>
                <div className={classes.backgroundOptions}>
                  <div>大小</div>
                  <Select
                    style={{
                      height: 30,
                      borderRadius: 4,
                      backgroundColor: "#EFEFEF",
                    }}
                    // @ts-ignore
                    value={value?.backgroundSize || "100% 100%"}
                    options={backgroundSizeOptions}
                    onChange={(value) => {
                      onChange({ backgroundSize: value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Portal.Root>
    );
  };

  return (
    <div className={classes.imageEditor} ref={ref}>
      <div
        className={classes.swatch}
        ref={swatchRef}
        onClick={() => setShowImagePicker(!showImagePicker)}
      >
        <img
          className={classes.block}
          src={
            /\url\s*\(\s*["']?([^"'\r\n\)\(]+)["']?\s*\)/gi.exec(
              value?.backgroundImage || ""
            )?.[1] || defaultImage
          }
        />
      </div>
      <div className={classes.image}>图片</div>
      {renderImagePicker()}
    </div>
  );
}
