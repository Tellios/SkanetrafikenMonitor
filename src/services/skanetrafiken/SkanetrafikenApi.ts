import { parseString, processors } from "xml2js";
import * as http from "http";

export class SkanetrafikenApi {
  public getDepartureArrival(
    stopId: string
  ): Promise<Skanetrafiken.IDepartureArrivalResult> {
    return new Promise((resolve, reject) => {
      const request = http.get(
        `http://www.labs.skanetrafiken.se/v2.2/stationresults.asp?selPointFrKey=${stopId}`,
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
              const result: Skanetrafiken.IDepartureArrivalResult =
                parsedXml.envelope.body.getDepartureArrivalResponse
                  .getDepartureArrivalResult;

              this.setDefaultsForDataInDepartureArrivalResponse(result);

              resolve(result);
            });
          });
        }
      );

      request.end();
    });
  }

  public getStartEndPoint(
    searchQuery: string
  ): Promise<Skanetrafiken.IGetStartEndPointResponse> {
    return new Promise((resolve, reject) => {
      const request = http.get(
        `http://www.labs.skanetrafiken.se/v2.2/querystation.asp?inpPointfr=${encodeURIComponent(
          searchQuery
        )}`,
        res => {
          if (res.statusCode !== 200) {
            reject(
              Error(
                `Failed to invoke querystation endpoint, code: ${
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
              const result: Skanetrafiken.IGetStartEndPointResponse =
                parsedXml.envelope.body.getStartEndPointResponse
                  .getStartEndPointResult;

              this.setDefaultsForDataInGetStartEndPointResponse(result);

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

  private setDefaultsForDataInDepartureArrivalResponse(
    result: Skanetrafiken.IDepartureArrivalResult
  ) {
    /**
     * To simplify the code using the result we set defaults here for some
     * properties that will be undefined if not set in the XML.
     */
    result.lines.line = this.coerceToArray(result.lines.line);
    const lines = result.lines.line;

    /**
     * Since XML has no real good information (like e.g JSON) of what is
     * an array or not unless you can properly use an .xsd when parsing
     * we make sure that the properties adhere to what is expected.
     */
    if (lines.length > 0) {
      lines.forEach(line => {
        if (line.deviations !== undefined) {
          line.deviations.deviation = this.coerceToArray(
            line.deviations.deviation
          );
        }

        line.footNotes = this.coerceToArray(line.footNotes);
        line.realTime = this.coerceToArray(line.realTime);
      });
    }
  }

  private setDefaultsForDataInGetStartEndPointResponse(
    result: Skanetrafiken.IGetStartEndPointResponse
  ) {
    result.startPoints.point = this.coerceToArray(result.startPoints.point);
    result.endPoints.point = this.coerceToArray(result.endPoints.point);
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
