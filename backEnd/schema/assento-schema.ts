import { DataTypes } from 'sequelize'
import { conecta } from '../config/conecta'
import { assentoInterface } from '../interfaces/assentoInterface'
import { setorSchema } from "./setor-schema";


export const assentoSchema = conecta.define(
  'assento',
  {
    cod_assento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cod_setor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fila: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    desc_assento: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  },
  {
    tableName: 'assento',
    timestamps: false
  }
)


export class assentoQuery {
  schema() {
    return assentoSchema
  }

async salvarAssentos(assentos: Omit<assentoInterface, 'cod_assento'>[]) {
  try {
    const assentosParaCriar = assentos.map(assento => {
      const { cod_setor, fila, desc_assento } = assento
      return { cod_setor, fila, desc_assento }
    })

    return await assentoSchema.bulkCreate(assentosParaCriar)
  } catch (error) {
    throw error
  }
}

}