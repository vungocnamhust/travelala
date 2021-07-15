const CustomError = require("../errors/CustomeError");
const errorCodes = require("../errors/errorCodes");
const orderService = require("../services/order");
const tourService = require("../services/tour");

const insertTours = async (req, res, next) => {
  const { tours } = req.body;
  tourService.insertTours(tours).then((tours) => {
    res.send({ status: 200, tours: tours });
  }).catch((e) => {
    next(e);
  });
};

const insertTour = async (req, res, next) => {
  const tour = req.body;
  tourService.insertTour(tour).then((tour) => {
    res.send({ status: 200, tour: tour });
  }).catch((e) => {
    next(e);
  });
};

const updateTour = async (req, res, next) => {
  let tour = req.body;
  tour.id = req.params.id;
  tourService.updateTour(tour).then((tour) => {
    res.send({ status: 200, tour: tour });
  }).catch((e) => {
    next(e);
  });
};

const getTour = async (req, res, next) => {
  const tourId = req.params.id;
  tourService.getTour(tourId).then((tour) => {
    res.send({ status: 200, tour: tour });
  }).catch((e) => {
    next(e);
  });
};

const getTours = async (req, res, next) => {
  tourService.getTours().then((tours) => {
    res.send({ status: 200, tour: tours });
  }).catch((e) => {
    next(e);
  });
};

const getToursInfo = async (req, res, next) => {
  tourService.getToursInfo().then((tours) => {
    res.send({ status: 200, tour: tours });
  }).catch((e) => {
    next(e);
  });
};

const deleteTour = async (req, res, next) => {
  try {
    const tourId = req.params.id;
    const tour = await tourService.getTour(tourId);
    const tripIds = tour.tripIds;
    const orderExist = await orderService.checkOrderExistWithTrip(tripIds);
    if (orderExist) {
      throw new CustomError(errorCodes.TOUR_ALREADY_BOOKED);
    }
    await tourService.deleteTour(tourId)
    res.send({ status: 200 });
  } catch(e) {
    next(e);
  };
};

module.exports = {
  insertTours,
  insertTour,
  updateTour,
  getTour,
  getTours,
  deleteTour,
  getToursInfo,
};
