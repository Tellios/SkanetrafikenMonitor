import * as moment from "moment";

export function formatJourneyTime(journeyTime: moment.Moment): string {
  return journeyTime.format("HH:mm");
}
