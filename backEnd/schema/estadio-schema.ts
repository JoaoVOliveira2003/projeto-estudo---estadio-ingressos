import { DataTypes } from 'sequelize'
import { conecta } from '../config/conecta'

export const EstadioSchema = conecta.define(
  'estadio',
  {
    cod_estadio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    desc_estadio: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    tableName: 'estadio',
    timestamps: false
  }
)

export class EstadioQuery {
  schema() {
    return EstadioSchema
  }

  async salvarEstadio(dados: {
    desc_estadio: string
    cidade: string
    endereco: string
  }) {
    try {
      return await EstadioSchema.create(dados)
    } catch (error) {
      throw error
    }
  }
}