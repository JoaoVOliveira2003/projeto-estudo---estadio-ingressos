import {Router} from "express";
import { mpClient } from '../controllers/mercadopagoController';

export const routerEvento = Router();


const { data } = await api.post('/pagamentos/criar-preferencia');
const preferenceId = data.preferenceId;

export default routerEvento