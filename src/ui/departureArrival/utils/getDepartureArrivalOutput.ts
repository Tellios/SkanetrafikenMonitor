import * as moment from "moment";
import { hasDepartedOrArrived } from "./hasDepartedOrArrived";
import { IconType } from "../../components/utils/IconType";
import { Color } from "../../components/utils/Color";
import { trainTypes } from "./trainTypes";

export interface IDepartureArrivalOutput {
  hasDeparted: boolean;
  isCancelled: boolean;
  towards: string;
  departureTime: moment.Moment;
  newDepartureTime?: moment.Moment;
  realTimeAffect: Skanetrafiken.RealTimeAffect;
  stopPoint: string;
  comments: IComment[];
  icon: IconType;
  iconColor: Color;
}

export interface IComment {
  header: string;
  message: string;
}

export function getDepartureArrivalOutput(
  line: Skanetrafiken.ILineInfo
): IDepartureArrivalOutput {
  const departureTime = moment(line.journeyDateTime);
  const hasDeparted = hasDepartedOrArrived(departureTime);

  let stopPoint = line.stopPoint;
  let realTimeAffect: Skanetrafiken.RealTimeAffect = "NONE";
  let newDepartureTime;
  const comments: IComment[] = [];

  if (line.realTime.length > 0) {
    const info = line.realTime[0].realTimeInfo;
    stopPoint = info.newDepPoint || line.stopPoint;
    realTimeAffect = info.depDeviationAffect;

    const newDepartureTimeText = info.depTimeDeviation || "0";

    if (newDepartureTimeText !== "0") {
      const minuteDifference = Number.parseInt(newDepartureTimeText, 10);
      newDepartureTime = departureTime.clone().add(minuteDifference, "minutes");
    }
  }

  const isCancelled = line.realTime.reduce((cancelled, info) => {
    if (!cancelled) {
      cancelled = info.realTimeInfo.canceled || false;
    }

    return cancelled;
  }, false);

  if (line.deviations) {
    line.deviations.deviation.forEach(info => {
      comments.push({
        header: info.header,
        message: info.shortText
      });
    });
  }

  const icon: IconType = trainTypes.includes(line.lineTypeId) ? "train" : "bus";

  const iconColor: Color =
    line.lineTypeId === Skanetrafiken.LineType.CityBus
      ? "green"
      : line.lineTypeId === Skanetrafiken.LineType.AirportBus
      ? "text"
      : line.lineTypeId === Skanetrafiken.LineType.RegionalBus
      ? "yellow"
      : line.lineTypeId === Skanetrafiken.LineType.SkaneExpress
      ? "yellow"
      : line.lineTypeId === Skanetrafiken.LineType.OresundTrain
      ? "text"
      : line.lineTypeId === Skanetrafiken.LineType.PTrainExpress
      ? "purple"
      : line.lineTypeId === Skanetrafiken.LineType.PTrain
      ? "purple"
      : line.lineTypeId === Skanetrafiken.LineType.KTrain
      ? "purple"
      : "red";

  return {
    hasDeparted,
    stopPoint,
    towards: line.towards,
    isCancelled,
    departureTime,
    newDepartureTime,
    realTimeAffect,
    comments,
    icon,
    iconColor
  };
}
