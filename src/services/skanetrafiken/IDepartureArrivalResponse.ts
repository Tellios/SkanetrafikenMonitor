export interface IDepartureArrivalResponse {
  getDepartureArrivalResult: IDepartureArrivalResult;
}

export interface IDepartureArrivalResult {
  /** Response code, 0 if successful operation */
  code: number;
  /** Error message, undefined if response code is 0 */
  message?: string;
  lines: ILines;
}

export interface ILines {
  line: ILineInfo[];
}

export interface ILineInfo {
  name: string;
  no: string;
  journeyDateTime: string;
  isTimingPoint: string;
  stopPoint: string;
  lineTypeId: LineType;
  lineTypeName: string;
  /** Destination text */
  towards: string;
  footNotes: IFootNote[];
  realTime: IRealTime[];
  trainNo: string;
  deviations?: IDeviation;
  runNo: string;
}

export interface IFootNote {
  /** Foot note's index, always unique in scope of journey */
  index: string;
  text: string;
}

export interface IRealTime {
  realTimeInfo: IRealTimeInfo;
}

export interface IRealTimeInfo {
  newDepPoint?: string;
  depTimeDeviation?: string;
  depDeviationAffect: RealTimeAffect;
  canceled?: boolean;
}

export interface IDeviation {
  deviation: IDeviationInfo[];
}

export interface IDeviationInfo {
  publicNote: string;
  header: string;
  summary: string;
  shortText: string;
}

export type RealTimeAffect = "CRITICAL" | "NON_CRITICAL" | "PASSED" | "NONE";

export enum LineType {
  RegionalBus = "1",
  SkaneExpress = "2",
  CityBus = "4",
  KTrain = "8",
  PTrainExpress = "16",
  PTrain = "32",
  TrainBus = "64",
  OresundTrain = "128",
  AirportBus = "256",
  Ferry = "512",
  Commute = "1024"
}
