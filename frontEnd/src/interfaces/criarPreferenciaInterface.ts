export interface CriarPreferenciaRequest {
  id: string
  titulo: string
  quantidade: number
  valorUnitario: number
}

export interface CriarPreferenciaResponse {
  preferenceId: string
}