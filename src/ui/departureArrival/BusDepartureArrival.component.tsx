import * as React from "react";
import * as moment from "moment";
import * as classNames from "classnames";
import { ILineProps } from "./ILineProps";
import { LineType } from "../../services/skanetrafiken/IDepartureArrivalResponse";
import { Color } from "../components/utils/Color";
import { Icon } from "../components/Icon.component";
import { formatJourneyTime } from "./formatJourneyTime";
import { hasDepartedOrArrived } from "./hasDepartedOrArrived";

export const BusDepartureArrival: React.FunctionComponent<ILineProps> = ({
  line
}) => {
  const color: Color =
    line.lineTypeId === LineType.CityBus
      ? "green"
      : line.lineTypeId === LineType.AirportBus
      ? "text"
      : "yellow";

  const time = moment(line.journeyDateTime);
  const hasDeparted = hasDepartedOrArrived(time);

  const extraClasses = {
    "color-disabled": hasDeparted
  };

  return (
    <tr>
      <td>
        <Icon icon="bus" color={color} />
      </td>
      <td className={classNames(extraClasses)}>{line.no}</td>
      <td className={classNames(extraClasses, "destination-cell")}>
        {line.towards}
      </td>
      <td className={classNames(extraClasses)}>{line.stopPoint}</td>
      <td className={classNames(extraClasses)}>{formatJourneyTime(time)}</td>
      <td className="comment-cell" />
    </tr>
  );
};
