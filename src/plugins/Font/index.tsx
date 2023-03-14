import React from "react";
import classes from "./index.module.less";
import Panel from "../../components/Panel";
import { StylePluginProps } from "../../types";
import Select from "../../components/Select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import IconTextAlignLeft from "./icons/IconTextAlignLeft";
import IconTextAlignCenter from "./icons/IconTextAlignCenter";
import IconTextAlignRight from "./icons/IconTextAlignRight";
import Input from "../../components/Input";
import IconLineHeight from "./icons/IconLineHeight";
import classNames from "classnames";
import IconTextDecorationNone from "./icons/IconTextDecorationNone";
import IconTextDecorationLineThrough from "./icons/IconTextDecorationLineThrough";
import IconTextDecorationUnderline from "./icons/IconTextDecorationUnderline";
import IconLetterSpacing from "./icons/IconLetterSpacing";
import ColorSwatch from "../../components/ColorSwatch";
import { fontWeigthOptions } from "./constant";
import IconFontSize from "./icons/IconFontSize";
import Tooltip from "../../components/Tooltip";

interface Props extends StylePluginProps {
  fontProps?: {
    fontFamily?: boolean;
    fontSize?: boolean;
    fontWeight?: boolean;
    lineHeight?: boolean;
  };
}

const textAlignOptions = ["left", "center", "right"],
  textDecorationOptions = ["none", "line-through", "underline"];

const FontPlugin = ({ value, onChange }: Props) => {
  const onPropertyChange = (property: string, value: string) => {
    // @ts-ignore
    if (Number.isNaN(parseInt(value))) value = "0px";
    onChange({ [property]: parseInt(value) + "px" });
  };

  return (
    <Panel title="字体" className={classes.fontPlugin}>
      <Panel.Content>
        <Select
          style={{
            flex: 1,
            height: 30,
            borderRadius: 4,
            backgroundColor: "#EFEFEF",
          }}
          options={[
            {
              label: "默认字体",
              value: "",
            },
            {
              label: "DIN",
              value: "din",
            },
          ]}
          // @ts-ignore
          value={value?.fontFamily || ""}
          onChange={(value) => onChange({ fontFamily: value })}
        />
        <Tooltip title="字体颜色">
          <div>
            <ColorSwatch
              value={value?.color || "#000000"}
              style={{
                marginLeft: 6,
                backgroundColor: "#EFEFEF",
                borderRadius: 4,
              }}
              onChange={(value) => onChange({ color: value })}
            />
          </div>
        </Tooltip>
      </Panel.Content>
      <Panel.Content>
        <Select
          style={{
            width: "100%",
            height: 30,
            borderRadius: 4,
            backgroundColor: "#EFEFEF",
          }}
          options={fontWeigthOptions}
          // @ts-ignore
          value={value?.fontWeight ? `${value?.fontWeight}` : ""}
          onChange={(value) => onPropertyChange("fontWeight", value)}
        />
        <Input
          addonBefore={
            <Tooltip title="字体大小">
              <div>
                <IconFontSize />
              </div>
            </Tooltip>
          }
          className={classes.fontSize}
          // @ts-ignore
          value={parseInt(value?.fontSize || "12px")}
          onChange={(value) => onPropertyChange("fontSize", value)}
        />
      </Panel.Content>
      <Panel.Content>
        <Input
          className={classes.lineHeight}
          addonBefore={
            <Tooltip title="行高">
              <div>
                <IconLineHeight />
              </div>
            </Tooltip>
          }
          // @ts-ignore
          value={parseInt(value?.lineHeight || "0px")}
          // @ts-ignore
          onChange={(value) => onPropertyChange("lineHeight", value)}
        />
        <Input
          className={classes.letterSpacing}
          addonBefore={
            <Tooltip title="字间距">
              <div>
                <IconLetterSpacing />
              </div>
            </Tooltip>
          }
          // @ts-ignore
          value={parseInt(value?.letterSpacing || "0px")}
          // @ts-ignore
          onChange={(value) => onPropertyChange("letterSpacing", value)}
        />
      </Panel.Content>
      <Panel.Content>
        <ToggleGroup.Root
          className={classes.textAlignGroup}
          type="single"
          value={value?.textAlign || "left"}
          // @ts-ignore
          onValueChange={(value) => {
            // @ts-ignore
            value && onChange({ textAlign: value });
          }}
        >
          {textAlignOptions.map((textAlign) => (
            <ToggleGroup.Item
              key={textAlign}
              className={classNames(
                classes.textAlignItem,
                (value?.textAlign || "left") === textAlign
                  ? classes.active
                  : null
              )}
              value={textAlign}
            >
              {renderTextAlignIcon(textAlign)}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
        <ToggleGroup.Root
          className={classes.textDecorationGroup}
          type="single"
          // @ts-ignore
          value={value?.textDecoration || "none"}
          // @ts-ignore
          onValueChange={(value) => {
            value && onChange({ textDecoration: value });
          }}
        >
          {textDecorationOptions.map((textDecoration) => (
            <ToggleGroup.Item
              key={textDecoration}
              className={classNames(
                classes.textDecorationItem,
                (value.textDecoration || "none") === textDecoration
                  ? classes.active
                  : null
              )}
              value={textDecoration}
            >
              {renderTextDecorationIcon(textDecoration)}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </Panel.Content>
    </Panel>
  );
};

const renderTextAlignIcon = (textAlign: string) => {
  switch (textAlign) {
    case "left":
      return (
        <Tooltip title="左对齐">
          <div>
            <IconTextAlignLeft />
          </div>
        </Tooltip>
      );
    case "center":
      return (
        <Tooltip title="居中对齐">
          <div>
            <IconTextAlignCenter />
          </div>
        </Tooltip>
      );
    case "right":
      return (
        <Tooltip title="右对齐">
          <div>
            <IconTextAlignRight />
          </div>
        </Tooltip>
      );
  }
};

const renderTextDecorationIcon = (textDecoration: string) => {
  switch (textDecoration) {
    case "none":
      return (
        <Tooltip title="无">
          <div>
            <IconTextDecorationNone />
          </div>
        </Tooltip>
      );
    case "line-through":
      return (
        <Tooltip title="删除线">
          <div>
            <IconTextDecorationLineThrough />
          </div>
        </Tooltip>
      );
    case "underline":
      return (
        <Tooltip title="下划线">
          <div>
            <IconTextDecorationUnderline />
          </div>
        </Tooltip>
      );
  }
};

export default FontPlugin;
