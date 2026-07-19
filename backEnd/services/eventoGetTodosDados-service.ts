import { eventoQuery } from '../schema/evento-schema';

export async function getDadosEvento(
  cod_Evento:number,
  evento_query= new eventoQuery(),
){
  const  dados = await evento_query.getTodosDados(cod_Evento)
  return dados;
}