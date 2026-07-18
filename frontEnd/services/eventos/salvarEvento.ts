import type {eventoInterface  } from '../../src/interfaces/eventoInterface';
import api from '../../utils/validacao/apiConector';

export async function salvarEvento(evento: eventoInterface) {
  try {
    const res = await api.post('/evento/criarEvento', { evento });
    return res.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}