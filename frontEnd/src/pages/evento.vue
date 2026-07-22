<template>
  <q-page class="row" style="height: 100vh">
    <div class="col-12" style="height: 100%">
      <Estadio :setores="setores" :nome-estadio="nomeEstadio" @selecionar-assento="clicarAssento" :cidade="cidade" />
    </div>
  </q-page>
  <ModalCompraIngresso v-model="modalAberto" :setor="setorSelecionado" :assento="assentoSelecionado" />
</template>
<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { carregarDadosEvento } from '../../services/eventos/getTodosDadosEvento'
import type { setorInterface } from '../interfaces/setorInterface.js';
import type { EstadioInterface } from '../interfaces/estadioInterface.js';
import type { eventoInterface } from '../interfaces/eventoInterface';
import ModalCompraIngresso from '../components/modalCompra.vue'
import Estadio from '../components/estadio.vue';
import type { assentoInterface } from '../interfaces/assentoInterface';

import { useRoute } from 'vue-router'

const route = useRoute()
const modalAberto = ref(false)
const setorSelecionado = ref<setorInterface | null>(null)
const assentoSelecionado = ref<assentoInterface | null>(null)
const evento = ref<eventoInterface | null>(null)
const estadio = ref<EstadioInterface | null>(null)
const nomeEstadio = ref('')
const cidade = ref('')
const setores = ref<setorInterface[]>([])

onMounted(async () => {
  const codEvento = Number(route.params.cod_evento)
  evento.value = await carregarDadosEvento(codEvento)
  estadio.value = evento.value?.evento_estadio ?? null
  nomeEstadio.value = estadio.value?.desc_estadio ?? ''
  cidade.value = estadio.value?.cidade ?? ''
  setores.value = estadio.value?.setores ?? []
})

function clicarAssento(setor: setorInterface, assento: assentoInterface) {
  setorSelecionado.value = setor
  assentoSelecionado.value = assento
  modalAberto.value = true
}

</script>