import {Router} from "express";
import { eventoController } from '../controllers/eventoController';

export const routerEvento = Router();

routerEvento.post("/criarEvento",async(req,res)=> await eventoController.salvarevento(req,res));
routerEvento.get("/",async(req,res)=> await eventoController.getTodosEventos(req,res));


export default routerEvento