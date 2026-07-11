import {Router} from "express";
import { estadioController } from '../controllers/estadioController';

export const routerEstadio = Router();

routerEstadio.post("/criarEstadio",async(req,res)=> await estadioController.salvarEstadio(req,res));
routerEstadio.get("/ola", async (req, res) => res.send("ola"));


export default routerEstadio