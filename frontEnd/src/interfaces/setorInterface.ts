import { assentoInterface } from "./assentoInterface"

export interface setorInterface {
  cod_setor:number
  desc_setor: string
  cod_estadio:number
  posicao: 'cima' | 'baixo' | 'esquerda' | 'direita'
  assentos?: [assentoInterface]
}

