import * as React from "react";
import * as classNames from "classnames";

export interface ITextProps {
  lineThrough?: boolean;
  children: string;
}

export const Text: React.FunctionComponent<ITextProps> = ({
  lineThrough,
  children
}) => {
  return (
    <span className={classNames({ "line-through-text": lineThrough })}>
      {children}
    </span>
  );
};
