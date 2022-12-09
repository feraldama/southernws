const { Router } = require("express");
// import all routers;
// const authRouter = require('./auth.js');
const vehicleRouter = require("./vehicle.js");
const categoryRouter = require("./category.js");
const rfidRouter = require("./rfid");
// const cartRouter = require('./cart.js');
// const orderRouter = require('./order.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);

// router.use("/auth", authRouter);
router.use("/vehicles", vehicleRouter);
router.use("/categories", categoryRouter);
router.use("/rfids", rfidRouter);
// router.use("/cart", cartRouter);
// router.use("/orders", orderRouter);

module.exports = router;
