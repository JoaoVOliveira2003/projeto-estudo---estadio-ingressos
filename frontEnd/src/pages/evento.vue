<template>
  <q-page class="row" style="height: 100vh">
    <div class="col-12" style="height: 100%">
      <Estadio :setores="setores" :nome-estadio="nomeEstadio" :cidade="cidade" />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { carregarDadosEstadio } from '../../services/estadios/getDadosEstadio'
import type { setorInterface } from '../interfaces/setorInterface.js';
import type { EstadioInterface } from '../interfaces/estadioInterface.js';

import Estadio from '../components/estadio.vue';

const setores = ref<setorInterface[]>([])
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(async () =>{
  const codEvento = Number(route.params.cod_evento)
  Estadio.value = await carregarDadosEstadio(codEvento)
})

const nomeEstadio = ref('')
const cidade = ref('')

function montarPayloadEstadio(): EstadioInterface {
  return {
    desc_estadio: nomeEstadio.value,
    cidade: cidade.value,
    setores: setores.value
  }
}

</script>