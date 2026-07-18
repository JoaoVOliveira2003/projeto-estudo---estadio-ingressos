type FuncaoRegra = (valor: unknown) => true | string;
type RegrasObjeto = Record<string, FuncaoRegra[]>;

export const regrasEstadio: RegrasObjeto = {
  nomeEstadio: [
    (valor) => !!valor || 'Nome obrigatório',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Nome inválido',
  ],

  cidade: [
    (valor) => !!valor || 'Cidade obrigatório',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Nome inválido',
  ],
};