module.exports = (sequelize:any, DataTypes:any) => {
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
  return Users;
}

export type User = {
  id?: string,
  email?:string,
  firstName?:string,
  lastName?:string,
  password?:string
}