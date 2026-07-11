import type { EstadioInterface } from '../../interfaces/estadio';
import api from '../../src/utils/apiConector';

export async function salvarEstadio(estadio: EstadioInterface) {
  try {
    const res = await api.post('/estadio/criarEstadio', { estadio });
    return res.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}