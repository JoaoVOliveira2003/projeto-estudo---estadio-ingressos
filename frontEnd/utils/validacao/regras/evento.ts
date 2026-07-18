type FuncaoRegra = (valor: unknown) => true | string;
type RegrasObjeto = Record<string, FuncaoRegra[]>;

export const regrasEvento: RegrasObjeto = {
  titulo: [
    (valor) => !!valor || 'Titulo é obrigatório',
    (valor) =>
      (typeof valor === 'string' && valor.trim().length >= 3) ||
      'O nome deve possuir no mínimo 3 caracteres',
  ],

  descricao: [
    (valor) => !!valor || 'Descrição é obrigatória',
    (valor) =>
      (typeof valor === 'string' && valor.trim().length >= 3) ||
      'A descrição deve possuir no mínimo 3 caracteres',
  ],

  cod_estadio: [
    (valor) =>
      (valor !== null && valor !== undefined && valor !== '') ||
      'Selecione um estádio',
  ],

  data_evento: [
    (valor) => !!valor || 'A data do evento é obrigatória',
  ],

  maioridade_obrigatoria: [
    (valor) =>
      valor !== null && valor !== undefined ||
      'Informe se o evento exige maioridade',
  ],
};