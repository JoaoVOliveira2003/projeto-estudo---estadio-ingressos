export interface Setor {
  descricao: string
  posicao: 'cima' | 'baixo' | 'esquerda' | 'direita'
  fileiras: number
  assentos: number
}