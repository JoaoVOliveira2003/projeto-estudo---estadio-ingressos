import {Router} from "express";
import { IngressoController } from '../controllers/ingressoController';

export const routerIngress = Router();

routerIngress.post("/criarIngresso",async(req,res)=> await IngressoController.salvarIngresso(req,res));

export default routerIngress