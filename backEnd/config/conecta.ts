import { Sequelize } from "sequelize";

export const conecta = new Sequelize(
  process.env.DB_NAME || "ingressosEstadio",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "senha",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  }
);