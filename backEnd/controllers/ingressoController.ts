import { Request, Response } from "express";
import {  } from "../services/IngressoSalvar-service";

export namespace IngressoController {
  export async function salvarIngresso(req: Request, res: Response) {
    try {
      const dados = req.body.Ingresso;
      const IngressoCriado = await gravarIngresso(dados);
      res.status(201).json(IngressoCriado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: (error as Error).message });
    }
  }
}
