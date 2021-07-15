const router = require("express").Router();
const addressController = require("../controllers/address");
const asyncFunction = require("../middlewares/async");
const authorize = require("../middlewares/authorize");
const { ROLES, ALL_ACCESS } = require("../utils/constants");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get(
  "/addresses",
  authorize(ALL_ACCESS),
  asyncFunction(addressController.getAddresses) 
);

router.post(
  "/addresses",
  authorize(ROLES.ADMIN),
  asyncFunction(addressController.initAddresses) 
);

module.exports = router;
// ALL access get a specific order
// user get all of order
// user only own orders
// user cancel an order
// user create new order
// user pay money

// admin get all order
