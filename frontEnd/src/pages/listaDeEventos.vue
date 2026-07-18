<template>
  <q-page class="row justify-center items-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Lista de eventos
        </div>

        <q-table
          title="Eventos"
          :rows="eventos"
          :columns="colunas"
          row-key="cod_evento"
          :dense="$q.screen.lt.md"
          wrap-cells
        >
          <template #body-cell-acoes="props">
            <q-td :props="props">
              <q-btn
                color="primary"
                label="Ir Evento"
                @click="irEvento(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { QTableColumn } from 'quasar'
import { useRouter } from 'vue-router'

import { getTodosEventos } from '../../services/eventos/getTodosEventos'

const router = useRouter()

interface Evento {
  cod_evento: number
  cod_estadio: number
  desc_evento: string
  descricao: string
  data_evento: string
  maioridade_obrigatoria: boolean
}

const eventos = ref<Evento[]>([])

onMounted(async () => {
  eventos.value = await getTodosEventos()
})

const colunas: QTableColumn<Evento>[] = [
  {
    name: 'cod_evento',
    label: 'Código',
    field: 'cod_evento',
    align: 'left',
    sortable: true
  },
  {
    name: 'cod_estadio',
    label: 'Estádio',
    field: 'cod_estadio',
    align: 'left',
    sortable: true
  },
  {
    name: 'desc_evento',
    label: 'Título',
    field: 'desc_evento',
    align: 'left',
    sortable: true
  },
  {
    name: 'descricao',
    label: 'Descrição',
    field: 'descricao',
    align: 'left'
  },
  {
    name: 'data_evento',
    label: 'Data',
    field: 'data_evento',
    align: 'left',
    sortable: true
  },
  {
    name: 'maioridade_obrigatoria',
    label: 'Maioridade',
    field: row => (row.maioridade_obrigatoria ? 'Sim' : 'Não'),
    align: 'center',
    sortable: true
  },
  {
    name: 'acoes',
    label: 'Ações',
    field: () => '',
    align: 'center'
  }
]

function irEvento(evento: Evento) {
  router.push(`/evento/${evento.cod_evento}`)
}
</script>