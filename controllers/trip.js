const tripService = require("../services/trip");
const orderService = require("../services/order");
const CustomError = require("../errors/CustomeError");
const errorCodes = require("../errors/errorCodes");

const insertTrips = async (req, res, next) => {
  const { trips } = req.body;
  const tourId = req.params.tourId;

  tripService
    .insertTrips(trips, tourId)
    .then((trips) => {
      res.send({ status: 200, trips: trips });
    })
    .catch((e) => {
      next(e);
    });
};

const insertTrip = async (req, res, next) => {
  let trip = req.body;
  const tourId = req.params.tourId;
  try {
    let response = await tripService.insertTrip(trip, tourId);
    res.send({ status: 200, trip: response });
  } catch (e) {
    next(e);
  }
};

const updateTrip = async (req, res, next) => {
  let trip = req.body;
  trip.id = req.params.tripId;
  let tourId = req.params.tourId;
  tripService
    .updateTrip(trip, tourId)
    .then((trip) => {
      res.send({ status: 200, trip: trip });
    })
    .catch((e) => {
      next(e);
    });
};

const getTrip = async (req, res, next) => {
  const tripId = req.params.tripId;
  const tourId = req.params.tourId;
  tripService
    .getTrip(tourId, tripId)
    .then((trip) => {
      res.send({ status: 200, trip: trip });
    })
    .catch((e) => {
      next(e);
    });
};

const getAllTrips = async (req, res, next) => {
  const { startAt, startPoint, endPoint } = req.query;
  const options = {
    startAt: startAt,
    startPoint: startPoint,
    endPoint: endPoint,
  };
  tripService
    .getTrips(options)
    .then((trips) => {
      res.send({ status: 200, trips: trips });
    })
    .catch((e) => {
      next(e);
    });
};

const getTrips = async (req, res, next) => {
  const tourId = req.params.tourId;
  const options = {
    tourId: tourId,
  };
  tripService
    .getTrips(options)
    .then((trips) => {
      res.send({ status: 200, trips: trips });
    })
    .catch((e) => {
      next(e);
    });
};

const deleteTrip = async (req, res, next) => {
  const tripId = req.params.tripId;
  const tourId = req.params.tourId;
  try {
    const orderExist = await orderService.checkOrderExistWithTrip([tripId]);
    console.log(orderExist);
    if (orderExist) {
      throw new CustomError(errorCodes.TRIP_ALREADY_BOOKED);
    }
    await tripService.deleteTrip(tourId, tripId);
    res.send({ status: 200 });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  insertTrips,
  insertTrip,
  updateTrip,
  getTrip,
  getAllTrips,
  getTrips,
  deleteTrip,
};
