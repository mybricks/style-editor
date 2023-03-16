import React, { CSSProperties } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import "./index.less";

// @ts-ignore
const SelectItem = React.forwardRef(
  //@ts-ignore
  ({ children, className, ...props }, forwardedRef) => {
    return (
      // @ts-ignore
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        //@ts-ignore
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

interface Props {
  defaultValue?: string;
  value: string;

  options: Array<{
    value: string;
    label: string;
  }>;
  style?: CSSProperties;
  onChange: (value: string) => void;
}

export default function ({
  defaultValue,
  value,
  options,
  style,
  onChange,
}: Props) {
  return (
    <Select.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChange}
    >
      <Select.Trigger className="SelectTrigger" style={style}>
        <Select.Value />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal style={{ zIndex: 10000 }}>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            {options.map((option) => (
              // @ts-ignore
              <SelectItem key={option.value} value={option?.value}>
                {option?.label}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
