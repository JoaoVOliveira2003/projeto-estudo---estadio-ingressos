import { DataTypes } from 'sequelize'
import { conecta } from '../config/conecta'
import { setorInterface } from '../interfaces/setorInterface'
import { EstadioSchema } from "./estadio-schema";
import { assentoSchema } from "./assento-schema";


export const setorSchema = conecta.define(
  'setor',
  {
    cod_setor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cod_estadio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc_setor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    posicao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  },
  {
    tableName: 'setor',
    timestamps: false
  }
)

export class setorQuery {
  schema() {
    return setorSchema
  }

async salvarSetores(setores: setorInterface[]) {
    try {
      const setoresParaCriar = setores.map(setor => {
        const { cod_estadio, desc_setor,  posicao } = setor
        return { cod_estadio, desc_setor, posicao }
      })

      return await setorSchema.bulkCreate(setoresParaCriar)
    } catch (error) {
      throw error
    }
  }

}