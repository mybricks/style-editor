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
import {
  fontFamilyOptions,
  fontWeigthOptions,
  textAlignOptions,
  textDecorationOptions,
  verticalAlignOptions,
} from "./constant";
import IconFontSize from "./icons/IconFontSize";
import Tooltip from "../../components/Tooltip";
import IconVerticalAlignTop from "./icons/IconVerticalAlignTop";
import IconVerticalAlignBottom from "./icons/IconVerticalAlignBottom";
import IconVerticalAlignMiddle from "./icons/IconVerticalAlignMiddle";
import IconLineClamp from "./icons/IconLineClamp";

interface Props extends StylePluginProps {
  fontOptions?: {
    fontFamilyOptions: Array<{
      label: string;
      value: string;
    }>;
    fontFamily?: boolean;
    fontSize?: boolean;
    fontWeight?: boolean;
    lineHeight?: boolean;
  };
}

const FontPlugin = ({ value, onChange, fontOptions }: Props) => {
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
            ...fontFamilyOptions,
            ...(fontOptions?.fontFamilyOptions || []),
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
          onChange={(value) => onChange({ fontWeight: value })}
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
          value={parseInt(value?.fontSize || "0px")}
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
      <Panel.Content>
        <ToggleGroup.Root
          className={classes.verticalAlignGroup}
          type="single"
          // @ts-ignore
          value={value?.verticalAlign || "top"}
          // @ts-ignore
          onValueChange={(value) => {
            // @ts-ignore
            value && onChange({ verticalAlign: value });
          }}
        >
          {verticalAlignOptions.map((verticalAlign) => (
            <ToggleGroup.Item
              key={verticalAlign}
              className={classNames(
                classes.verticalAlignItem,
                (value?.verticalAlign || "top") === verticalAlign
                  ? classes.active
                  : null
              )}
              value={verticalAlign}
            >
              {renderVerticalAlignIcon(verticalAlign)}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
        <Input
          className={classes.lineClamp}
          addonBefore={
            <Tooltip title="行数">
              <div>
                <IconLineClamp />
              </div>
            </Tooltip>
          }
          // @ts-ignore
          value={value?.lineClamp || 1}
          innerStyle={{ width: 41 }}
          // @ts-ignore
          onChange={(value) =>
            onChange({
              lineClamp: !isNaN(parseInt(value)) ? parseInt(value) : 1,
            })
          }
        />
      </Panel.Content>
    </Panel>
  );
};

const renderVerticalAlignIcon = (verticalAlign: string) => {
  switch (verticalAlign) {
    case "top":
      return (
        <Tooltip title="顶对齐">
          <IconVerticalAlignTop />
        </Tooltip>
      );
    case "middle":
      return (
        <Tooltip title="居中对齐">
          <IconVerticalAlignMiddle />
        </Tooltip>
      );
    case "bottom":
      return (
        <Tooltip title="底对齐">
          <IconVerticalAlignBottom />
        </Tooltip>
      );
  }
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
