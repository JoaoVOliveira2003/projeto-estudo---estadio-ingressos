import type {Setor} from '../interfaces/setor'

export interface EstadioPayload {
  nome: string
  cidade: string
  setores: Setor[]
}