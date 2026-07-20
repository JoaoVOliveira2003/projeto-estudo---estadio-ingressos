import type { EstadioInterface } from './estadioInterface'

export interface eventoInterface {
  cod_evento: number
  cod_estadio: number
  desc_evento: string
  descricao: string
  data_evento: string
  maioridade_obrigatoria: boolean

  evento_estadio: EstadioInterface
}