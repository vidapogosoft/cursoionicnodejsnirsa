const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productostock', {
    idproductostock: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idproducto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cantidadingresos: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cantidadegresos: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stockactual: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'productostock',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "productostock_pkey",
        unique: true,
        fields: [
          { name: "idproductostock" },
        ]
      },
    ]
  });
};
