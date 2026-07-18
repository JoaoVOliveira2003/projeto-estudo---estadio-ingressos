import { regrasUsuario } from './regras/usuarios';
import { regrasEstadio } from './regras/estadio';
import { regrasSetor } from './regras/setor';
import { regrasEvento } from './regras/evento';

export const regras = {
  usuario: regrasUsuario,
  estadio: regrasEstadio,
  setor:   regrasSetor,
  evento:regrasEvento
};