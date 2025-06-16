'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
console.log(env);
const config = require(__dirname + '/../config/config.json')[env];
console.log(config);
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
};

//  console.log(sequelize);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log(model);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Producto = require('./productos')(sequelize, Sequelize.DataTypes);
db.Categoria = require('./categorias')(sequelize, Sequelize.DataTypes);

db.Producto.belongsTo(db.Categoria, { as: "categorias", foreignKey: "idcategoria" });
db.Categoria.hasMany(db.Producto, { as: "productos", foreignKey: "idcategoria" });

console.log('productos associations=>', db.Producto.associations);
console.log('categorias associations=>', db.Categoria.associations);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;