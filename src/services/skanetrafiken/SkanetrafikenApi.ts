import { parseString, processors } from "xml2js";
import * as http from "http";
import {
  IDepartureArrivalResponse,
  IDepartureArrivalResult
} from "./IDepartureArrivalResponse";

export class SkanetrafikenApi {
  public getDepartureArrival(): Promise<IDepartureArrivalResult> {
    return new Promise((resolve, reject) => {
      const request = http.get(
        "http://www.labs.skanetrafiken.se/v2.2/stationresults.asp?selPointFrKey=80000",
        res => {
          if (res.statusCode !== 200) {
            reject(
              Error(
                `Failed to invoke departure/arrival endpoint, code: ${
                  res.statusCode
                }, message: ${res.statusMessage}`
              )
            );
          }

          let rawData = "";
          res.on("data", (chunk: string) => {
            rawData += chunk;
          });

          res.on("end", () => {
            this.parseXmlResponse(rawData).then((parsedXml: any) => {
              const result: IDepartureArrivalResult =
                parsedXml.envelope.body.getDepartureArrivalResponse
                  .getDepartureArrivalResult;

              this.setDefaultsForUndefinedData(result);

              resolve(result);
            });
          });
        }
      );

      request.end();
    });
  }

  private async parseXmlResponse(xml: string) {
    return new Promise((resolve, reject) => {
      parseString(
        xml,
        {
          tagNameProcessors: [
            processors.stripPrefix,
            processors.firstCharLowerCase
          ],
          emptyTag: undefined,
          explicitArray: false
        },
        (err, res) => {
          if (err) {
            reject(Error(`Failed to parse departure/arrival response`));
          }

          resolve(res);
        }
      );
    });
  }

  private setDefaultsForUndefinedData(result: IDepartureArrivalResult) {
    /**
     * To simplify the code using the result we set defaults here for some
     * properties that will be undefined if not set in the XML.
     */
    result.lines.line = this.coerceToArray(result.lines.line);
    const lines = result.lines.line;

    if (lines.length > 0) {
      lines.forEach(line => {
        line.deviations = this.coerceToArray(line.deviations);
        line.footNotes = this.coerceToArray(line.footNotes);
        line.realTime = this.coerceToArray(line.realTime);
      });
    }
  }

  private coerceToArray<T>(value?: T | Array<T>): Array<T> {
    if (value === undefined) {
      return [];
    } else if (Array.isArray(value)) {
      return value;
    } else {
      return [value];
    }
  }
}
