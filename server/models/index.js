const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  logging: false // TODO: enable for prod?
});

const db = {};
db.Users = require('./users')(sequelize, Sequelize.DataTypes);
db.Ais = require('./ais')(sequelize, Sequelize.DataTypes);

db.Users.hasMany(db.Ais);
db.Ais.belongsTo(db.Users);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;