import api from 'app/utils/validacao/apiConector';

export async function iniciarPagamento(dados : any) {
  const { data } = await api.post('/mercadoPago/criar-preferencia', dados);

  const mp = new window.MercadoPago('APP_USR-d165e2d2-da4e-4ba4-bee2-7f818c85ed73');

  const bricksBuilder = mp.bricks();

  await bricksBuilder.create('wallet', 'wallet_container', {
    initialization: {
      preferenceId: data.preferenceId,
    },
  });
}