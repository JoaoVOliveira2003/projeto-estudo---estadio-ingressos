import { DataTypes } from 'sequelize'
import { conecta } from '../config/conecta'
import { EstadioInterface } from '../interfaces/estadioInterface'

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

  async salvarEstadio(estadio: EstadioInterface) {
    try {
      return await EstadioSchema.create(estadio as any)
    } catch (error) {
      throw error
    }
  }

  async getTodosEstadios(){
    return await EstadioSchema.findAll();
  }
  
}