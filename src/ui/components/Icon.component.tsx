import * as React from "react";
import * as classNames from "classnames";
import { resolveColorClass } from "./utils/resolveColorClass";
import { Color } from "./utils/Color";
import { IconType } from "./utils/IconType";

export interface IIconProps {
  color?: Color;
  icon: IconType;
}

export const Icon: React.FunctionComponent<IIconProps> = ({
  color = "text",
  icon
}) => {
  const classes = classNames(
    "mdi",
    `mdi-${icon}`,
    "icon",
    resolveColorClass(color)
  );

  return <span className={classes} />;
};
