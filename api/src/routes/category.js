const server = require("express").Router();
const { Category } = require("../db.js");
const bodyparser = require("body-parser");

server.use(bodyparser.json({ extended: true }));

server.get("/", (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      res.send(categories);
    })
    .catch(next);
});

server.post("/", (req, res, next) => {
  Category.create({ name: req.body.name, description: req.body.description })
    .then((category) => {
      res.status(201).send(category);
    })
    .catch(next);
});
// server.get("/actives", (req, res, next) => {
//   Category.findAll({ where: { active: true } })
//     .then((categories) => {
//       res.send(categories);
//     })
//     .catch(next);
// });

server.put("/:id", (req, res, next) => {
  let cat;
  Category.findByPk(req.params.id)
    .then((currentCategory) => {
      if (!currentCategory) res.status(400).send("No existe categoría");
      const {
        name = currentCategory.name,
        description = currentCategory.description,
        // active = currentCategory.active,
      } = req.body;
      Category.update({ name, description }, { where: { id: req.params.id } })
        .then(() => (cat = Category.findByPk(req.params.id)))
        .then((cat) => res.status(200).send(cat))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});
// server.delete("/:id", (req, res, next) => {
//   let cat;
//   Category.findByPk(req.params.id)
//     .then((category) => {
//       if (!category) return res.status(400).send("La categoria no existe");
//       Category.update({ active: false }, { where: { id: req.params.id } })
//         .then(() => (cat = Category.findByPk(req.params.id)))
//         .then((cat) => res.status(200).send(cat))
//         .catch((err) => res.status(400).send(err));
//     })
//     .catch(next);
// });
module.exports = server;
