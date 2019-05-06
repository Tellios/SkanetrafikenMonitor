import * as React from "react";

export interface ISearchStartEndPointProps {}

export const SetupFilterView: React.FunctionComponent<
  ISearchStartEndPointProps
> = () => {
  return (
    <form>
      <fieldset>
        <legend>Sätt upp filter</legend>

        <label>
          Sök hållplats <input id="stopInput" type="text" autoComplete="off" />
        </label>

        <label>
          Välj hållplats <select id="stopSelect" />
        </label>

        <fieldset>
          <legend>Transportsätt</legend>

          <label>
            Tåg{" "}
            <input id="includeTrainsCheckbox" type="checkbox" defaultChecked />
          </label>

          <label>
            Buss{" "}
            <input id="includeBussesCheckbox" type="checkbox" defaultChecked />
          </label>
        </fieldset>

        <button id="viewButton">Visa resultat</button>
      </fieldset>
    </form>
  );
};
