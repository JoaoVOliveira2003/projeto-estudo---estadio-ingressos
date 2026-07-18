import type { EstadioInterface } from '../../src/interfaces/estadioInterface';
import api from '../../utils/validacao/apiConector';

export async function salvarEstadio(estadio: EstadioInterface) {
  try {
    const res = await api.post('/estadio/criarEstadio', { estadio });
    return res.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}