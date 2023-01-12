const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("vehicle", {
    JobNumber: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    JobTitle: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    JobClient: {
      type: DataTypes.STRING,
    },
    Status: {
      type: DataTypes.STRING,
      // defaultValue: "Vehiculo sin descripcion",
    },
    Charge: {
      type: DataTypes.STRING,
    },
    Wip: {
      type: DataTypes.STRING,
    },
    Task: {
      type: DataTypes.STRING,
    },
    JobHrsWorked: {
      type: DataTypes.DOUBLE,
    },
    TaskHrs: {
      type: DataTypes.DOUBLE,
    },
    TodayPlannedHrs: {
      type: DataTypes.DOUBLE,
    },
    RemainTaskHors: {
      type: DataTypes.DOUBLE,
    },
    Mon: {
      type: DataTypes.DOUBLE,
    },
    Tues: {
      type: DataTypes.DOUBLE,
    },
    Wed: {
      type: DataTypes.DOUBLE,
    },
    Thur: {
      type: DataTypes.DOUBLE,
    },
    Fri: {
      type: DataTypes.DOUBLE,
    },
    Total: {
      type: DataTypes.DOUBLE,
    },
    DateOpened: {
      type: DataTypes.DATE,
    },
    Deadline: {
      type: DataTypes.DOUBLE,
    },
    Date: {
      type: DataTypes.DATE,
    },
    AE: {
      type: DataTypes.STRING,
    },
    Employee: {
      type: DataTypes.STRING,
    },
    ExpectedDate: {
      type: DataTypes.DATE,
    },
    // wheel: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // stock: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // image: {
    //   type: DataTypes.STRING,
    //   defaultValue: "http://localhost:8081/Vehiculos/camionDefecto.png",
    // },
    // active: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    // },
  });
};
