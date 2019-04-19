import * as React from "react";
import {
  ILineInfo,
  LineType
} from "../services/skanetrafiken/IDepartureArrivalResponse";

export interface IDepartureArrivalViewProps {
  lines: ILineInfo[];
}

export const DepartureArrivalView: React.FunctionComponent<
  IDepartureArrivalViewProps
> = ({ lines }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Linje</th>
          <th>Mot</th>
          <th>Läge</th>
          <th>Tid</th>
          <th>Kommentar</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line, index) => (
          <Line key={index} line={line} />
        ))}
      </tbody>
    </table>
  );
};

export interface ILineProps {
  line: ILineInfo;
}

const trainTypes = [
  LineType.KTrain,
  LineType.OresundTrain,
  LineType.PTrain,
  LineType.PTrainExpress
];

export const Line: React.FunctionComponent<ILineProps> = ({ line }) => {
  if (trainTypes.includes(line.lineTypeId)) {
    return <TrainDepartureArrival line={line} />;
  } else {
    return <BusDepartureArrival line={line} />;
  }
};

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

export const TrainDepartureArrival: React.FunctionComponent<ILineProps> = ({
  line
}) => {
  let trainStopPoint = "-";
  let newDepartureTime = "";

  console.log(line);

  if (line.realTime.length > 0) {
    const info = line.realTime[0].realTimeInfo;
    trainStopPoint = info.newDepPoint || "-";
    newDepartureTime = info.depTimeDeviation || "";

    if (newDepartureTime === "0") {
      newDepartureTime = "";
    }
  }

  let comment = "";

  if (line.deviations.length > 0) {
    const deviation = line.deviations[0];

    comment += deviation.details;
  }

  return (
    <tr>
      <td>{line.trainNo}</td>
      <td>{line.towards}</td>
      <td>{trainStopPoint}</td>
      <td>{line.journeyDateTime}</td>
      <td>{comment}</td>
    </tr>
  );
};

export const BusDepartureArrival: React.FunctionComponent<ILineProps> = ({
  line
}) => {
  return (
    <tr>
      <td>{line.no}</td>
      <td>{line.towards}</td>
      <td>{line.stopPoint}</td>
      <td>{line.journeyDateTime}</td>
      <td />
    </tr>
  );
};
