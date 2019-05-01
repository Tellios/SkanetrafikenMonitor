import * as React from "react";
import { Icon } from "./Icon.component";
import { Color } from "./utils/Color";

export interface IInfoPanelProps {
  alert?: boolean;
  header: string;
  message: string;
}

export const InfoPanel: React.FunctionComponent<IInfoPanelProps> = ({
  alert = false,
  header,
  message
}) => {
  const iconColor: Color = alert === true ? "red" : "blue";

  return (
    <div className="info-panel-box">
      <div className="info-panel-icon">
        <Icon icon="alert-circle" color={iconColor} />
      </div>

      <div className="info-panel-content">
        <h4 className="info-panel-header">{header}</h4>
        <p className="info-panel-message">{message}</p>
      </div>
    </div>
  );
};
