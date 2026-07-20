<template>
  <q-page class="row" style="height: 100vh">
    <div class="col-12" style="height: 100%">
      <Estadio
       :setores="setores"
       :nome-estadio="nomeEstadio"
       :cidade="cidade" />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { carregarDadosEvento } from '../../services/eventos/getTodosDadosEvento'
import type { setorInterface } from '../interfaces/setorInterface.js';
import type { EstadioInterface } from '../interfaces/estadioInterface.js';
import type { eventoInterface } from '../interfaces/eventoInterface';

import Estadio from '../components/estadio.vue';

import { useRoute } from 'vue-router'

const route = useRoute()

const evento = ref<eventoInterface | null>(null)
const estadio = ref<EstadioInterface | null>(null)
const nomeEstadio = ref('')
const cidade = ref('')
const setores = ref<setorInterface[]>([])

onMounted(async () => {
  const codEvento = Number(route.params.cod_evento)

  evento.value = await carregarDadosEvento(codEvento)

  if (!evento.value) return

  estadio.value = evento.value.evento_estadio
  nomeEstadio.value = estadio.value.desc_estadio
  cidade.value = estadio.value.cidade
  setores.value = estadio.value.setores ?? []
  console.log(setores.value)
})



</script>