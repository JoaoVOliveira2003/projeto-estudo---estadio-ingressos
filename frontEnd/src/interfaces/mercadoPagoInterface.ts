export interface mercadoPagoBrickSettings {
  initialization: {
    preferenceId: string
  }
}

export interface mercadoPagoBrickBuilder {
  create(
    brick: string,
    container: string,
    settings: mercadoPagoBrickSettings
  ): Promise<void>
}

export interface mercadoPagoInstance {
  bricks(): mercadoPagoBrickBuilder
}

declare global {
  interface Window {
    MercadoPago: new (publicKey: string) => mercadoPagoInstance
  }
}