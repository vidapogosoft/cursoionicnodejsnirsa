const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productos', {
    idproducto: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombreproducto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    idcategoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categorias',
        key: 'idcategoria'
      }
    }
  }, {
    sequelize,
    tableName: 'productos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "productos_pkey",
        unique: true,
        fields: [
          { name: "idproducto" },
        ]
      },
    ]
  });
};
