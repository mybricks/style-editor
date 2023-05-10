import React, { CSSProperties, useEffect, useState } from "react";
import classes from "./index.module.less";
import Panel from "../../components/Panel";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { ReactComponent as BorderWith } from "../../assets/borderWith.svg";
import { ReactComponent as BorderWithAdvanced } from "../../assets/borderWithAdvanced.svg";
import ColorEditor from "../../components/ColorEditor";
import AdvancedBox from "../../components/AdvancedBox";
import { StylePluginProps } from "../../types";
import {
  borderWidthMap,
  borderRadiusMap,
  borderStyleOptions,
} from "./constant";
import IconBorderRadiusAdvanced from "./icons/IconBorderRadiusAdvanced";
import IconBorderWidthTop from "./icons/IconBorderWidthTop";
import IconBorderWidthBottom from "./icons/IconBorderWidthBottom";
import IconBorderWidthLeft from "./icons/IconBorderWidthLeft";
import IconBorderWidthRight from "./icons/IconBorderWidthRight";
import IconBorderTopLeftRadius from "./icons/IconBorderTopLeftRadius";
import IconBorderTopRightRadius from "./icons/IconBorderTopRightRadius";
import IconBorderBottomLeftRadius from "./icons/IconBorderBottomLeftRadius";
import IconBorderBottomRightRadius from "./icons/IconBorderBottomRightRadius";
import Tooltip from "../../components/Tooltip";

const renderActiveBorderWidthIcon = (borderWithPos: string) => {
  switch (borderWithPos) {
    case "borderTopWidth":
      return (
        <Tooltip title={"上边框宽度"}>
          <div>
            <IconBorderWidthTop />
          </div>
        </Tooltip>
      );
    case "borderBottomWidth":
      return (
        <Tooltip title="下边框宽度">
          <div>
            <IconBorderWidthBottom />
          </div>
        </Tooltip>
      );
    case "borderLeftWidth":
      return (
        <Tooltip title="左边框宽度">
          <div>
            <IconBorderWidthLeft />
          </div>
        </Tooltip>
      );
    case "borderRightWidth":
      return (
        <Tooltip title="右边框宽度">
          <div>
            <IconBorderWidthRight />
          </div>
        </Tooltip>
      );
  }
};

const renderActiveBorderRadiusIcon = (
  activeBorderRadiusPos: string,
  borderRadiusAdvanced = true
) => {
  switch (activeBorderRadiusPos) {
    case "borderTopRightRadius":
      return (
        <Tooltip title={borderRadiusAdvanced ? "边框圆角" : "右上圆角"}>
          <div>
            <IconBorderTopRightRadius />
          </div>
        </Tooltip>
      );
    case "borderBottomLeftRadius":
      return (
        <Tooltip title="左下圆角">
          <div>
            <IconBorderBottomLeftRadius />
          </div>
        </Tooltip>
      );
    case "borderBottomRightRadius":
      return (
        <Tooltip title="右下圆角">
          <div>
            <IconBorderBottomRightRadius />
          </div>
        </Tooltip>
      );
    case "borderTopLeftRadius":
    default:
      return (
        <Tooltip title="左上圆角">
          <div>
            <IconBorderTopLeftRadius />
          </div>
        </Tooltip>
      );
  }
};

interface Props extends StylePluginProps {
  borderOptions: {
    borderColor: boolean;
    borderRadius: boolean;
    borderWidth: boolean;
  };
}

const BorderPlugin = ({ borderOptions, value, onChange }: Props) => {
  const [activeBorderRadius, setActiveBorderRadius] = useState(
    "borderTopLeftRadius"
  );
  const [borderRadiusAdvanced, setBorderRadiusAdvanced] = useState(true);
  const [borderWidthAdvanced, setBorderWidthAdvanced] = useState(true);

  const onPropertyChange = (property: string, value: string) => {
    if (Number.isNaN(parseInt(value))) value = "0px";
    onChange({ [property]: parseInt(value) + "px" });
  };

  const onBorderWidthChange = () => {
    const borderTopWidth = value?.borderTopWidth || "0px";

    onChange({
      borderTopWidth,
      borderBottomWidth: borderTopWidth,
      borderLeftWidth: borderTopWidth,
      borderRightWidth: borderTopWidth,
    });
    setBorderWidthAdvanced((value) => !value);
  };

  const onBorderRadiusChange = () => {
    const borderTopLeftRadius = value.borderTopLeftRadius || "0px";
    onChange({
      borderTopLeftRadius,
      borderTopRightRadius: borderTopLeftRadius,
      borderBottomLeftRadius: borderTopLeftRadius,
      borderBottomRightRadius: borderTopLeftRadius,
    });
    setBorderRadiusAdvanced((value) => !value);
  };

  useEffect(() => {
    if (
      value?.borderTopWidth &&
      value?.borderLeftWidth &&
      value?.borderRightWidth &&
      value?.borderBottomWidth &&
      value?.borderTopWidth === value?.borderBottomWidth &&
      value?.borderLeftWidth === value?.borderRightWidth &&
      value?.borderTopWidth === value?.borderLeftWidth
    ) {
      setBorderWidthAdvanced(false);
    }

    if (
      value?.borderTopLeftRadius &&
      value?.borderTopRightRadius &&
      value?.borderBottomLeftRadius &&
      value?.borderBottomRightRadius &&
      value?.borderTopLeftRadius === value?.borderBottomLeftRadius &&
      value?.borderTopRightRadius === value?.borderBottomRightRadius &&
      value?.borderTopLeftRadius === value?.borderTopRightRadius
    ) {
      setBorderRadiusAdvanced(false);
    }
  }, []);

  const renderBorderColor = () => {
    if (borderOptions?.borderColor === false) return null;
    return (
      <ColorEditor
        // @ts-ignore
        value={value?.borderColor || "rgba(255, 255, 255, 0)"}
        onChange={(color) => {
          onChange({ borderColor: color });
        }}
      />
    );
  };

  const renderBorderRadius = () => {
    if (borderOptions?.borderRadius === false) return null;

    return (
      <Panel.Content className={classes.borderRadiusWrapper}>
        <div
          className={classes.borderRadius}
          style={{
            width: borderRadiusAdvanced ? "100%" : "fit-content",
          }}
        >
          <div className={classes.icon}>
            {renderActiveBorderRadiusIcon(
              activeBorderRadius,
              borderRadiusAdvanced
            )}
          </div>
          <div style={{ display: "flex", flex: 1 }}>
            {Object.keys(borderRadiusMap)
              .slice(0, borderRadiusAdvanced ? 4 : 1)
              .map((borderRadiusKey) => (
                <Input
                  key={borderRadiusKey}
                  style={{
                    width: borderRadiusAdvanced ? "auto" : 48,
                    flex: borderRadiusAdvanced ? 1 : 0,
                  }}
                  innerStyle={{ width: 30 }}
                  // @ts-ignore
                  value={parseInt(value?.[borderRadiusKey] || "0px")}
                  onFocus={() => setActiveBorderRadius(borderRadiusKey)}
                  onChange={(value) => {
                    if (borderRadiusAdvanced) {
                      onPropertyChange(borderRadiusKey, value);
                    } else {
                      if (Number.isNaN(parseInt(value))) value = "0px";
                      // @ts-ignore
                      value = parseInt(value) + "px";
                      onChange({
                        borderTopLeftRadius: value,
                        borderTopRightRadius: value,
                        borderBottomLeftRadius: value,
                        borderBottomRightRadius: value,
                      });
                    }
                  }}
                />
              ))}
          </div>
        </div>
        <AdvancedBox
          isActive={borderRadiusAdvanced}
          onClick={() => onBorderRadiusChange()}
        >
          <Tooltip title="展开全部圆角选项">
            <div>
              <IconBorderRadiusAdvanced />
            </div>
          </Tooltip>
        </AdvancedBox>
      </Panel.Content>
    );
  };

  const renderBorderStyle = () => {
    if (borderOptions?.borderWidth === false) return null;

    return (
      <Panel.Content className={classes.borderStyleWrapper}>
        <div style={{ display: "flex", flex: 1 }}>
          <Select
            style={{
              flex: 1,
              height: "30px",
              borderRadius: "4px",
              backgroundColor: "#f0f0f0",
            }}
            defaultValue={"none"}
            value={value?.borderStyle || "none"}
            options={borderStyleOptions}
            onChange={(value) => {
              onChange({ borderStyle: value });
            }}
          />
          <Input
            addonBefore={
              <Tooltip title="边框宽度">
                <div>
                  <BorderWith />
                </div>
              </Tooltip>
            }
            style={{
              marginLeft: "6px",
              flex: 1,
              height: "30px",
              borderRadius: "4px",
              backgroundColor: "#f0f0f0",
            }}
            // @ts-ignore
            value={
              borderWidthAdvanced
                ? "Mixed"
                : // @ts-ignore
                  parseInt(value?.borderTopWidth || "0px")
            }
            onChange={(value) => {
              if (Number.isNaN(parseInt(value))) value = "0px";
              // @ts-ignore
              value = parseInt(value) + "px";
              if (!borderWidthAdvanced) {
                onChange({
                  borderTopWidth: value,
                  borderBottomWidth: value,
                  borderLeftWidth: value,
                  borderRightWidth: value,
                });
              }
            }}
          />
        </div>
        <AdvancedBox
          isActive={borderWidthAdvanced}
          onClick={() => onBorderWidthChange()}
        >
          <Tooltip title="展开全部边框选项">
            <div>
              <BorderWithAdvanced />
            </div>
          </Tooltip>
        </AdvancedBox>
      </Panel.Content>
    );
  };

  const renderBorderWidth = () => {
    if (borderOptions?.borderWidth === false) return null;

    if (!borderWidthAdvanced) return null;

    return (
      <Panel.Content className={classes.borderWidthWrapper}>
        <div className={classes.borderWidth}>
          {Object.keys(borderWidthMap).map((key) => (
            <Input
              key={key}
              className={classes.borderWidthItem}
              addonBefore={renderActiveBorderWidthIcon(key)}
              innerStyle={{ width: 30 }}
              // @ts-ignore
              value={parseInt(value?.[key] || "0px")}
              onFocus={() => setActiveBorderRadius(key)}
              onChange={(value) => onPropertyChange(key, value)}
            />
          ))}
        </div>
      </Panel.Content>
    );
  };

  return (
    <Panel title="描边" className={classes.borderPlugin}>
      {renderBorderColor()}
      {renderBorderRadius()}
      {renderBorderStyle()}
      {renderBorderWidth()}
    </Panel>
  );
};

export default BorderPlugin;
