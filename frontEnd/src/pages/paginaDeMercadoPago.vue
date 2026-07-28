<template>
  <q-btn label="Pagar" color="primary" @click="realizarPagamento" />
  <div id="wallet_container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {carregarSdkMercadoPago} from '../../services/mercadoPago/mercadoPagoSdk'
import {iniciarPagamento} from '../../services/mercadoPago/criarPreferencia'

onMounted(async () => {
  await carregarSdkMercadoPago();
});

async function realizarPagamento() {

  const dados = {
    id: 'assento-01',
    titulo: 'Assento Setor A2',
    quantidade: 1,
    valorUnitario: 100,
  }

  const data = await iniciarPagamento(dados)
  return data;
}
</script>