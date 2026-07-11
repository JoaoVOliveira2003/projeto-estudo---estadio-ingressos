import { EstadioQuery } from "../schema/estadio-schema"
import { setorQuery } from "../schema/setor-schema"
import { assentoQuery } from "../schema/assento-schema"

import { EstadioInterface } from "../interfaces/estadioInterface"

export async function gravarEstadio(
  estadio: EstadioInterface,
  estadio_query: EstadioQuery = new EstadioQuery(),
  setor_query: setorQuery = new setorQuery(),
  assento_query: assentoQuery = new assentoQuery()
) {

  const estadioCriado = await estadio_query.salvarEstadio(estadio)
  const codEstadio = estadioCriado.dataValues.cod_estadio

  const setoresComCodEstadio = estadio.setores.map(setor => ({
    ...setor,
    cod_estadio: codEstadio
  }))

  const setoresCriados = await setor_query.salvarSetores(setoresComCodEstadio)

const todosAssentos = setoresCriados.flatMap((setorCriado, index) => {

  const setorOriginal = estadio.setores[index]
  const codSetor = setorCriado.dataValues.cod_setor

  const { letra, fileiras, assentos } = setorOriginal

  if (!letra || !fileiras || !assentos) {
    throw new Error(`Setor ${setorOriginal.posicao} sem letra, fileiras ou assentos definidos`)
  }

  return gerarAssentosDoSetor(codSetor, letra, fileiras, assentos)

})

  await assento_query.salvarAssentos(todosAssentos)

  return estadioCriado

}

function gerarAssentosDoSetor(codSetor: number, letra: string, fileiras: number, assentosPorFileira: number) {

  const assentosGerados = []

  for (let fila = 1; fila <= fileiras; fila++) {
    for (let numero = 1; numero <= assentosPorFileira; numero++) {

      assentosGerados.push({
        cod_setor: codSetor,
        fila: String(fila),
        desc_assento: `${letra}${fila}${numero}`
      })

    }
  }

  return assentosGerados

}