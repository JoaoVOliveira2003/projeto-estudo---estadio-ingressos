import { Preference, Payment } from 'mercadopago';
import { mpClient } from '../utils/mercadoPago';

export const pagamentoService = {

  async criarPreferencia(dados: {
    titulo: string
    quantidade: number
    valorUnitario: number
    cod_ingresso: number
  }) {
    const preference = new Preference(mpClient)

    const result = await preference.create({
      body: {
        items: [{
          id: 'assento-' + Date.now(),
          title: dados.titulo,
          quantity: dados.quantidade,
          unit_price: dados.valorUnitario,
        }],
        external_reference: String(dados.cod_ingresso),
        notification_url: `${process.env.NGROK_URL}/mercadoPago/webhook`,
        back_urls: {
          success: 'http://localhost:9000/#/testeMercadoPago',
          failure: 'http://localhost:9000/#/testeMercadoPago',
          pending: 'http://localhost:9000/#/testeMercadoPago',
        },
      }
    })

    return result
  },

  async consultarPagamento(paymentId: string) {
    const payment = new Payment(mpClient);
    return await payment.get({ id: paymentId });
  },
};