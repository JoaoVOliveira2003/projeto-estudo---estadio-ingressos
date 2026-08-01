import { IngressoQuery } from "../schema/ingresso-schema"
import { ingressoInterface } from "../interfaces/ingressoInterface"

export async function gravarIngresso(
  ingresso: ingressoInterface,
  ingresso_query: IngressoQuery = new IngressoQuery(),
) {
  const ingressoCriado = await ingresso_query.salvaringresso(ingresso)
  return ingressoCriado
}

