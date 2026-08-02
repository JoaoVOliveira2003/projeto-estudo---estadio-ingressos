import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import "./schema/1associations";

import { routerEstadio } from "./routes/estadio";
import { routerEvento } from "./routes/evento";
import { mercadoPagoRouter } from "./routes/mercadoPago";
import { routerIngress } from "./routes/ingresso";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:9000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/estadio", routerEstadio);
app.use("/evento", routerEvento);
app.use("/mercadoPago", mercadoPagoRouter);
app.use("/ingresso", routerIngress);

export default app;