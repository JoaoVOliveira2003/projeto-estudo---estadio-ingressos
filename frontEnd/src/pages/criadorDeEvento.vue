<template>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import formularioEstadio from '../components/formularioEstadio.vue';

async function gravarEstadio() {
  const retorno = await salvarEstadio(montarPayloadEstadio())
  alert('Salvou correto')
}

</script>