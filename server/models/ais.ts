module.exports = (sequelize:any, DataTypes:any) => {
  const Ais = sequelize.define('Ai', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    states: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    history: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER))
    },
    incentives: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    results: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    color: {
      allowNull: false,
      type: DataTypes.STRING
    }
  })
  return Ais;
}
export type ai = {
  id: string
  name:string,
  states: {
    [state:string] : number[]
  },
  history: number[][],
  incentives: incentive,
  results: result,
  color: string 
}

type result = {
  win: number,
  draw: number,
  lose: number
}
type incentive = {
  win: number,
  draw: number,
  lose: number
}