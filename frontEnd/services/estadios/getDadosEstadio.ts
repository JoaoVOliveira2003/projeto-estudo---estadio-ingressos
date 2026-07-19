import api from 'app/utils/validacao/apiConector';

export async function carregarDadosEstadio(codEstadio:number) {
  try{
    const res = await api.get(`/estadio/todosDadosEstadio/${codEstadio}`)
    return res.data;
  }catch(error){
    console.error('Erro ao criar estadio:', error);
  }
}