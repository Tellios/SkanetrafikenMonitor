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
              resolve(parsedXml.envelope.body.getDepartureArrivalResponse.getDepartureArrivalResult);
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
}
