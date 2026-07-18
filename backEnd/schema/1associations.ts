import { EstadioSchema } from "./estadio-schema";
import { setorSchema } from "./setor-schema";
import { assentoSchema } from "./assento-schema";

EstadioSchema.hasMany(setorSchema, {
  foreignKey: "cod_estadio",
  as: "setores",
});

setorSchema.belongsTo(EstadioSchema, {
  foreignKey: "cod_estadio",
  as: "estadio",
});

setorSchema.hasMany(assentoSchema, {
  foreignKey: "cod_setor",
  as: "assentos",
});

assentoSchema.belongsTo(setorSchema, {
  foreignKey: "cod_setor",
  as: "setor",
});