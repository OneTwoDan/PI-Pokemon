const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    attack: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    defense: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    speed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://elvortex.com/wp-content/uploads/2018/03/HddtBOT-e1520478229723.png",
      allowNull: true,
    }

  }, {
    timestamps: false
  });
};
