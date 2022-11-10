module.exports = (sequelize, DataTypes) => {
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
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)) // TODO: change history to numbers
    },
    incentives: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    results: {
      allowNull: false,
      type: DataTypes.JSONB
    }
  })
  return Ais;
}