import * as React from "react";
import { ILineInfo } from "../../services/skanetrafiken/IDepartureArrivalResponse";
import { Line } from "./Line.component";

export interface IDepartureArrivalViewProps {
  lines: ILineInfo[];
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
          <th>Kommentar</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line, index) => (
          <Line key={index} line={line} />
        ))}
      </tbody>
    </table>
  );
};
