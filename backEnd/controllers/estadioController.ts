import { Request, Response } from "express";
import { gravarEstadio } from "../services/estadioSalvar-service";
import { getEstadio } from "../services/estadioGetDados-service";
import { getDadosEstadio } from "../services/estadioGetTodosDados-service";

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

  export async function getTodosDadosEstadio(req: Request, res: Response) {
    try {
      console.log(req.params)
      const cod_estadio = Number(req.params.cod_evento)
      const estadio = await getDadosEstadio(cod_estadio);
      res.status(201).json(estadio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: (error as Error).message });
    }
  }













}
