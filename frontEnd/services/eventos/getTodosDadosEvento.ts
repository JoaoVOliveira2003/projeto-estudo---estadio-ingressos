import api from 'app/utils/validacao/apiConector';

export async function carregarDadosEvento(codEvento:number) {
  try{
    const res = await api.get(`/evento/todosDadosevento/${codEvento}`)
    return res.data;
  }catch(error){
    console.error('Erro ao criar evento:', error);
  }
}