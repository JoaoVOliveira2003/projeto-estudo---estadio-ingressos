import {setorInterface} from "./setorInterface"

export interface EstadioInterface {
  cod_estadio:number
  desc_estadio: string
  cidade: string
  setores?: setorInterface[]
}