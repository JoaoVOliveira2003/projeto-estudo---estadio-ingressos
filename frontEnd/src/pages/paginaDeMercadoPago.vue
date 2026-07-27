<template>
  <q-btn label="Pagar" color="primary" @click="iniciarPagamento" />
  <div id="wallet_container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import api from 'app/utils/validacao/apiConector';


function carregarSdkMercadoPago(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.MercadoPago) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar SDK do Mercado Pago'));
    document.head.appendChild(script);
  });
}

onMounted(async () => {
  await carregarSdkMercadoPago();
});

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
</script>