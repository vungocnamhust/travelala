const router = require("express").Router();
const tripController = require("../controllers/trip");
const asyncFunction = require("../middlewares/async");
const authorize = require("../middlewares/authorize");
const { ROLES, ALL_ACCESS } = require("../utils/constants");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post(
  "/tours/:tourId/trips",
  authorize(ROLES.ADMIN),
  asyncFunction(tripController.insertTrips)
);

router.post(
  "/tours/:tourId/trip",
  authorize(ROLES.ADMIN),
  asyncFunction(tripController.insertTrip)
);

router.get(
  "/tours/:tourId/trips",
  authorize(ALL_ACCESS),
  asyncFunction(tripController.getTrips)
);

router.get(
  "/tours/:tourId/trips/:tripId",
  authorize(ALL_ACCESS),
  asyncFunction(tripController.getTrip)
);

router.get(
  "/trips",
  authorize(ALL_ACCESS),
  asyncFunction(tripController.getAllTrips)
);

router.put(
  "/tours/:tourId/trips/:tripId",
  authorize(ROLES.ADMIN),
  asyncFunction(tripController.updateTrip)
);

router.delete(
  "/tours/:tourId/trips/:tripId",
  authorize(ROLES.ADMIN),
  asyncFunction(tripController.deleteTrip)
);

module.exports = router;
