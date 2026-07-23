import { Preference } from 'mercadopago';
import { mpClient } from '../controllers/mercadopagoController';

export async function criarPreferencia(req, res) {
  const preference = new Preference(mpClient);

  const result = await preference.create({
    body: {
      items: [{
        title: 'Assento Setor A',
        quantity: 1,
        unit_price: 100,
      }],
      back_urls: {
        success: 'http://localhost:9000/sucesso',
        failure: 'http://localhost:9000/falha',
        pending: 'http://localhost:9000/pendente',
      },
      auto_return: 'approved',
    }
  });

  res.json({ preferenceId: result.id });
}