import { Request, Response } from "express"
import { gravarEstadio } from "../services/estadioSalvar-service";

export namespace estadioController {

  export async function salvarEstadio(req: Request, res: Response) {
    try {
      const dados = req.body.estadio

      const estadioCriado = await gravarEstadio(dados)
      

      res.status(201).json(estadioCriado)

    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: (error as Error).message })
    }
  }
  

}