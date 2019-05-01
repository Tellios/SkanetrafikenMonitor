import * as React from "react";
import { ILineProps } from "./ILineProps";
import { trainTypes } from "./trainTypes";

export const StopPoint: React.FunctionComponent<ILineProps> = ({ line }) => {
  if (trainTypes.includes(line.lineTypeId)) {
    if (line.realTime.length > 0) {
      return <td>{line.realTime[0].realTimeInfo.newDepPoint || "-"}</td>;
    } else {
      return <td>-</td>;
    }
  } else {
    return <td>{line.stopPoint}</td>;
  }
};
