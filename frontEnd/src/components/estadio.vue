<template>
  <div ref="containerRef" class="estadio-container" @wheel.prevent="zoomMouse" @mousedown="iniciarDrag"
    @mousemove="drag" @mouseup="pararDrag" @mouseleave="pararDrag">
    <div class="info-estadio">
      <div class="nome-estadio">
        {{ nomeEstadio }}
      </div>

      <div class="cidade-estadio">
        {{ cidade }}
      </div>
    </div>

    <div class="estadio" :style="{
      transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${zoom})`
    }">
      <div v-for="setor in setores" :key="setor.cod_setor ?? setor.posicao" :class="['setor', setor.posicao]">
        <!-- Zoom pequeno -->
        <template v-if="zoom < 1.5">
          <div class="nome-setor">
            {{ setor.desc_setor }}
          </div>
        </template>

        <!-- Zoom médio -->
        <template v-else-if="zoom < 2.5">
          <div v-for="linha in setor.fileiras" :key="linha" class="fileira" />
        </template>

        <!-- Zoom grande -->
        <template v-else>
          <div v-for="(assentosFileira, fileira) in fileirasPorSetor[setor.cod_setor ?? setor.posicao]" :key="fileira"
            class="fileira-cadeiras">
            <div class="cadeira" v-for="assento in assentosFileira" :key="assento.cod_assento"
              @click="clicarAssento(setor, assento)"></div>
          </div>
        </template>
      </div>

      <div class="campo">
        CAMPO
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import 'src/css/estadio.scss'

import { ref, computed } from 'vue';
import type { setorInterface } from '../interfaces/setorInterface';
import type { assentoInterface } from '../interfaces/assentoInterface';

const props = defineProps<{
  setores: setorInterface[]
  nomeEstadio: string
  cidade: string
}>()

const fileirasPorSetor = computed(() => {
  const mapa: Record<string | number, Record<string, assentoInterface[]>> = {}

  for (const setor of props.setores) {
    const chave = setor.cod_setor ?? setor.posicao

    if (setor.assentos_setor?.length) {
      mapa[chave] = agruparPorFileira(setor.assentos_setor)
    } else {
      mapa[chave] = gerarAssentosTemporarios(setor)
    }
  }

  return mapa
})

function gerarAssentosTemporarios(setor: setorInterface): Record<string, assentoInterface[]> {
  const resultado: Record<string, assentoInterface[]> = {}

  for (let fila = 1; fila <= setor.fileiras!; fila++) {
    const numeroFila = String(fila)

    resultado[numeroFila] = []

    // for (let cadeira = 1; cadeira <= setor.assentos; cadeira++) {
    for (let cadeira = 1; cadeira <= setor.assentos!.length; cadeira++) {

      resultado[numeroFila].push({
        cod_assento: cadeira,
        fila: numeroFila
      } as assentoInterface)
    }
  }

  return resultado
}

function agruparPorFileira(assentos: assentoInterface[]): Record<string, assentoInterface[]> {
  return assentos.reduce((acc, assento) => {
    if (!acc[assento.fila]) acc[assento.fila] = []
    acc[assento.fila].push(assento)
    return acc
  }, {} as Record<string, assentoInterface[]>)
}

const emit = defineEmits<{
  (e: 'selecionar-assento', setor: setorInterface, assento: assentoInterface): void
}>()

function clicarAssento(setor: setorInterface, assento: assentoInterface) {
  emit('selecionar-assento', setor, assento)
}

const zoom = ref(1)
const ZOOM_MIN = 0.5
const ZOOM_MAX = 4
const PASSO_ZOOM = 0.03
const ESTADIO_WIDTH = 1000
const ESTADIO_HEIGHT = 600
const offsetX = ref(0)
const offsetY = ref(0)
const arrastando = ref(false)
const ultimoX = ref(0)
const ultimoY = ref(0)
const containerRef = ref<HTMLElement | null>(null)

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