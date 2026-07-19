import { Request, Response } from "express";
import { gravarevento } from "../services/eventoSalvar-service";
import { getEvento } from "../services/eventoGetDados-service";
import { getDadosEvento } from "../services/eventoGetTodosDados-service";

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

  export async function getTodosDadosEvento(req: Request, res: Response) {
    try {
      const cod_evento = Number(req.params.cod_evento);
      const evento = await getDadosEvento(cod_evento);
      res.status(201).json(evento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: (error as Error).message });
    }
  }

  
}
