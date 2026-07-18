import api from '../../src/utils/apiConector';

export async function getTodosEventos(){
  try{
    const res = await api.get('/evento/');
    return res.data;
  }
  catch(error){
    console.error('Erro ao criar evento', error)
  }
}