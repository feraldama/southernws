const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("rfid", {
    rfidNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    invoiceDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    measure: {
      type: DataTypes.ENUM("295", "315", "1100x22"),
      // allowNull: false,
      defaultValue: "295",
    },
    type: {
      type: DataTypes.ENUM("Lisa", "Traccion"),
      // allowNull: false,
      defaultValue: "Lisa",
    },
    location: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    recapNumber: {
      type: DataTypes.ENUM("0", "1", "2", "3"),
      // allowNull: false,
      defaultValue: "0",
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "http://181.127.189.247:8081/Rfids/rfidDefecto.png",
    },
    invoiceImage: {
      type: DataTypes.STRING,
      defaultValue: "http://181.127.189.247:8081/Facturas/facturaDefecto.jpg",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
