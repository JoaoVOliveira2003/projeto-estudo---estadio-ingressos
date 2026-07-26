import { Preference, Payment } from 'mercadopago';
import { mpClient } from '../utils/mercadoPago';

export const pagamentoService = {
  async criarPreferencia(dados: { titulo: string; quantidade: number; valorUnitario: number }) {
    const preference = new Preference(mpClient);

    const result = await preference.create({
      body: {
        items: [{
          id: 'assento-' + Date.now(),
          title: dados.titulo,
          quantity: dados.quantidade,
          unit_price: dados.valorUnitario,
        }],
        back_urls: {
          success: 'http://localhost:9000/#/testeMercadoPago',
          failure: 'http://localhost:9000/#/testeMercadoPago',
          pending: 'http://localhost:9000/#/testeMercadoPago',
        },
        // auto_return: 'approved',
      }
    });

    return result;
  },

  async consultarPagamento(paymentId: string) {
    const payment = new Payment(mpClient);
    return await payment.get({ id: paymentId });
  },
};