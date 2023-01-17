const server = require("express").Router();
const { Op } = require("sequelize");
// const { Vehicle, Category, Review, User } = require("../db.js");
const { Vehicle, Category } = require("../db.js");
const upload = require("express-fileupload");

server.use(upload());

// Obtener todos los vehuculos
server.post("/monday", (req, res, next) => {
  // console.log("req.body BACK: ", req.body);
  res.send({ vehicles: 15 });
  // Vehicle.findAll({ include: [Category] }) //Busco todos los vehiculos
  //   .then((vehicles) => {
  //     res.send(vehicles);
  //   })
  //   .catch(next);
});

server.get("/actives", (_req, res, next) => {
  Vehicle.findAll({ where: { active: true }, include: [Category] }) //Busco solo los vehiculos marcados como activos
    .then((vehicles) => {
      res.send(vehicles);
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

// Modificar un vehiculo
server.put("/:id", (req, res, next) => {
  // console.log("req.body BACK: ", req.body);
  Vehicle.findByPk(req.params.id, { include: [Category] }) // Busco el vehiculo por clave primaria (id)
    .then((currentVehicleData) => {
      // console.log("currentVehicleData: ", currentVehicleData);
      if (!currentVehicleData)
        return res.status(400).send("El registro no existe");
      let categories = [];
      if (req.body.categoryId) {
        // req.body.categories.forEach((category) => {
        categories.push(parseInt(req.body.categoryId, 10));
        // });
      }
      const {
        plate = currentVehicleData.plate,
        name = currentVehicleData.name,
        description = currentVehicleData.description,
        image = currentVehicleData.image,
        active = currentVehicleData.active,
      } = req.body;
      // currentVehicleData.categories.forEach((category) => {
      // currentVehicleData
      //   .removeCategory(category.dataValues.id)
      //   .catch((err) => console.error(err));
      // });
      // categories.forEach((category) => {
      currentVehicleData
        .setCategory(req.body.categoryId)
        .catch((err) => console.error(err));
      // });
      Vehicle.update(
        { plate, name, description, image, active },
        { where: { id: req.params.id } }
      )
        .then(
          () =>
            (prod = Vehicle.findByPk(req.params.id, { include: [Category] }))
        )
        .then((vehi) => res.status(200).send(vehi))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});

// Eliminar registros de fecha recibida
server.post("/eliminarFecha", (req, res, next) => {
  // console.log("log: 🚀  req.body: ", req.body);

  var { Date } = req.body;

  server.delete("/eliminarFecha", (req, res, next) => {
    // console.log("log: 🚀  req.params.id: ", req.params.id);

    // console.log("log: 🚀  Date: ", Date);
    const query = req.params.id;
    Vehicle.findAll({
      where: {
        Date: {
          [Op.gte]: moment().subtract(7, "days").toDate(),
        },
      },
    })
      .then((data) => {
        // console.log("data: ".data);
        res.status(200).send(data);
      })
      .catch(next);

    // Vehicle.findAll({
    //   where: {
    //     [Op.or]: {
    //       Date: {
    //         [Op.like]: `%${Date}%`,
    //       },
    //       // name: {
    //       //   [Op.like]: `%${query}%`,
    //       // },
    //       // description: {
    //       //   [Op.like]: `%${query}%`,
    //       // },
    //     },
    //   },
    //   // include: [Category],
    // })
    //   .then((data) => {
    //     console.log("data: ".data);
    //     res.status(200).send(data);
    //   })
    //   .catch(next);

    //************************ ESTO ESTABA ANTES ************************//
    // Vehicle.findByPk(req.params.id)
    //   .then((vehicle) => {
    //     if (!vehicle) return res.status(400).send("El registro no existe");
    //     Vehicle.update({ active: false }, { where: { id: req.params.id } })
    //       .then(() => (vehi = Vehicle.findByPk(req.params.id)))
    //       .then((vehi) => res.status(200).send(vehi))
    //       .catch((err) => res.status(400).send(err));
    //   })
    //   .catch(next);
  });
});

// Crear/Agregar un vehiculo
server.post("/", (req, res, next) => {
  var {
    JobNumber,
    JobTitle,
    JobClient,
    Status,
    Charge,
    Wip,
    Task,
    JobHrsWorked,
    TaskHrs,
    TodayPlannedHrs,
    RemainTaskHors,
    Mon,
    Tues,
    Wed,
    Thur,
    Fri,
    Total,
    DateOpened,
    Deadline,
    Date,
    AE,
    Employee,
    ExpectedDate,
  } = req.body;
  // console.log("JobNumber", JobNumber);
  // console.log(
  //   "🚀 ~ file: vehicle.js ~ line 140 ~ server.post ~ req.body",
  //   req.body
  // );
  // console.log("typeOf Mon: ", typeof +Mon);
  // var  = req.body.Date.slice(0, 9);
  // data.boards[i].name.slice(-8);

  // console.log("DateEE: ", Date);
  // console.log("typeOf date: ", typeof Date);
  // var parts = Date.split("-");
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  // var mydate = new Date(date[2], date[1], date[0]);
  // mydate.setFullYear(mydate.getFullYear() + 100);

  // var a = +date[2] + 2000 + "-" + date[1] + "-" + date[0];
  // console.log("a: ", a);
  // var mydate = moment(a);

  // console.log("myDate: ", mydate);
  // console.log("typeOf myDate: ", typeof mydate);

  // console.log("req.body: ", req.body);

  var JobHrsWorked = Mon * 1;
  var TaskHrs = TaskHrs * 1;
  var TodayPlannedHrs = TodayPlannedHrs * 1;
  var RemainTaskHors = RemainTaskHors * 1;
  var Mon = Mon * 1;
  var Tues = Tues * 1;
  var Wed = Wed * 1;
  var Thur = Thur * 1;
  var Fri = Fri * 1;
  var Total = Total * 1;
  // console.log("log: 🚀  Total: ", Total);
  var Deadline = Deadline * 1;
  // console.log("monday: ", Mon);

  Vehicle.create({
    JobNumber,
    JobTitle,
    JobClient,
    Status,
    Charge,
    Wip,
    Task,
    JobHrsWorked,
    TaskHrs,
    TodayPlannedHrs,
    RemainTaskHors,
    Mon,
    Tues,
    Wed,
    Thur,
    Fri,
    Total,
    DateOpened,
    Deadline,
    Date,
    AE,
    Employee,
    ExpectedDate,
  })
    .then((vehicle) => {
      // vehicle.setCategory(categories).catch((err) => console.error(err));
      res.status(201).send("ok");
      // vehicle.setCategory(categories).then((newData) => {
      //   // console.log("newData: ", newData);
      //   Vehicle.findByPk(vehicle.dataValues.id, { include: [Category] }).then(
      //     (vehicleCategory) => {
      //       // console.log("vehicleCategory INCLUDE CAT: ", vehicleCategory);
      //       res.status(201).send(vehicleCategory);
      //     }
      //   );
      // });
    })
    .catch((error) => {
      // console.log("error: ", error);
      res.status(400).send(error);
    });
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

    file.mv("C:/Programas/Imagenes/Vehiculos/" + fileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200);
      }
    });
  }

  res.status(200);
});

// Crear/Agregar review
// server.post("/:id/review", (req, res, next) => {
//   var idReview;
//   const { review, calification, userId } = req.body;
//   Product.findByPk(req.params.id)
//     .then((product) => {
//       if (!product) res.status(400).send("Producto invalido");
//       else {
//         product
//           .createReview({
//             review,
//             calification,
//           })
//           .then((newReviewItem) => {
//             newReviewItem.setProduct(req.params.id).then(() => {
//               newReviewItem.setUser(userId).then(() => {
//                 idReview = newReviewItem.dataValues.id;
//                 Review.findByPk(idReview, {
//                   include: [Product, User],
//                 }).then((newC) => {
//                   res.status(201).send(newC);
//                 });
//               });
//             });
//           })
//           .catch(next);
//       }
//     })
//     .catch(next);
// });

// Obtener los vehiculos ELIMINADOS
server.get("/deleted", (req, res, next) => {
  Vehicle.findAll({ where: { active: false }, include: [Category] })
    .then((vehicles) => {
      res.send(vehicles);
    })
    .catch(next);
});
// Obtener los vehiculos pertenecientes a X categoria
server.get("/category/:id", (req, res, next) => {
  Category.findByPk(req.params.id, { include: [Vehicle] }).then((data) =>
    res.status(200).send(data)
  );
});
// Obtener un vehiculo en base a ID
server.get("/:id", (req, res, next) => {
  Vehicle.findByPk(req.params.id, { include: [Category] })
    .then((vehicle) => {
      if (!vehicle) res.status(400).send("No existe el vehiculo");
      else res.status(200).send(vehicle);
    })
    .catch(next);
});

// Obtener vehiculo segun keyword de busqueda
server.get("/search/:id", (req, res, next) => {
  const query = req.params.id;
  Vehicle.findAll({
    where: {
      [Op.or]: {
        plate: {
          [Op.like]: `%${query}%`,
        },
        name: {
          [Op.like]: `%${query}%`,
        },
        description: {
          [Op.like]: `%${query}%`,
        },
      },
    },
    include: [Category],
  })
    .then((data) => res.status(200))
    .catch(console.log(e));
});

// Eliminar Date para que no haya duplicados
server.post("/deleteDate", (req, res, next) => {
  const { Date } = req.body;
  // console.log("log: 🚀  req.body 2: ", req.body);
  // res.status(200).send(Date);
  // productId = req.params.id;
  // id = req.params.idReview;
  Vehicle.destroy({ where: { Date } })
    .then(() => res.status(200).send(id))
    .catch(next);
});

module.exports = server;

// // Eliminar Review
// server.delete("/:id/review/:idReview", (req, res, next) => {
//   const { userId } = req.body;
//   productId = req.params.id;
//   id = req.params.idReview;
//   Review.destroy({ where: { productId }, where: { userId }, where: { id } })
//     .then(() => res.status(200).send(id))
//     .catch(next);
// });
