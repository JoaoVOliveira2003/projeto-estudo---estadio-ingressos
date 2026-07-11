import {Request, Response} from "express"
import { gravarEstadio } from "../services/estadioSalvar-service";


export namespace estadioController{

  export async function salvarEstadio(_req: Request, res: Response) {
    return 'ola'
    // const cidades = await gravarEstadio();
    // res.json(cidades);
  } 
}