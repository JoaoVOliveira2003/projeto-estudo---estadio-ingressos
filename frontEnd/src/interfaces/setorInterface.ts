import { assentoInterface } from "./assentoInterface"

export interface setorInterface {
  cod_setor:number
  desc_setor: string
  cod_estadio:number
  posicao: 'cima' | 'baixo' | 'esquerda' | 'direita'
  assentos?: [assentoInterface]
  letra?: 'c' | 'b' | 'e' | 'd'
  fileiras?: number
}

export interface SetorCriacaoInterface {
  desc_setor: string
  posicao: 'cima' | 'baixo' | 'esquerda' | 'direita'
  fileiras: number
  assentos: number 
}