import * as express from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { html } from "../ui/html";
import { DepartureArrivalView } from "../ui/departureArrival/DepartureArrival.view";
import { SkanetrafikenApi } from "../services/skanetrafiken/SkanetrafikenApi";
import * as path from "path";
import { SearchStartEndPointView } from "../ui/searchStartEndPointForm/SearchStartEndPoint.view";
import { transportationValidator } from "./validators";

const port = 8080;
const server = express();

const api = new SkanetrafikenApi();

const assetsDir = path.resolve(__dirname, "../", "assets");
server.use(
  "/assets",
  express.static(assetsDir, {
    cacheControl: process.env.NODE_ENV === "production",
    extensions: ["html", "js", "css"]
  })
);

server.get("/", async (req, res) => {
  const body = renderToString(React.createElement(SearchStartEndPointView, {}));

  res.send(
    html({
      body,
      head: `<script src="/assets/scripts/SearchStartEndPointView.js" type="module"></script>`
    })
  );
});

server.get("/departureArrivals/:stopId", async (req, res) => {
  const stopId = req.params.stopId || "";
  const transportation: string = req.query.transportation || "trains,busses";

  if (typeof stopId !== "string" || stopId.length === 0) {
    return res.status(400).send("Invalid stop id parameter");
  }

  const transportations = transportationValidator.validate(
    transportation.split(",")
  );

  if (transportations.error !== null) {
    return res
      .status(400)
      .send(
        `Invalid transportation parameter: ${transportations.error.message}`
      );
  }

  const response = await api.getDepartureArrival(stopId, transportations.value);
  const body = renderToString(
    React.createElement(DepartureArrivalView, { lines: response.lines.line })
  );

  res.send(
    html({
      body
    })
  );
});

server.get("/searchStartEndPoints", async (req, res) => {
  const query = req.query.query || "";

  if (typeof query !== "string" || query.length < 2) {
    return res.status(400).send("Invalid search query");
  }

  const result = await api.getStartEndPoint(query);

  return res.status(200).send(result);
});

server.listen(port, () => console.log(`Server started on port ${port}`));
