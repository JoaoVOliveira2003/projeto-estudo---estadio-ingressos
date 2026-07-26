import { Request, Response } from 'express';
import { pagamentoService } from '../services/mercadoPago-service';

export const pagamentoController = {
  async criarPreferencia(req: Request, res: Response) {
    try {
      const { titulo, quantidade, valorUnitario } = req.body;

      const result = await pagamentoService.criarPreferencia({
        titulo,
        quantidade,
        valorUnitario,
      });

      res.json({ preferenceId: result.id });
    } catch (error) {
      console.error('Erro ao criar preferência:', error);
      res.status(500).json({ erro: 'Erro ao criar preferência de pagamento' });
    }
  },

  async webhook(req: Request, res: Response) {
    try {
      const { data } = req.body;

      if (data?.id) {
        const pagamento = await pagamentoService.consultarPagamento(data.id);
        console.log('Status do pagamento:', pagamento.status);
        // aqui entra a lógica de atualizar o pedido/ingresso no banco via Sequelize
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('Erro no webhook:', error);
      res.sendStatus(500);
    }
  },
};