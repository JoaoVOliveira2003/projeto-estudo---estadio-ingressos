import { EstadioQuery } from '../schema/estadio-schema';

export async function getDadosEstadio(
  cod_estadio:number,
  estadio_query = new EstadioQuery(),
){
  const  dados = await estadio_query.getTodosDados(cod_estadio)
  return dados;
}