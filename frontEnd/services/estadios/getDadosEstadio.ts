import api from 'app/utils/validacao/apiConector';

export async function carregarDadosEstadio(codEvento:number) {
  try{
    const res = await api.get(`/estadio/todosDadosEstadio/${codEvento}`)
    return res.data;
  }catch(error){
    console.error('Erro ao criar estadio:', error);
  }
}