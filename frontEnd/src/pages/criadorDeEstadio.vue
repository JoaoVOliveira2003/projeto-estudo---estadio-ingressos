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
      @salvar-estadio="salvarEstadio" />
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
import type { Setor } from '../interfaces/setor';
import type { EstadioPayload } from '../interfaces/estadio';

const nomeEstadio = ref('')
const cidade = ref('')
const setores = ref<Setor[]>([])

const LETRA_SETOR: Record<Setor['posicao'], Setor['letra']> = {
  cima: 'c',
  baixo: 'b',
  esquerda: 'e',
  direita: 'd',
}

function criarSetor(novoSetor: Omit<Setor, 'letra'>) {

  if (setores.value.find(setor => setor.posicao === novoSetor.posicao)) {
    return;
  }

  setores.value.push({
    ...novoSetor,
    letra: LETRA_SETOR[novoSetor.posicao]
  })

}

function removerSetor(posicao: Setor['posicao']) {
  setores.value = setores.value.filter(setor => setor.posicao !== posicao)
}

function montarPayloadEstadio(): EstadioPayload {
  return {
    nome: nomeEstadio.value,
    cidade: cidade.value,
    setores: setores.value
  }
}

function salvarEstadio() {
  console.log(montarPayloadEstadio())
}

</script>