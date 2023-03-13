import classNames from "classnames";
import React from "react";
import classes from "./index.module.less";

interface Props {
  isActive?: boolean;
  children: React.ReactElement;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const AdvancedBox = ({ isActive, onClick, children }: Props) => {
  return (
    <div
      className={classNames(
        classes.advancedBox,
        isActive ? classes.active : ""
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default AdvancedBox;
