import { eventoQuery } from '../schema/evento-schema';

export async function getEvento(
  evento_query = new eventoQuery()
) {
  const  eventos = await evento_query.getTodosEventos();
  return eventos  
}