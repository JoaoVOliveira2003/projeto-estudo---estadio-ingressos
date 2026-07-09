<template>
  <q-page class="row">
    <div class="col-3">
      <q-card class="fit">
        <q-card-section>
          <div class="text-h6">
            Novo setor
          </div>
          <q-separator />
          <q-card-section class="column q-gutter-md">
            <q-input v-model="descricaoSetor" label="Descricao setor" outlined />
            <q-select v-model="posicaoSetor" :options="opcoesSetor" option-label="label" option-value="value" emit-value
              map-options label="Posição do setor" outlined />
            <q-input v-model.number="fileiras" type="number" label="Numero de fileiras" outlined />
            <q-input v-model.number="assentos" type="number" label="Assento por fileira" outlined />
            <q-btn color="primary" @click="criarSetor">Adicionar setor</q-btn>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

<div class="col-9">
  <div class="estadio-container"
    ref="containerRef"
    @wheel.prevent="zoomMouse"
    @mousedown="iniciarDrag"
    @mousemove="drag"
    @mouseup="pararDrag"
    @mouseleave="pararDrag">

    <div
      class="estadio"
      :style="{
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${zoom})`
      }"
    >

      <div
        v-for="setor in setores"
        :key="setor.posicao"
        :class="['setor', setor.posicao]"
      >

        <!-- Zoom pequeno -->
        <template v-if="zoom < 1.5">

          <div class="nome-setor">
            {{ setor.descricao }}
          </div>

        </template>

        <!-- Zoom médio -->
        <template v-else-if="zoom < 2.5">

          <div
            v-for="linha in setor.fileiras"
            :key="linha"
            class="fileira"
          />

        </template>

        <!-- Zoom grande -->
        <template v-else>

          <div
            v-for="linha in setor.fileiras"
            :key="linha"
            class="fileira-cadeiras"
          >

            <div
              v-for="cadeira in setor.assentos"
              :key="cadeira"
              class="cadeira"
            />

          </div>

        </template>

      </div>

      <div class="campo">
        CAMPO
      </div>

    </div>

  </div>
</div>


  </q-page>
</template>
<script setup lang="ts">
import 'src/css/estadio.scss'
import type { Setor } from '../../interfaces/setor';

import { ref } from 'vue';

const zoom = ref(1)
const ZOOM_MIN = 0.5
const ZOOM_MAX = 4
const PASSO_ZOOM = 0.03

const ESTADIO_WIDTH = 800
const ESTADIO_HEIGHT = 600

const offsetX = ref(0)
const offsetY = ref(0)

const arrastando = ref(false)

const ultimoX = ref(0)
const ultimoY = ref(0)

const containerRef = ref<HTMLElement | null>(null)

const setores = ref<Setor[]>([])
const posicaoSetor = ref('cima')
const descricaoSetor = ref('')
const fileiras = ref(4)
const assentos = ref(10)

const opcoesSetor = [
  { label: 'cima(norte)', value: 'cima' },
  { label: 'baixo(sul)', value: 'baixo' },
  { label: 'Esquerda(leste)', value: 'esquerda' },
  { label: 'direita(oeste)', value: 'direita' },
]

function criarSetor() {

  if (setores.value.find(setor => setor.posicao === posicaoSetor.value)) {
    return;
  }

  setores.value.push({
    descricao: descricaoSetor.value,
    posicao: posicaoSetor.value as Setor['posicao'],
    fileiras: fileiras.value,
    assentos: assentos.value
  })
}

function limitarOffset() {

  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()

  const estadioWidth = ESTADIO_WIDTH * zoom.value
  const estadioHeight = ESTADIO_HEIGHT * zoom.value

  const maxOffsetX = Math.max((estadioWidth - rect.width) / 2, 0)
  const maxOffsetY = Math.max((estadioHeight - rect.height) / 2, 0)

  offsetX.value = Math.min(Math.max(offsetX.value, -maxOffsetX), maxOffsetX)
  offsetY.value = Math.min(Math.max(offsetY.value, -maxOffsetY), maxOffsetY)

}

function zoomMouse(event: WheelEvent) {

  if (event.deltaY < 0) {
    zoom.value += PASSO_ZOOM
  } else {
    zoom.value -= PASSO_ZOOM
  }

  zoom.value = Math.min(
    Math.max(zoom.value, ZOOM_MIN),
    ZOOM_MAX
  )

  limitarOffset()

}

function iniciarDrag(event: MouseEvent) {

  arrastando.value = true

  ultimoX.value = event.clientX
  ultimoY.value = event.clientY

}

function drag(event: MouseEvent) {

  if (!arrastando.value) return

  const deltaX = event.clientX - ultimoX.value
  const deltaY = event.clientY - ultimoY.value

  offsetX.value += deltaX
  offsetY.value += deltaY

  ultimoX.value = event.clientX
  ultimoY.value = event.clientY

  limitarOffset()

}

function pararDrag() {

  arrastando.value = false

}
</script>