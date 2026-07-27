import type {mercadoPagoInstance} from '../src/interfaces/mercadoPagoInterface'
import  { carregarSdkMercadoPago} from '../services/mercadoPago/mercadoPagoSdk'
import { ref } from 'vue';

const mp = ref<mercadoPagoInstance>()

async function iniciar() {
   await carregarSdkMercadoPago()
   mp.value = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY)
}

async function abrirWallet(preferenceId: string,containerId = 'wallet_container') {
   if(!mp.value){
      await iniciar()
   }

   const brickBliulder = mp.value!.bricks()
   await brickBliulder.create('wallet',containerId, {
      initialization: {
         preferenceId,
      },
   })
}

export function useMercadoPago(){
   return{
      mp,
      iniciar,
      abrirWallet
   }
}