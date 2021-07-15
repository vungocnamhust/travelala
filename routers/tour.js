const router = require("express").Router();
const tourController = require("../controllers/tour");
const asyncFunction = require("../middlewares/async");
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const { ROLES, ALL_ACCESS } = require("../utils/constants");
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post(
  "/admin/tours",
  authorize(ROLES.ADMIN),
  asyncFunction(tourController.insertTours)
);

router.post(
  "/admin/tour",
  authorize(ROLES.ADMIN),
  asyncFunction(tourController.insertTour)
);

router.get(
  "/admin/tours/:id",
  authorize(ALL_ACCESS),
  asyncFunction(tourController.getTour)
);

router.get(
  "/admin/tours",
  authorize(ALL_ACCESS),
  asyncFunction(tourController.getTours)
);

router.put(
  "/admin/tours/:id",
  authorize(ROLES.ADMIN),
  asyncFunction(tourController.updateTour)
);

router.delete(
  "/admin/tours/:id",
  authorize(ROLES.ADMIN),
  asyncFunction(tourController.deleteTour)
);

router.get(
  "/admin/toursInfo",
  authorize(ROLES.ADMIN),
  asyncFunction(tourController.getToursInfo)
)
module.exports = router;
