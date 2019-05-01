import * as React from "react";
import * as moment from "moment";
import * as classNames from "classnames";
import { ILineProps } from "./ILineProps";
import { InfoPanel } from "../components/InfoPanel.component";
import { LineType } from "../../services/skanetrafiken/IDepartureArrivalResponse";
import { formatJourneyTime } from "./formatJourneyTime";
import { Icon } from "../components/Icon.component";
import { Color } from "../components/utils/Color";
import { Text } from "../components/Text.component";
import { hasDepartedOrArrived } from "./hasDepartedOrArrived";

export const TrainDepartureArrival: React.FunctionComponent<ILineProps> = ({
  line
}) => {
  let trainStopPoint = line.stopPoint;
  let newDepartureTime = "";
  let canceled = line.realTime.reduce((isCanceled, info) => {
    if (!isCanceled) {
      isCanceled = info.realTimeInfo.canceled || false;
    }

    return isCanceled;
  }, false);

  if (line.realTime.length > 0) {
    const info = line.realTime[0].realTimeInfo;
    trainStopPoint = info.newDepPoint || line.stopPoint;
    newDepartureTime = info.depTimeDeviation || "";

    if (newDepartureTime === "0") {
      newDepartureTime = "";
    }
  }

  let comments: React.ReactNode[] = [];

  if (line.deviations) {
    comments = line.deviations.deviation.map(info => {
      return (
        <InfoPanel
          alert={canceled}
          header={info.header}
          message={info.shortText}
        />
      );
    });
  }

  const color: Color =
    line.lineTypeId === LineType.OresundTrain ? "text" : "purple";

  const time = moment(line.journeyDateTime);
  const hasDeparted = hasDepartedOrArrived(time);

  const extraClasses = {
    "color-disabled": hasDeparted
  };

  return (
    <tr>
      <td>
        <Icon icon="train" color={color} />
      </td>
      <td className={classNames(extraClasses)}>{line.trainNo}</td>
      <td className={classNames(extraClasses, "destination-cell")}>
        {line.towards}
      </td>
      <td className={classNames(extraClasses)}>{trainStopPoint}</td>
      <td className={classNames(extraClasses)}>
        <Text lineThrough={canceled}>{formatJourneyTime(time)}</Text>
      </td>
      <td className="comment-cell">{comments}</td>
    </tr>
  );
};
