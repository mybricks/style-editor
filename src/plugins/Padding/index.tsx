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
    if (Number.isNaN(parseInt(value))) value = "0";
    onChange({ [property]: parseInt(value) });
  };

  const onPaddingChange = () => {
    const paddingLeft = value.paddingLeft || 0,
      paddingTop = value.paddingTop || 0;

    onChange({
      paddingLeft,
      paddingTop,
      paddingRight: paddingLeft,
      paddingBottom: paddingTop,
    });
    setAdvancedMode(!advancedMode);
  };

  useEffect(() => {
    if (value.paddingLeft !== value.paddingRight) {
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
            value={value?.paddingLeft || 0}
            onChange={(value) => {
              if (advancedMode) {
                onPropertyChange("paddingLeft", value);
              } else {
                if (Number.isNaN(parseInt(value))) value = "0";
                onChange({
                  paddingLeft: parseInt(value),
                  paddingRight: parseInt(value),
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
            value={value?.paddingTop || 0}
            onChange={(value) => {
              if (advancedMode) {
                onPropertyChange("paddingTop", value);
              } else {
                if (Number.isNaN(parseInt(value))) value = "0";
                onChange({
                  paddingTop: parseInt(value),
                  paddingBottom: parseInt(value),
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
                value={value?.paddingRight || 0}
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
                value={value?.paddingBottom || 0}
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
