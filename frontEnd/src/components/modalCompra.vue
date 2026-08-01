<template>
  <q-dialog :model-value="modelValue" @update:model-value="fechar" persistent>
    <q-card style="width: 750px; max-width: 95vw;">
      <q-card-section class="row items-center">
        <div class="text-h6">
          {{ etapa === 'dados' ? 'Confirme seus dados' : 'Pagar ingresso!' }}
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

        <!-- Etapa 1 -->
        <q-form v-if="etapa === 'dados'" @submit.prevent="avancar">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input
                v-model="form.nome"
                label="Nome completo"
                filled
                dense
                required
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                v-model="form.cpf"
                label="CPF"
                filled
                dense
                mask="###.###.###-##"
                required
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                v-model="form.dataNascimento"
                label="Data de nascimento"
                type="date"
                filled
                dense
                required
              />
            </div>
          </div>

          <div class="row justify-end q-mt-xl">
            <q-btn type="submit" label="Continuar" @click="realizarPagamento" color="primary" unelevated style="min-width: 180px;" />
          </div>
        </q-form>

        <!-- Etapa 2 -->
        <div v-else-if="etapa === 'pagamento'" class="column items-center">
          <div id="wallet_container"></div>

          <q-btn label="Fechar" color="primary" unelevated style="min-width: 180px;" @click="fechar" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { setorInterface } from '../interfaces/setorInterface'
import type { assentoInterface } from '../interfaces/assentoInterface'
import type { eventoInterface } from '../interfaces/eventoInterface'
import { carregarSdkMercadoPago } from '../../services/mercadoPago/mercadoPagoSdk'
import { iniciarPagamento } from '../../services/mercadoPago/criarPreferencia'
import { salvarIngresso } from '../../services/ingressos/salvarIngresso'

const props = defineProps<{
  modelValue: boolean
  setor: setorInterface | null
  assento: assentoInterface | null
  evento: eventoInterface | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

type Etapa = 'dados' | 'pagamento'

const etapa = ref<Etapa>('dados')

const form = ref({
  nome: 'João Oliveira',
  cpf: '134.326.409-00',
  dataNascimento: new Date().toISOString().slice(0, 10)
})

onMounted(async () => {
  await carregarSdkMercadoPago()
})

watch(
  () => props.modelValue,
  (aberto) => {
    if (aberto) {
      etapa.value = 'dados'
      form.value = {
        nome: 'João Oliveira',
        cpf: '134.326.409-00',
        dataNascimento: new Date().toISOString().slice(0, 10)
      }
    }
  }
)

async function avancar() {
  etapa.value = 'pagamento'
}

async function realizarPagamento() {
  const dados = {
    id: props.assento?.desc_assento,
    titulo: 'Ingresso assento:'+ props.assento?.desc_assento,
    evento: props.evento?.cod_evento,
    quantidade: 1,
    valorUnitario: props.evento?.preco
  }
  const gravado = await salvarIngresso(dados)
  if(gravado){
    const data = await iniciarPagamento(dados)
    return data
  }
  
}
function fechar() {
  emit('update:modelValue', false)
}
</script>