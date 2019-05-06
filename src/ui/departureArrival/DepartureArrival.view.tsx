import * as React from "react";
import { DepartureArrival } from "./DepartureArrival.component";

export interface IDepartureArrivalViewProps {
  lines: Skanetrafiken.ILineInfo[];
}

export const DepartureArrivalView: React.FunctionComponent<
  IDepartureArrivalViewProps
> = ({ lines }) => {
  return (
    <table>
      <thead>
        <tr>
          <th /> {/* line type icon */}
          <th>Linje</th>
          <th>Mot</th>
          <th>Läge</th>
          <th>Tid</th>
          <th /> {/* status icon */}
          <th className="commentsHeader">
            <span>Kommentarer</span>
            <span id="lastUpdatedText" />
          </th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line, index) => (
          <DepartureArrival key={index} line={line} />
        ))}
      </tbody>
    </table>
  );
};
