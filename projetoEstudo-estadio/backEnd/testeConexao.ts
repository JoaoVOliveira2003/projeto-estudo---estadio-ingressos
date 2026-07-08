import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

async function conectar() {
  try {
    await client.connect();

    console.log("✅ Banco conectado com sucesso!");

    await client.end();
  } catch (erro) {
    console.error("❌ Erro ao conectar:");
    console.error(erro);
  }
}

conectar();