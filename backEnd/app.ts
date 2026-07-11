import express from "express";
import cors from "cors";

import { routerEstadio } from "./routes/estadio";
import { EstadioSchema } from "./schema/estadio-schema";

import cookieParser from 'cookie-parser';
import "dotenv/config";

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:9000',
  credentials: true
}));
app.use(express.json());

const db = {  EstadioSchema};

(Object.values(db) as any).forEach((schema: any) => {
  if (schema.associate) {
    schema.associate(db);
  }
});

app.use("/estadio", routerEstadio);

export default app;
