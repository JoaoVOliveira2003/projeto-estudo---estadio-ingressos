import api from '../../utils/validacao/apiConector';

export async function getEstadios() {
  try {
    const res = await api.get('/estadio/');
    return res.data;
  } catch (error) {
    console.error('Erro ao criar estadio:', error);
  }
}