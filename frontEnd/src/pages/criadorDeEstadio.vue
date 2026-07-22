<template>
  <q-page class="row" style="height: 100vh">
    <div class="col-3">
      <formularioEstadio 
      :setores="setores" 
      :nome-estadio="nomeEstadio" 
      :cidade="cidade"
      @update:nome-estadio="nomeEstadio = $event" 
      @update:cidade="cidade = $event" 
      @criar-setor="criarSetor"
      @remover-setor="removerSetor"
      @salvar-estadio="gravarEstadio" />
    </div>
    <div class="col-9" style="height: 100%">
      <Estadio :setores="setores" :nome-estadio="nomeEstadio" :cidade="cidade" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import formularioEstadio from '../components/formularioEstadio.vue';
import Estadio from '../components/estadio.vue';
import type { setorInterface } from '../interfaces/setorInterface.js';
import type { EstadioInterface } from '../interfaces/estadioInterface.js';
import { salvarEstadio } from '../../services/estadios/salvarEstadio'

const nomeEstadio = ref('')
const cidade = ref('')
const setores = ref<setorInterface[]>([])
const LETRA_SETOR: Record<setorInterface['posicao'], 'c' | 'b' | 'e' | 'd'> = {
  cima: 'c',
  baixo: 'b',
  esquerda: 'e',
  direita: 'd',
}

function criarSetor(novoSetor: Omit<setorInterface, 'letra'>) {

  if (setores.value.find(setor => setor.posicao === novoSetor.posicao)) {
    return;
  }

  setores.value.push({
    ...novoSetor,
    letra: LETRA_SETOR[novoSetor.posicao]
  })

}


function removerSetor(posicao: setorInterface['posicao']) {
  setores.value = setores.value.filter(setor => setor.posicao !== posicao)
}

function montarPayloadEstadio(): EstadioInterface {
  return {
    desc_estadio: nomeEstadio.value,
    cidade: cidade.value,
    setores: setores.value
  }
}

async function gravarEstadio() {
  const retorno = await salvarEstadio(montarPayloadEstadio())
  alert('Salvou correto')
}

</script>