import * as express from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { html } from "../ui/html";
import { DepartureArrivalView } from "../ui/DepartureArrivalView";
import { SkanetrafikenApi } from "../services/skanetrafiken/SkanetrafikenApi";

const port = 8080;
const server = express();

const api = new SkanetrafikenApi();

// server.use(express.static("dist"));

server.get("/", async (req, res) => {
  const response = await api.getDepartureArrival();
  const body = renderToString(
    React.createElement(DepartureArrivalView, { lines: response.lines.line })
  );

  res.send(
    html({
      body
    })
  );
});

server.listen(port, () => console.log(`Server started on port ${port}`));
