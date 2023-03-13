import classNames from "classnames";
import React, { CSSProperties } from "react";
import classes from "./index.module.less";

export interface PanelContentProps {
  className?: string;
  style?: CSSProperties;
  isActive?: boolean;
  children?: any;
}

const Content = ({ className, style, children }: PanelContentProps) => {
  return (
    <div className={classNames(classes.panelContent, className)} style={style}>
      {children}
    </div>
  );
};

export default Content;
