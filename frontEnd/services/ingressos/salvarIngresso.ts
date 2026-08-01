import api from '../../utils/validacao/apiConector';

export async function salvarIngresso(ingresso: any) {
  try {
    const res = await api.post('/ingresso/criarIngresso', { ingresso });
    return res.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}