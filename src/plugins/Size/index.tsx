import React, { useEffect, useState } from "react";
import css from "./index.module.less";
import Panel from "../../components/Panel";
import Input from "../../components/Input";
import { StylePluginProps } from "../../types";
import Tooltip from "../../components/Tooltip";

interface Props extends StylePluginProps {}

export default ({ value, onChange }: Props) => {
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
  };

  return (
    <Panel title="尺寸" className={css.paddingPlugin}>
      <Panel.Content>
        <div className={css.paddingWrapper}>
          <Input value={1} onChange={() => {}}/>
        </div>
      </Panel.Content>
    </Panel>
  );
};
