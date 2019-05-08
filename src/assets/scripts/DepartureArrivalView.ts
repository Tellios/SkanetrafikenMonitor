const lastUpdatedText = document.querySelector<HTMLSpanElement>(
  "#lastUpdatedText"
);

lastUpdatedText.textContent = `Uppdaterat ${
  new Date().toTimeString().split(" ")[0]
}`;

const minute = 1000 * 60;

setInterval(() => {
  location.reload(true);
}, minute * 2);
