import {Router} from "express";
import { ingressoController } from '../controllers/ingressoController';

export const routerIngress = Router();

routerIngress.post("/criarIngress",async(req,res)=> await ingressoController.salvaringresso(req,res));
routerIngress.get("/",async(req,res)=> await ingressoController.getTodosIngresos(req,res));

export default routerIngress