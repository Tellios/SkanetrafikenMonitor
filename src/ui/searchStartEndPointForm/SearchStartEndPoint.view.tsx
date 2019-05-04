import * as React from "react";

export interface ISearchStartEndPointProps {}

export const SearchStartEndPointView: React.FunctionComponent<
  ISearchStartEndPointProps
> = () => {
  return (
    <form>
      <fieldset>
        <legend>Sätt upp filter</legend>

        <label>
          Sök hållplats <input id="stopInput" type="text" />
        </label>

        <label>
          Välj hållplats <select id="stopSelect" />
        </label>

        <button id="viewButton">Visa resultat</button>
      </fieldset>
    </form>
  );
};
