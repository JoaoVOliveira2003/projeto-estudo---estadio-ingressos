<template>
  <div class="seat-map-viewport" @wheel.prevent="controlarZoom" @mousedown="iniciarArraste" @mousemove="moverMapa"
    @mouseup="finalizarArraste" @mouseleave="finalizarArraste">
    <div class="seat-map-canvas"
      :style="{ transform: `translate(${deslocamento.x}px, ${deslocamento.y}px) scale(${zoom})` }">
      <!-- nível 1 (zonas cima) -->
      <div v-for="setor in setores" :key="setor.id" class="sector-block" :style="{
        left: setor.x + 'px',
        top: setor.y + 'px'
      }" @click="focarSetor(setor)">
        <span v-if="zoom < limiteZoomAssentos || setorAtivo !== setor.id">
          {{ setor.id }}
        </span>

        <!-- nível 2 dos assentos -->
        <div v-else class="seat-grid" :style="{
          gridTemplateColumns: `repeat(${setor.colunas}, 1fr)`
        }">
          <button v-for="assento in obterAssentos(setor)" :key="assento.id" class="seat-dot" :class="assento.status"
            :title="`Setor ${setor.id} · Assento ${assento.numero}`" @click.stop="selecionarAssento(setor, assento)">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

type StatusAssento = 'livre' | 'vendido' | 'reservado';

interface Assento {
  id: string
  numero: number
  status: StatusAssento
}

interface Setor {
  id: string
  x: number
  y: number
  linhas: number
  colunas: number
}

const setores = reactive<Setor[]>([
  { id: '118', x: 40, y: 40, linhas: 5, colunas: 8 },
  { id: '119', x: 220, y: 40, linhas: 5, colunas: 8 },
  { id: '117', x: 400, y: 40, linhas: 5, colunas: 8 }
])

const cacheAssentos = new Map<string, Assento[]>()

function obterAssentos(setor: Setor): Assento[] {
  if (!cacheAssentos.has(setor.id)) {
    const total = setor.linhas * setor.colunas

    const assentos = Array.from({ length: total }, (_, indice) => ({
      id: `${setor.id}-${indice + 1}`,
      numero: indice + 1,
      status: (Math.random() < 0.25 ? 'vendido' : 'livre') as StatusAssento
    }))

    cacheAssentos.set(setor.id, assentos)
  }
  return cacheAssentos.get(setor.id)!
}

//zoom

const zoom = ref(1)

const deslocamento = reactive({
  x: 0,
  y: 0
})

const limiteZoomAssentos = 2.2

const setorAtivo = ref<string | null>(null)

function controlarZoom(evento: WheelEvent) {
  const incremento = evento.deltaY > 0 ? -0.1 : 0.1
  zoom.value = Math.min(4, Math.max(0.5, zoom.value + incremento))
}

function focarSetor(setor: Setor) {
  setorAtivo.value = setor.id
  zoom.value = limiteZoomAssentos + 0.5
}

//arrasto

let arrastando = false

let ultimaPosicao = {
  x: 0,
  y: 0
}

function iniciarArraste(evento: MouseEvent) {
  arrastando = true
  ultimaPosicao = {
    x: evento.clientX,
    y: evento.clientY,
  }
}

function moverMapa(evento: MouseEvent) {
  if (!arrastando) return

  const novoX = deslocamento.x + evento.clientX - ultimaPosicao.x
  const novoY = deslocamento.y + evento.clientY - ultimaPosicao.y

  deslocamento.x = Math.min(0, Math.max(-500, novoX))
  deslocamento.y = Math.min(0, Math.max(-500, novoY))

  ultimaPosicao = {
    x: evento.clientX,
    y: evento.clientY
  }
}

function finalizarArraste() {
  arrastando = false
}


function selecionarAssento(setor: Setor, assento: Assento) {
  if (assento.status !== 'livre') return
  console.log('assento selecionado', setor.id, assento.numero)
}
</script>


<style scoped>
.seat-map-viewport {
  width: 100%;
  height: 100vh;
  min-height: 480px;
  overflow: hidden;
  position: relative;
  background: #111;
  cursor: grab;
}

.seat-map-canvas {
  position: absolute;
  transform-origin: 0 0;
  transition: transform 0.05s linear;
}

.sector-block {
  position: absolute;
  width: 160px;
  min-height: 100px;
  background: #b32020;
  color: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  font-weight: 600;
}

.seat-grid {
  display: grid;
  gap: 3px;
  width: 100%;
}

.seat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

.seat-dot.livre {
  background: #4caf50;
}

.seat-dot.vendido {
  background: #9e9e9e;
  cursor: not-allowed;
}

.seat-dot.reservado {
  background: #ffb300;
}
</style>