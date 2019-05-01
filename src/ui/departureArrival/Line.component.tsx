import * as React from "react";
import { ILineProps } from "./ILineProps";
import { TrainDepartureArrival } from "./TrainDepartureArrival.component";
import { BusDepartureArrival } from "./BusDepartureArrival.component";
import { trainTypes } from "./trainTypes";

export const Line: React.FunctionComponent<ILineProps> = ({ line }) => {
  if (trainTypes.includes(line.lineTypeId)) {
    return <TrainDepartureArrival line={line} />;
  } else {
    return <BusDepartureArrival line={line} />;
  }
};
