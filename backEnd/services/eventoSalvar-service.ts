import { eventoQuery } from "../schema/evento-schema"
import { eventoInterface } from "../interfaces/eventoInterface"

export async function gravarevento(
  evento: eventoInterface,
  evento_query: eventoQuery = new eventoQuery(),
) {
  const eventoCriado = await evento_query.salvarEvento(evento)
  return eventoCriado
}

