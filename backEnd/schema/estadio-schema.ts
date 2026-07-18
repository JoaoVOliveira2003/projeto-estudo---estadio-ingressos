import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";
import { EstadioInterface } from "../interfaces/estadioInterface";
import { assentoSchema } from "./assento-schema";
import { setorSchema } from "./setor-schema";

export const EstadioSchema = conecta.define(
  "estadio",
  {
    cod_estadio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    desc_estadio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "estadio",
    timestamps: false,
  },
);


export class EstadioQuery {
  schema() {
    return EstadioSchema;
  }

  async salvarEstadio(estadio: EstadioInterface) {
    try {
      return await EstadioSchema.create(estadio as any);
    } catch (error) {
      throw error;
    }
  }

  async getTodosEstadios() {
    return await EstadioSchema.findAll();
  }

  async getTodosDados(cod_estadio: number) {
    return await EstadioSchema.findOne({
      where: {
        cod_estadio,
      },
      include: [
        {
          model: setorSchema,
          as: "setores",
          include: [
            {
              model: assentoSchema,
              as: "assentos",
            },
          ],
        },
      ],
    });
  }

  
}
