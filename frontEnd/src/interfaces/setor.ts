
export interface Setor {
  descricao: string
  fileiras: number
  assentos: number
  posicao: 'cima' | 'baixo' | 'esquerda' | 'direita'
  letra: 'c' | 'b' | 'e' | 'd'
}