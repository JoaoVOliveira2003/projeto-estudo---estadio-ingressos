import { DataTypes } from 'sequelize'
import { conecta } from '../config/conecta'
import { eventoInterface } from '../interfaces/eventoInterface'

export const eventoSchema = conecta.define(
  'evento',
  {
    cod_evento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cod_estadio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc_evento: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_evento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    maioridade_obrigatoria: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'evento',
    timestamps: false
  }
)

export class eventoQuery {
  schema() {
    return eventoSchema
  }

  async salvarEvento(evento: eventoInterface) {
    try {
      return await eventoSchema.create(evento as any)   
    } catch (error) {
      throw error
    }
  }

  async getTodosEventos(){
    return await eventoSchema.findAll()
  }
}