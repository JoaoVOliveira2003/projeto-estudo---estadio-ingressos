import {Router} from "express";
import { estadioController } from '../controllers/estadioController';

export const routerEstadio = Router();

routerEstadio.post("/criarEstadio",async(req,res)=> await estadioController.salvarEstadio(req,res));
routerEstadio.get("/",async(req,res)=> await estadioController.getTodosEstadios(req,res));


export default routerEstadio