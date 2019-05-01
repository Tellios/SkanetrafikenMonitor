import * as moment from "moment";

export function hasDepartedOrArrived(journeyTime: moment.Moment): boolean {
  const now = moment();
  return now.diff(journeyTime) > 0;
}
