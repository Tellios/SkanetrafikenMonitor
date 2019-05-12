declare namespace Skanetrafiken {
  export interface IGetStartEndPointResponse {
    /** Response code, 0 if successful operation */
    code: number;
    /** Error message, undefined if response code is 0 */
    message?: string;

    startPoints: IPointInfo;
    endPoints: IPointInfo;
  }

  export interface IPointInfo {
    point: IPoint[];
  }

  export interface IPoint {
    id: number;
    name: string;
    type: PointType;
    /** X coordinate, RT 90 */
    x: number;
    /** Y coordinate, RT 90 */
    y: number;
  }

  export type PointType = "STOP_AREA" | "ADDRESS" | "POI" | "UNKNOWN";

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
    footNote: IFootNoteInfo;
  }

  export interface IFootNoteInfo {
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

  export const enum LineType {
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
}
