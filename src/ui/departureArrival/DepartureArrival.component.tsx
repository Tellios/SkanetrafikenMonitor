import * as React from "react";
import * as classNames from "classnames";
import { ILineProps } from "./ILineProps";
import { InfoPanel } from "../components/InfoPanel.component";
import { formatJourneyTime } from "./utils/formatJourneyTime";
import { Icon } from "../components/Icon.component";
import { Text } from "../components/Text.component";
import { getDepartureArrivalOutput } from "./utils/getDepartureArrivalOutput";

export const DepartureArrival: React.FunctionComponent<ILineProps> = ({
  line
}) => {
  const output = getDepartureArrivalOutput(line);

  const comments = output.comments.map(comment => {
    return (
      <InfoPanel
        alert={output.isCancelled}
        header={comment.header}
        message={comment.message}
      />
    );
  });

  const extraClasses = {
    "color-disabled": output.hasDeparted
  };

  return (
    <tr>
      <td className="icon-cell">
        <Icon icon={output.icon} color={output.iconColor} />
      </td>
      <td className={classNames(extraClasses)}>{output.stopPoint}</td>
      <td className={classNames(extraClasses, "destination-cell")}>
        {output.towards}
      </td>
      <td className={classNames(extraClasses)}>{output.stopPoint}</td>
      <td className={classNames("time-cell", extraClasses)}>
        <Text
          lineThrough={
            output.isCancelled || output.newDepartureTime !== undefined
          }
        >
          {formatJourneyTime(output.departureTime)}
        </Text>
        {output.newDepartureTime !== undefined ? (
          <Text>{formatJourneyTime(output.newDepartureTime)}</Text>
        ) : (
          undefined
        )}
      </td>
      <td className="icon-cell">
        {output.realTimeAffect === "CRITICAL" ? (
          <Icon icon="alert-circle" color="red" />
        ) : (
          undefined
        )}
      </td>
      <td className="comment-cell">{comments}</td>
    </tr>
  );
};
