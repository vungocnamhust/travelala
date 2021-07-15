const router = require("express").Router();
const orderController = require("../controllers/order");
const asyncFunction = require("../middlewares/async");
const authorize = require("../middlewares/authorize");
const { ROLES, ALL_ACCESS } = require("../utils/constants");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post(
  "/tours/:tourId/trips/:tripId/order",
  authorize(ROLES.USER),
  asyncFunction(orderController.newOrder)
);

router.get(
  "/orders/:orderId",
  authorize(ALL_ACCESS),
  asyncFunction(orderController.getOrder)
);

router.get(
  "/orders",
  authorize(ALL_ACCESS),
  asyncFunction(orderController.getOrders)
);

router.put(
  "/orders/:orderId",
  asyncFunction(orderController.orderPayment)
);

router.delete(
  "/orders/:orderId",
  asyncFunction(orderController.cancelOrder)
);

router.get(
  "/admin/orders",
  asyncFunction(orderController.getAllOrders)
)

module.exports = router;
// ALL access get a specific order
// user get all of order
// user only own orders
// user cancel an order
// user create new order
// user pay money

// admin get all order
