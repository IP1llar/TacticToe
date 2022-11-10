module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  })
  console.log({Users})
  return Users;
}