import classNames from "classnames";
import React, { CSSProperties, useRef, useState } from "react";
import styles from "./index.module.less";

interface Props {
  className?: string;
  defaultValue?: string;
  value: string;
  addonBefore?: JSX.Element;
  disabled?: boolean;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function ({
  className,
  defaultValue,
  value,
  disabled,
  addonBefore,
  style,
  innerStyle,
  onChange,
  onBlur,
  onFocus,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classNames(styles.input, className)} style={style}>
      {addonBefore ? <label>{addonBefore}</label> : null}
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        style={{ width: addonBefore ? 39 : 69, ...innerStyle }}
        onFocus={(e) => {
          onFocus && onFocus(e);
          inputRef.current && inputRef.current.select();
        }}
        onBlur={(e) => {
          onBlur && onBlur(e.target.value);
        }}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
