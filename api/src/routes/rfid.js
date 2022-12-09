const server = require("express").Router();
const { Op } = require("sequelize");
const { Vehicle, Rfid } = require("../db.js");
const upload = require("express-fileupload");
var XLSX = require("xlsx");

server.use(upload());

// Obtener todos los rfid
server.get("/", (_req, res, next) => {
  Rfid.findAll({ include: [Vehicle] }) //Busco todos los rfids
    .then((rfids) => {
      res.send(rfids);
    })
    .catch(next);
});

server.get("/actives", (_req, res, next) => {
  Rfid.findAll({ where: { active: true }, include: [Vehicle] }) //Busco solo los rfids marcados como activos
    .then((rfids) => {
      res.send(rfids);
    })
    .catch(next);
});

// Obtener las reviews de un vehiculo
// server.get("/:id/review", (req, res, next) => {
//   const { id } = req.params;
//   Vehicle.findByPk(id)
//     .then((vehicle) => {
//       if (!vehicle) res.status(400).send("No se encontro el Vehiculo");
//       else {
//         vehicle
//           .getReviews({ include: [Vehicle, User] })
//           .then((items) => res.status(200).send(items))
//           .catch(next);
//       }
//     })
//     .catch(next);
// });

// Modificar un rfid
server.put("/:id", (req, res, next) => {
  // console.log("req.body BACK: ", req.body);
  Rfid.findByPk(req.params.id, { include: [Vehicle] }) // Busco el rfid por clave primaria (id)
    .then((currentRfidData) => {
      // console.log("currentVehicleData: ", currentRfidData);
      if (!currentRfidData)
        return res.status(400).send("El registro no existe");
      let categories = [];
      if (req.body.vehicleId) {
        // req.body.categories.forEach((category) => {
        categories.push(parseInt(req.body.vehicleId, 10));
        // });
      }
      const {
        rfidNumber = currentRfidData.rfidNumber,
        brand = currentRfidData.brand,
        invoiceNumber = currentRfidData.invoiceNumber,
        invoiceDate = currentRfidData.invoiceDate,
        company = currentRfidData.company,
        measure = currentRfidData.measure,
        type = currentRfidData.type,
        location = currentRfidData.location,
        recapNumber = currentRfidData.recapNumber,
        image = currentRfidData.image,
        invoiceImage = currentRfidData.invoiceImage,
        vehicleId = currentRfidData.vehicleId,
        active = currentRfidData.active,
      } = req.body;
      // currentVehicleData.categories.forEach((category) => {
      // currentVehicleData
      //   .removeCategory(category.dataValues.id)
      //   .catch((err) => console.error(err));
      // });
      // categories.forEach((category) => {
      currentRfidData
        .setVehicle(req.body.vehicleId)
        .catch((err) => console.error(err));
      // });
      Rfid.update(
        {
          rfidNumber,
          brand,
          invoiceNumber,
          invoiceDate,
          company,
          measure,
          type,
          location,
          recapNumber,
          image,
          invoiceImage,
          vehicleId,
          active,
        },
        { where: { id: req.params.id } }
      )
        .then(
          () => (prod = Rfid.findByPk(req.params.id, { include: [Vehicle] }))
        )
        .then((vehi) => res.status(200).send(vehi))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});

// Modificar VARIOS rfid
server.post("/assignxls", (req, res, next) => {
  // console.log("req BACK: ", req);
  if (req.files) {
    var id = req.files.myFile.name;
    // console.log("iiiiiDDDDDD: ", id);
    // console.log("req.files: ", req.files);
    var file = req.files.myFile;
    var fileName = "assignrfids.xls";
    // console.log("fileName: ", fileName);

    file.mv("C:/Programas/" + fileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        // console.log("File Uploaded");
        var workbook = XLSX.readFile("C:/Programas/" + fileName);
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) {
          var worksheet = workbook.Sheets[y];
          //getting the complete sheet
          // console.log(worksheet);

          var headers = {};
          var data = [];
          for (z in worksheet) {
            if (z[0] === "!") continue;
            //parse out the column, row, and value
            var col = z.substring(0, 1);
            // console.log(col);

            var row = parseInt(z.substring(1));
            // console.log(row);

            var value = worksheet[z].v;
            // console.log(value);

            //store header names
            if (row == 1) {
              headers[col] = value;
              // storing the header names
              continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
          }
          //drop those first two rows which are empty
          data.shift();
          data.shift();
          // console.log("data ANTES DE MAP: ", data);
          const val = [];

          data.map((dat) => {
            // Rfid.create({
            //   rfidNumber: dat.EPC,
            // });
            // console.log("dat.EPC: ", dat.EPC);
            // Rfid.find({ id: "dat.EPC" }, { include: [Vehicle] }) // Busco el vehiculo por clave primaria (id)
            Rfid.findOne({ where: { rfidNumber: dat.EPC } })
              .then((currentRfidData) => {
                // console.log("currentVehicleData: ", currentRfidData);
                if (!currentRfidData) {
                  // console.log("NO HAYYYYYYY");
                  return res.status(400).send("El registro no existe");
                }
                currentRfidData
                  .setVehicle(id)
                  .catch((err) => console.error(err));
                Rfid.update(
                  {
                    // rfidNumber,
                    // brand,
                    // invoiceNumber,
                    // invoiceDate,
                    // company,
                    // measure,
                    // type,
                    // location,
                    // recapNumber,
                    vehicleId: id,
                    // active,
                  },
                  { where: { rfidNumber: dat.EPC } }
                )
                  .then(
                    () =>
                      (prod = Rfid.findOne(
                        { where: { rfidNumber: dat.EPC } },
                        {
                          include: [Vehicle],
                        }
                      ))
                  )
                  // .then((vehi) => console.log("vehi: ", vehi))
                  .catch((err) => console.log("err: ", err));
              })
              .catch(next);
          });
          // res.status(201).send("Correcto");
        });
      }
    });
  }
  res.status(201).send("Correcto");
});

// Verificar VARIOS rfid
server.post("/checkxls", async (req, res, next) => {
  var baseDatos = [];
  var subidos = [];
  var faltantes = [];

  if (req.files) {
    var id = req.files.myFile.name;
    console.log("iiiiiDDDDDD: ", id);
    var file = req.files.myFile;
    var fileName = "checkrfids.xls";
    file.mv("C:/Programas/" + fileName, function (err) {
      if (err) {
        // console.log(err);
        return res.status(201).send("Error");
      } else {
        var workbook = XLSX.readFile("C:/Programas/" + fileName);
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) {
          var worksheet = workbook.Sheets[y];
          //getting the complete sheet
          // console.log(worksheet);
          var headers = {};
          var data = [];
          for (z in worksheet) {
            if (z[0] === "!") continue;
            //parse out the column, row, and value
            var col = z.substring(0, 1);
            // console.log(col);
            var row = parseInt(z.substring(1));
            // console.log(row);
            var value = worksheet[z].v;
            // console.log(value);
            //store header names
            if (row == 1) {
              headers[col] = value;
              // storing the header names
              continue;
            }
            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
          }
          //drop those first two rows which are empty
          data.shift();
          data.shift();
          // console.log("data ANTES DE MAP: ", data);
          // console.log("Rfids archivo subido");
          data.map((dat) => {
            subidos.push({ Rfid: dat.EPC });
          });

          Vehicle.findByPk(id, { include: [Rfid] })
            .then((data) => {
              // console.log("Rfids base de datos")
              data.rfids.map((e) => {
                // console.log(e.dataValues.rfidNumber)
                if (e.dataValues.active) {
                  baseDatos.push(e.dataValues);
                }
              });
            })
            .finally((data) => {
              var aux;
              baseDatos.map((e) => {
                aux = false;
                subidos.map((u) => {
                  if (e.rfidNumber == u.Rfid) {
                    // console.log("soy true")
                    aux = true;
                  }
                });
                if (!aux) {
                  faltantes.push(e);
                }
              });
              // console.log("soy faltantes")
              // console.log(faltantes)
              // console.log("soy faltantes1")
              if (!faltantes[0]) {
                // console.log({exito: true,message:"Se encontraron todas las ruedas registradas en la base de datos"})
                return res.status(200).json({
                  exito: true,
                  message:
                    "Se encontraron todas las ruedas registradas en la base de datos",
                });
              } else {
                // console.log({exito: false,message:"Este vehiculo tiene ruedas asignadas que no se escanearon", listaRuedas: faltantes})
                return res.status(200).json({
                  exito: false,
                  message:
                    "Este vehiculo tiene ruedas asignadas que no se escanearon",
                  listaRuedas: faltantes,
                });
              }
            })
            .catch((e) => {
              // console.log("aa")
              console.log(e);
            });
        });
      }
    });
    // Vehicle.findByPk(id, { include: [Rfid] })
    // .then((data) =>{
    //   console.log("Rfids base de datos")
    //   data.rfids.map((e)=>{
    //     // console.log(e.dataValues.rfidNumber)
    //     if(e.dataValues.active){
    //       baseDatos.push(e.dataValues)
    //     }
    //   })
    // })
    // .finally((data)=>{

    //   console.log("soy basedatos")
    //   console.log(baseDatos)
    //   console.log("soy subidos")
    //    if(terminar){ console.log(subidos)}
    //   var aux
    //   baseDatos.map((e)=>{
    //     aux = false
    //     subidos.map((u)=>{
    //       if(e.rfidNumber == u.Rfid){
    //         console.log("soy true")
    //         aux=true
    //       }
    //     })
    //     if(!aux){
    //       faltantes.push(e)
    //     }
    //   })
    //   console.log("soy faltantes")
    //   console.log(faltantes)
    //   console.log("soy faltantes1")

    // })
  } else {
    return res.status(201).send("Error");
  }
  // res.status(201).send("Correcto");
});

// Crear/Agregar UN rfid
server.post("/", (req, res, next) => {
  const {
    rfidNumber,
    brand,
    invoiceNumber,
    invoiceDate,
    company,
    measure,
    type,
    location,
    recapNumber,
    image,
    invoiceImage,
    vehicleId,
  } = req.body;
  Rfid.create({
    rfidNumber,
    brand,
    invoiceNumber,
    invoiceDate,
    company,
    measure,
    type,
    location,
    recapNumber,
    image,
    invoiceImage,
  })
    .then((rfid) => {
      rfid.setVehicle(vehicleId).then((newData) => {
        Rfid.findByPk(rfid.dataValues.id, { include: [Vehicle] }).then(
          (rfidVehicle) => {
            res.status(201).send(rfidVehicle);
          }
        );
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(error);
    });
});

// Crear/Agregar VARIOS rfid
server.post("/xls", (req, res) => {
  // console.log("entra: ", req);
  if (req.files) {
    // console.log("req.files: ", req.files);
    var file = req.files.myFile;
    var fileName = "rfids.xls";
    // console.log("fileName: ", fileName);

    file.mv("C:/Programas/" + fileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        // console.log("File Uploaded");
        var workbook = XLSX.readFile("C:/Programas/" + fileName);
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) {
          var worksheet = workbook.Sheets[y];
          //getting the complete sheet
          // console.log(worksheet);

          var headers = {};
          var data = [];
          for (z in worksheet) {
            if (z[0] === "!") continue;
            //parse out the column, row, and value
            var col = z.substring(0, 1);
            // console.log(col);

            var row = parseInt(z.substring(1));
            // console.log(row);

            var value = worksheet[z].v;
            // console.log(value);

            //store header names
            if (row == 1) {
              headers[col] = value;
              // storing the header names
              continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
          }
          //drop those first two rows which are empty
          data.shift();
          data.shift();
          // console.log("data: ", data);
          const val = [];

          data.map((dat) => {
            Rfid.create({
              rfidNumber: dat.EPC,
            });
            // .then((rfid) => {
            //   console.log("then rfid: ", rfid);
            // })
            // .catch((error) => {
            //   console.error(error);
            //   res.status(400).send(error);
            // });
          });
          res.status(201).send("Correcto");
        });
      }
    });
  }
  res.status(200);
});

// Agregar IMAGEN
server.post("/image", (req, res) => {
  // console.log("entra Vehicles: ", req.files);
  if (req.files) {
    // console.log("req.files.mimetype: ", req.files.myFile.mimetype);
    // console.log("req.files.myFile: ", req.files.myFile);
    var file = req.files.myFile;
    var fileName = req.files.myFile.name;
    // console.log("fileName: ", fileName);
    file.mv("C:/Programas/Imagenes/Rfids/" + fileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200);
      }
    });
  }
  res.status(200);
});

// Agregar Invoice IMAGEN
server.post("/invoice", (req, res) => {
  // console.log("entra Vehicles: ", req.files);
  if (req.files) {
    // console.log("req.files.mimetype: ", req.files.myFile.mimetype);
    // console.log("req.files.myFile: ", req.files.myFile);
    var file = req.files.myFile;
    var fileName = req.files.myFile.name;
    // console.log("fileName: ", fileName);
    file.mv("C:/Programas/Imagenes/Facturas/" + fileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200);
      }
    });
  }
  res.status(200);
});

// Obtener los rfid ELIMINADOS
server.get("/deleted", (req, res, next) => {
  Rfid.findAll({ where: { active: false }, include: [Vehicle] })
    .then((rfids) => {
      res.send(rfids);
    })
    .catch(next);
});

// Obtener los vehiculos pertenecientes a X categoria
server.get("/vehicle/:id", (req, res, next) => {
  Vehicle.findByPk(req.params.id, { include: [Rfid] }).then((data) => {
    res.status(200).send(data);
  });
});

// Obtener un rfid en base a ID
server.get("/:id", (req, res, next) => {
  Rfid.findByPk(req.params.id, { include: [Vehicle] })
    .then((rfid) => {
      if (!rfid) res.status(400).send("No existe el rfid");
      else res.status(200).send(rfid);
    })
    .catch(next);
});

// Obtener vehiculo segun keyword de busqueda
server.get("/search/:id", (req, res, next) => {
  const query = req.params.id;
  Rfid.findAll({
    where: {
      [Op.or]: {
        rfidNumber: {
          [Op.like]: `%${query}%`,
        },
        brand: {
          [Op.like]: `%${query}%`,
        },
        type: {
          [Op.like]: `%${query}%`,
        },
      },
    },
    include: [Vehicle],
  })
    .then((data) => res.status(200).send(data))
    .catch(next);
});

// Eliminar un rfid
server.delete("/:id", (req, res, next) => {
  Rfid.findByPk(req.params.id)
    .then((rfid) => {
      if (!rfid) return res.status(400).send("El registro no existe");
      Rfid.update({ active: false }, { where: { id: req.params.id } })
        .then(() => (rf = Rfid.findByPk(req.params.id)))
        .then((rf) => res.status(200).send(rf))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});
module.exports = server;
