<template>
olá mundo
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getEstadios } from '../../services/estadios/getTodosEstadios'

onMounted(async () => {
  await mostrarDados()
})

async function mostrarDados() {
  const dados = await getEstadios()
  console.log(JSON.stringify(dados, null, 2))
}

</script>