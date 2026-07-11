<template>
  <q-card class="fit">
    <q-card-section>
      <div class="text-h6">
        Estadios
      </div>
      <q-card-section class="column q-gutter-md">
        <q-input dense :model-value="nomeEstadio" @update:model-value="$emit('update:nomeEstadio', String($event))" label="Nome estadio" outlined />
        <q-input dense :model-value="cidade" @update:model-value="$emit('update:cidade', String($event))" label="Cidade" outlined />
      </q-card-section>
      <q-separator />

      <div class="text-h6">
        Novo setor
      </div>
      <q-separator />

      <q-card-section class="column q-gutter-md">
        <q-input dense v-model="descricaoSetor" label="Descricao setor" outlined />
        <q-select dense v-model="posicaoSetor" :options="opcoesSetor" option-label="label" option-value="value"
          emit-value map-options label="Posição do setor" outlined />
        <q-input dense v-model.number="fileiras" type="number" label="Numero de fileiras" outlined />
        <q-input dense v-model.number="assentos" type="number" label="Assento por fileira" outlined />
        <q-btn color="primary" @click="handleCriarSetor">Adicionar setor</q-btn>
      </q-card-section>
       <q-card-section v-if="setores.length" class="q-gutter-sm">

        <div class="text-h6">Setores criados</div>

        <div v-for="setor in setores" :key="setor.posicao" class="row items-center justify-between">
          <span>{{ setor.descricao }} ({{ setor.posicao }})</span>
          <q-btn dense flat icon="delete" color="negative" @click="$emit('remover-setor', setor.posicao)" />
        </div>
              <q-separator />
              <q-btn class="q-mt-sm" color="primary" @click="$emit('salvar-estadio')">Salvar estadio</q-btn>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Setor } from '../interfaces/setor';

defineProps<{
  setores: Setor[]
  nomeEstadio: string
  cidade: string
}>()

const emit = defineEmits<{
  'update:nomeEstadio': [value: string]
  'update:cidade': [value: string]
  'criar-setor': [setor: Omit<Setor, 'letra'>]
  'remover-setor': [posicao: Setor['posicao']]
  'salvar-estadio': []
}>()

const fileiras = ref(4)
const assentos = ref(10)
const posicaoSetor = ref<Setor['posicao']>('cima')
const descricaoSetor = ref('')

const opcoesSetor = [
  { label: 'cima(norte)', value: 'cima' },
  { label: 'baixo(sul)', value: 'baixo' },
  { label: 'Esquerda(leste)', value: 'esquerda' },
  { label: 'direita(oeste)', value: 'direita' },
]

function handleCriarSetor() {
  emit('criar-setor', {
    descricao: descricaoSetor.value,
    posicao: posicaoSetor.value,
    fileiras: fileiras.value,
    assentos: assentos.value
  })
}
</script>