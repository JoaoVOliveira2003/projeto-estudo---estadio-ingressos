import { assentoInterface } from "./assentoInterface"

export interface setorInterface {
  descricao: string
  posicao: 'cima' | 'baixo' | 'esquerda' | 'direita'
  fileiras: number
  assentos: [assentoInterface]
}

