export interface IDepartureArrivalResponse {
  getDepartureArrivalResult: IDepartureArrivalResult;
}

export interface IDepartureArrivalResult {
  /** Response code, 0 if successful operation */
  code: number;
  /** Error message, undefined if response code is 0 */
  message?: string;
  lines: ILine[];
}

export interface ILine {
  name: string;
  no: string;
  journeyDateTime: string;
  isTimingPoint: string;
  stopPoint: string;
  lineTypeId: string;
  lineTypeName: string;
  /** Destination text */
  towards: string;
  footNotes: IFootNote[];
  realTime: IRealTime[];
  trainNo: string;
  deviations?: IDeviation[];
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
}

export interface IDeviation {
  publicNote: string;
  header: string;
  details: string;
  summary: string;
  shortNext: string;
}

export type RealTimeAffect = "CRITICAL" | "NON_CRITICAL" | "PASSED" | "NONE";
