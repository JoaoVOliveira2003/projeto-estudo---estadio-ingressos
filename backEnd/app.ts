import express from "express";
import cors from "cors";

import { routerEstadio } from "./routes/estadio";
import { routerEvento } from "./routes/evento";

import { EstadioSchema } from "./schema/estadio-schema";
import { eventoSchema } from "./schema/evento-schema";

import cookieParser from 'cookie-parser';
import "dotenv/config";

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:9000',
  credentials: true
}));
app.use(express.json());

const db = {  EstadioSchema,eventoSchema};

(Object.values(db) as any).forEach((schema: any) => {
  if (schema.associate) {
    schema.associate(db);
  }
});

app.use("/estadio", routerEstadio);
app.use("/evento", routerEvento);

export default app;
