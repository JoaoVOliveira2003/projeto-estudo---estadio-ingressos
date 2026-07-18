import { Request, Response } from "express";
import { gravarevento } from "../services/eventoSalvar-service";
import { getEvento } from "../services/eventoGetDados-service";

export namespace eventoController {
  export async function salvarevento(req: Request, res: Response) {
    try {
      const dados = req.body.evento;
      const eventoCriado = await gravarevento(dados);
      res.status(201).json(eventoCriado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: (error as Error).message });
    }
  }

  export async function getTodosEventos(req: Request, res: Response) {
    try {
      const eventos = await getEvento();
      res.status(201).json(eventos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: (error as Error).message });
    }
  }
}
