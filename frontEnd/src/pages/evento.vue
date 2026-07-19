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
import Estadio from '../components/estadio.vue';

const nomeEstadio = ref('')
const cidade = ref('')
const evento = ref('')
const estadio = ref('')
const assentos = ref('')
let setores = ref<setorInterface[]>([])
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(async () =>{
  const codEvento = Number(route.params.cod_evento)
  evento.value = await carregarDadosEvento(codEvento)
  estadio.value = evento.value.evento_estadio;
  setores.value = evento.value.evento_estadio.setores
  assentos.value = evento.value.evento_estadio.setores.assentos
})



</script>