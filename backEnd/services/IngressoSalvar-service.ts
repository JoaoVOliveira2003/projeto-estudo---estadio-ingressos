import { ingressoQuery } from "../schema/ingresso-schema"
import { ingressoInterface } from "../interfaces/ingressoInterface"

export async function gravarIngresso(
  ingresso: ingressoInterface,
  ingresso_query: ingressoQuery = new ingressoQuery(),
) {
  const ingressoCriado = await ingresso_query.salvarIngresso(ingresso)
  return ingressoCriado
}

