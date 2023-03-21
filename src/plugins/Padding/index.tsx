import React, { useEffect, useState } from "react";
import css from "./index.module.less";
import Panel from "../../components/Panel";
import Input from "../../components/Input";
import { StylePluginProps } from "../../types";
import IconPaddingLeft from "./icons/IconPaddingLeft";
import AdvancedBox from "../../components/AdvancedBox";
import IconAdvancedMode from "./icons/IconAdvancedMode";
import IconPaddingHorizontal from "./icons/IconPaddingHorizontal";
import IconPaddingVertical from "./icons/IconPaddingVertical";
import IconPaddingBottom from "./icons/IconPaddingBottom";
import IconPaddingRight from "./icons/IconPaddingRight";
import IconPaddingTop from "./icons/IconPaddingTop";
import Tooltip from "../../components/Tooltip";

interface Props extends StylePluginProps {}

const PaddingPlugin = ({ value, onChange }: Props) => {
  const [advancedMode, setAdvancedMode] = useState(false);

  const onPropertyChange = (property: string, value: string) => {
    // @ts-ignore
    if (Number.isNaN(parseInt(value))) value = "0px";
    onChange({ [property]: parseInt(value) + "px" });
  };

  const onPaddingChange = () => {
    const paddingLeft = value.paddingLeft || "0px",
      paddingTop = value.paddingTop || "0px";

    onChange({
      paddingLeft,
      paddingTop,
      paddingRight: paddingLeft,
      paddingBottom: paddingTop,
    });
    setAdvancedMode(!advancedMode);
  };

  useEffect(() => {
    if (
      value.paddingLeft !== value.paddingRight ||
      value.paddingTop !== value.paddingBottom
    ) {
      setAdvancedMode(true);
    }
  }, []);

  return (
    <Panel title="内边距" className={css.paddingPlugin}>
      <Panel.Content>
        <div className={css.paddingWrapper}>
          <Input
            addonBefore={
              advancedMode ? (
                <Tooltip title="左内边距">
                  <div>
                    <IconPaddingLeft />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title="左右内边距">
                  <div>
                    <IconPaddingHorizontal />
                  </div>
                </Tooltip>
              )
            }
            className={css.paddingDirection}
            // @ts-ignore
            value={parseInt(value?.paddingLeft || "0px")}
            onChange={(value) => {
              if (advancedMode) {
                onPropertyChange("paddingLeft", value);
              } else {
                if (Number.isNaN(parseInt(value))) value = "0";
                value = parseInt(value) + "px";
                onChange({
                  paddingLeft: value,
                  paddingRight: value,
                });
              }
            }}
          />
          <Input
            addonBefore={
              advancedMode ? (
                <Tooltip title="上内边距">
                  <div>
                    <IconPaddingTop />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title="上下内边距">
                  <div>
                    <IconPaddingVertical />
                  </div>
                </Tooltip>
              )
            }
            className={css.paddingDirection}
            // @ts-ignore
            value={parseInt(value?.paddingTop || "0px")}
            onChange={(value) => {
              if (advancedMode) {
                onPropertyChange("paddingTop", value);
              } else {
                if (Number.isNaN(parseInt(value))) value = "0px";
                value = parseInt(value) + "px";
                onChange({
                  paddingTop: value,
                  paddingBottom: value,
                });
              }
            }}
          />
          {advancedMode ? (
            <>
              <Input
                addonBefore={
                  <Tooltip title="右内边距">
                    <div>
                      <IconPaddingRight />
                    </div>
                  </Tooltip>
                }
                className={css.paddingDirection}
                // @ts-ignore
                value={parseInt(value?.paddingRight || "0px")}
                onChange={(value) => onPropertyChange("paddingRight", value)}
              />
              <Input
                addonBefore={
                  <Tooltip title="下内边距">
                    <div>
                      <IconPaddingBottom />
                    </div>
                  </Tooltip>
                }
                className={css.paddingDirection}
                // @ts-ignore
                value={parseInt(value?.paddingBottom || "0px")}
                onChange={(value) => onPropertyChange("paddingBottom", value)}
              />
            </>
          ) : null}
        </div>
        <AdvancedBox isActive={advancedMode} onClick={() => onPaddingChange()}>
          <Tooltip title="展开全部">
            <div>
              <IconAdvancedMode />
            </div>
          </Tooltip>
        </AdvancedBox>
      </Panel.Content>
    </Panel>
  );
};

export default PaddingPlugin;
