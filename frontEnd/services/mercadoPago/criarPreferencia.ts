import api from 'app/utils/validacao/apiConector';

async function iniciarPagamento() {
  const { data } = await api.post('/mercadoPago/criar-preferencia', {
    id: 'assento-01',
    titulo: 'Assento Setor A',
    quantidade: 1,
    valorUnitario: 100,
  });

  const mp = new window.MercadoPago('APP_USR-d165e2d2-da4e-4ba4-bee2-7f818c85ed73');

  const bricksBuilder = mp.bricks();

  await bricksBuilder.create('wallet', 'wallet_container', {
    initialization: {
      preferenceId: data.preferenceId,
    },
  });
}