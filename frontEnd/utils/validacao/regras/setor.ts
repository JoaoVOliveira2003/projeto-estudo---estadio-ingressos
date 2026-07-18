// eslint-disable-next-line 
type FuncaoRegra = (valor: unknown) => true | string;
type RegrasObjeto = Record<string, FuncaoRegra[]>;

export const regrasSetor: RegrasObjeto = {
  descricao_setor: [
    (valor) => !!valor || 'Descricao do setor',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Nome inválido',
  ],

  posicao_setor: [
    (valor) => !!valor || 'Posicao obrigatória',
  ],

  fileiras: [
    (valor) => valor !== null && valor !== undefined || 'Numero de fileiras obrigatório',
    (valor) => typeof valor === 'number' && valor > 0 || 'Numero de fileiras inválido',
  ],

  assento_por_fileira: [
    (valor) => valor !== null && valor !== undefined || 'Assento por fileira obrigatória',
    (valor) => typeof valor === 'number' && valor > 0 || 'Assento por fileira inválida',
  ],

};