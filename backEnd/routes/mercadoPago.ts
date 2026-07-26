import { Router } from 'express';
import { pagamentoController } from '../controllers/mercadopagoController';

export const mercadoPagoRouter = Router();

mercadoPagoRouter.post('/criar-preferencia', pagamentoController.criarPreferencia);
mercadoPagoRouter.post('/webhook', pagamentoController.webhook);

export default mercadoPagoRouter