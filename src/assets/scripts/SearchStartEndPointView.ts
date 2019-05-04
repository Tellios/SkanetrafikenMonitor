import { debounce } from "./debounce";

const stopInput = document.querySelector<HTMLInputElement>("#stopInput");
const stopSelect = document.querySelector<HTMLSelectElement>("#stopSelect");
const includeTrainsCheckbox = document.querySelector<HTMLInputElement>(
  "#includeTrainsCheckbox"
);
const includeBussesCheckbox = document.querySelector<HTMLInputElement>(
  "#includeBussesCheckbox"
);
const viewButton = document.querySelector<HTMLButtonElement>("#viewButton");

const isStopSelected = () =>
  typeof stopSelect.value === "string" && stopSelect.value.length > 0;

const getStopSearchInput = () => {
  const value = stopInput.value;

  if (typeof value === "string") {
    return value.trim();
  }

  return "";
};

viewButton.disabled = !isStopSelected();

stopInput.oninput = debounce(async () => {
  const searchInput = getStopSearchInput();
  console.log(includeTrainsCheckbox.value);
  if (searchInput.length > 1) {
    const result = await fetch(
      `/searchStartEndPoints?query=${encodeURIComponent(searchInput)}`
    );

    if (result.ok) {
      const startEndPoints: Skanetrafiken.IGetStartEndPointResponse = await result.json();

      const currentOptions = stopSelect.querySelectorAll("option");
      currentOptions.forEach(option => option.remove());

      startEndPoints.startPoints.point.forEach((point, index) => {
        stopSelect.appendChild(
          new Option(point.name, point.id.toString(), false, index === 0)
        );
      });

      viewButton.disabled = !isStopSelected();
    }
  }
});

stopSelect.onchange = () => {
  viewButton.disabled = !isStopSelected();
};

viewButton.onclick = (ev: Event) => {
  ev.preventDefault();

  const transportation = [];

  if (includeTrainsCheckbox.checked) {
    transportation.push("trains");
  }

  if (includeBussesCheckbox.checked) {
    transportation.push("busses");
  }

  if (transportation.length === 0) {
    alert("Inget transportsätt är valt");
    return;
  }

  const queryString = `transportation=${transportation.join(",")}`;

  console.log(transportation, includeTrainsCheckbox, includeBussesCheckbox);

  window.location.assign(
    `/departureArrivals/${stopSelect.value}?${queryString}`
  );
};
