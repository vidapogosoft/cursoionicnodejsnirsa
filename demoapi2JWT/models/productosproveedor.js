const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productosproveedor', {
    idproductoproveedor: {
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
    idproveedor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'productosproveedor',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "productosproveedor_pkey",
        unique: true,
        fields: [
          { name: "idproductoproveedor" },
        ]
      },
    ]
  });
};
