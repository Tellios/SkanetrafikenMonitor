const lastUpdatedText = document.querySelector<HTMLSpanElement>(
  "#lastUpdatedText"
);

const hourMinutesSeconds = new Date().toTimeString().split(" ")[0];
const hourMinutes = hourMinutesSeconds
  .split(":")
  .slice(0, 2)
  .join(":");

lastUpdatedText.textContent = `Uppdaterat ${hourMinutes}`;

const minute = 1000 * 60;

setInterval(() => {
  location.reload(true);
}, minute * 2);
