import classNames from "classnames";
import React from "react";
import Content from "./components/Content";
import classes from "./index.module.less";

interface Props {
  title: string;
  className?: string;
  children?: any;
}

const Panel = ({ title, className, children }: Props) => {
  return (
    <div className={classNames(classes.panel, className)}>
      <div className={classes.header}>
        <div className={classes.title}>{title}</div>
        <div className={classes.action}></div>
      </div>
      <div className={classes.wrap}>{children}</div>
    </div>
  );
};

Panel.Content = Content;

export default Panel;
