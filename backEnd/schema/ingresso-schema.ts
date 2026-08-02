import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";
import { ingressoInterface } from "../interfaces/ingressoInterface";

export const ingressoSchema = conecta.define(
  "ingresso",
  {
    cod_ingresso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cod_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cod_assento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cod_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_compra: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    codigo_qrcode: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "ingresso",
    timestamps: false,
  },
);

export class ingressoQuery {
  schema() {
    return ingressoSchema;
  }

  async salvarIngresso(ingresso: Omit<ingressoInterface, "cod_ingresso">) {
    try {
      return await ingressoSchema.create(ingresso);
    } catch (error) {
      throw error;
    }
  }

  async atualizarStatus(cod_ingresso: number, codStatus: number) {
    try {
      return await ingressoSchema.update(
        { cod_status: codStatus },
        { where: { cod_ingresso: cod_ingresso } }
      );
    } catch (error) {
      throw error;
    }
  }


}
