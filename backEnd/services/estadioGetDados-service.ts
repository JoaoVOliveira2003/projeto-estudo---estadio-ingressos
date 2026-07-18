import { EstadioQuery } from '../schema/estadio-schema';

export async function getEstadio(
  estadio_query = new EstadioQuery(),
){
  const  estadios = await estadio_query.getTodosEstadios()
  return estadios;
}