var DataTypes = require("sequelize").DataTypes;
var _productos = require("./productos");
var _productosproveedor = require("./productosproveedor");
var _productostock = require("./productostock");
var _proveedor = require("./proveedor");

function initModels(sequelize) {
  var productos = _productos(sequelize, DataTypes);
  var productosproveedor = _productosproveedor(sequelize, DataTypes);
  var productostock = _productostock(sequelize, DataTypes);
  var proveedor = _proveedor(sequelize, DataTypes);


  return {
    productos,
    productosproveedor,
    productostock,
    proveedor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
