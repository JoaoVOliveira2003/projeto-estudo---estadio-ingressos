import {setorInterface} from "../interfaces/setor"

export interface EstadioInterface {
  cod_estadio:number
  desc_estadio: string
  cidade: string
  setores?: setorInterface[]
}