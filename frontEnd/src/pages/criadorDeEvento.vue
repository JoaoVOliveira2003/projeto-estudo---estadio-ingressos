<template>
  <q-page class="row justify-center items-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Cadastro de evento
        </div>
      </q-card-section>
      <hr>
      <q-card-section>
        <q-input v-model="desc_evento" label="Titulo" outlined class="q-mb-md" :rules="regras.evento.titulo" hide-bottom-space/>
        <q-input v-model="descricao" label="Descricao" outlined class="q-mb-md" :rules="regras.evento.descricao" hide-bottom-space/>
        <q-select v-model="cod_estadio" :options="estadios" option-label="desc_estadio" option-value="cod_estadio"
        emit-value map-options label="Escolha o estadio" outlined class="q-mb-md" :rules="regras.evento.cod_estadio" hide-bottom-space/>
        <q-input v-model="data_evento" label="Data evento" outlined class="q-mb-md" type="datetime-local"  hide-bottom-space :rules="regras.evento.data_evento"/>
        <q-select v-model="maioridade_obrigatoria" :options="opcoesMaioridade" option-label="label" hide-bottom-space
        option-value="value"  emit-value map-options label="Maioridade nescessaria" outlined class="q-mb-md" :rules="regras.evento.maioridade_obrigatoria" />
        <q-btn label="Salvar" color="primary" @click="chamarSalvarEvento" /> </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getEstadios } from '../../services/estadios/getTodosEstadios'
import type { eventoInterface } from 'src/interfaces/eventoInterface';
import type { EstadioInterface } from 'src/interfaces/estadioInterface';
import { salvarEvento } from '../../services/eventos/salvarEvento'
import { regras } from '../../utils/validacao/regras'

const opcoesMaioridade = [
  {
    label: 'Sim',
    value: true
  },
  {
    label: 'Não',
    value: false
  }
]

const cod_estadio = ref(0)
const desc_evento = ref('')
const descricao = ref('')
const data_evento = ref('')
const maioridade_obrigatoria = ref(false)
const estadios = ref<EstadioInterface[]>([])

onMounted(async () => {
  estadios.value = await getEstadios()
})

async function chamarSalvarEvento() {
  const evento: eventoInterface = {
    desc_evento: desc_evento.value,
    descricao: descricao.value,
    cod_estadio: cod_estadio.value,
    data_evento: data_evento.value,
    maioridade_obrigatoria: maioridade_obrigatoria.value
  }
  const retorno = await salvarEvento(evento)
  alert('salvou correto' + retorno)
}
</script>