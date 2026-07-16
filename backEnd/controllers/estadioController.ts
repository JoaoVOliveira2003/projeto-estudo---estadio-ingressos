import { Request, Response } from "express";
import { gravarEstadio } from "../services/estadioSalvar-service";
import { getEstadio } from "../services/estadioGetDados-service";

export namespace estadioController {
  export async function salvarEstadio(req: Request, res: Response) {
    try {
      const dados = req.body.estadio;
      const estadioCriado = await gravarEstadio(dados);
      res.status(201).json(estadioCriado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: (error as Error).message });
    }
  }

  export async function getTodosEstadios(req: Request, res: Response) {
    try {
      const estadios = await getEstadio();
      res.status(201).json(estadios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: (error as Error).message });
    }
  }
}
