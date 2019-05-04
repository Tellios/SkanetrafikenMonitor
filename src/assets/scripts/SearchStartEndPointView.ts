import { debounce } from "./debounce";

const stopInput = document.querySelector<HTMLInputElement>("#stopInput");
const stopSelect = document.querySelector<HTMLSelectElement>("#stopSelect");
const viewButton = document.querySelector<HTMLButtonElement>("#viewButton");

console.log(stopInput, stopSelect, viewButton);

stopInput.oninput = debounce(async () => {
  if (stopInput.value && stopInput.value.length > 1) {
    const result = await fetch(
      `/searchStartEndPoints?query=${encodeURIComponent(stopInput.value)}`
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
    }
  }
});
