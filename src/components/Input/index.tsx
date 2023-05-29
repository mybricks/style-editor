import classNames from "classnames";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import Color from "color";

interface Props {
  className?: string;
  defaultValue?: string;
  value: string;
  addonBefore?: JSX.Element;
  disabled?: boolean;
  maxLength?: number;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function ({
  className,
  defaultValue,
  value: inputValue,
  disabled,
  maxLength,
  addonBefore,
  style,
  innerStyle,
  onChange = () => {},
  onBlur,
  onFocus,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  return (
    <div className={classNames(styles.input, className)} style={style}>
      {addonBefore ? <label>{addonBefore}</label> : null}
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        style={{ width: addonBefore ? 39 : 69, ...innerStyle }}
        maxLength={maxLength}
        onFocus={(e) => {
          onFocus?.(e);
          inputRef.current && inputRef.current.select();
        }}
        onBlur={(e) => {
          setValue(e.target.value);
          onBlur?.(e.target.value);
        }}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
}
