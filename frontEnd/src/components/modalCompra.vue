<template>
  <q-dialog :model-value="modelValue" @update:model-value="fechar" persistent>
    <q-card style="width: 750px; max-width: 95vw;">
      <q-card-section class="row items-center">
        <div class="text-h6">
          {{ etapa === 'dados' ? 'Confirme seus dados' : 'Ingresso gerado!' }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense @click="fechar" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-banner dense rounded class="bg-grey-2 text-grey-9 text-center q-mb-lg">
          <strong>{{ setor?.desc_setor }}</strong>
          • Fileira <strong>{{ assento?.fila }}</strong>
          • Assento <strong>{{ assento?.desc_assento }}</strong>
        </q-banner>

        <q-form v-if="etapa === 'dados'" @submit.prevent="avancar">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input v-model="form.nome" label="Nome completo" filled dense required />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="form.cpf" label="CPF" filled dense mask="###.###.###-##" required />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="form.dataNascimento" label="Data de nascimento" type="date" filled dense required />
            </div>
          </div>
          <div class="row justify-end q-mt-xl">
            <q-btn type="submit" label="Continuar" color="primary" unelevated style="min-width: 180px;" />
          </div>
        </q-form>
        <!-- Etapa 2 -->
        <div v-else-if="etapa === 'qrcode'" class="column items-center">
          <q-img :src="qrCodeUrl" width="240px" ratio="1" class="q-mb-md" />
          <div class="text-subtitle1 text-center">
            <strong>{{ form.nome }}</strong>
          </div>
          <div class="text-grey-7 q-mb-lg">
            CPF {{ form.cpf }}
          </div>
          <q-btn label="Fechar" color="primary" unelevated style="min-width: 180px;" @click="fechar" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { setorInterface } from '../interfaces/setorInterface'
import type { assentoInterface } from '../interfaces/assentoInterface'

const props = defineProps<{
  modelValue: boolean
  setor: setorInterface | null
  assento: assentoInterface | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

type Etapa = 'dados' | 'qrcode'

const etapa = ref<Etapa>('dados')

const form = ref({
  nome: '',
  cpf: '',
  dataNascimento: ''
})

watch(() => props.modelValue, (aberto) => {
  if (aberto) {
    etapa.value = 'dados'
    form.value = { nome: '', cpf: '', dataNascimento: '' }
  }
})

const qrCodeUrl = computed(() => {
  const conteudo = JSON.stringify({
    cod_assento: props.assento?.cod_assento,
    cod_setor: props.setor?.cod_setor,
    nome: form.value.nome,
    cpf: form.value.cpf
  })

  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(conteudo)}`
})

function avancar() {
  etapa.value = 'qrcode'
}

function fechar() {
  emit('update:modelValue', false)
}
</script>