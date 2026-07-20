<template>
  <q-dialog :model-value="modelValue" @update:model-value="fechar" persistent>
    <q-card style="width: 400px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ etapa === 'dados' ? 'Confirme seus dados' : 'Ingresso gerado!' }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense @click="fechar" />
      </q-card-section>

      <q-card-section>
        <q-banner dense class="bg-grey-2 text-grey-9 q-mb-md">
          Setor <strong>{{ setor?.desc_setor }}</strong> —
          Fileira <strong>{{ assento?.fila }}</strong> —
          Assento <strong>{{ assento?.desc_assento }}</strong>
        </q-banner>
<br>
        <!-- Tela 1: dados do comprador -->
        <q-form v-if="etapa === 'dados'" @submit.prevent="avancar" class="q-gutter-md">
          <q-input
            v-model="form.nome"
            label="Nome completo"
            filled
            dense
            required
          />

          <q-input
            v-model="form.cpf"
            label="CPF"
            filled
            dense
            mask="###.###.###-##"
            required
          />

          <q-input
            v-model="form.dataNascimento"
            label="Data de nascimento"
            type="date"
            filled
            dense
            required
          />

          <q-btn
            type="submit"
            label="Continuar"
            color="primary"
            class="full-width"
            unelevated
          />
        </q-form>

        <!-- Tela 2: QR Code -->
        <div v-else-if="etapa === 'qrcode'" class="column items-center q-gutter-md">
          <q-img :src="qrCodeUrl" width="220px" ratio="1" />

          <div class="text-caption text-grey-7">
            {{ form.nome }} — CPF {{ form.cpf }}
          </div>

          <q-btn
            label="Fechar"
            color="primary"
            class="full-width"
            unelevated
            @click="fechar"
          />
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