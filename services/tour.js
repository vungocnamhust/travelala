const CustomError = require("../errors/CustomeError");
const Tour = require("../models/tour");
const Trip = require("../models/trip");
const errorCodes = require("../errors/errorCodes");
const { Address } = require("../models/address");

const getTours = async () => {
  let tours = await Tour.find({});
  return tours;
};

const getToursInfo = async () => {
  let tours = await Tour.find({});
  console.log(tours);
  tours = tours.map((tour) => {
    return {
      id: tour._id,
      name: tour.name,
    }
  })
  return tours;
};

const insertTours = async (toursData) => {
  return await Promise.all(toursData.map((tourData) => insertTour(tourData)));
};

const insertTour = async (tourData) => {
  let tourName = "";
  let tour = new Tour({
    name: tourData["name"],
    desc: tourData["desc"],
  });

  let startAddress = new Address({
    province: tourData["startAddress"]["province"],
    district: tourData["startAddress"]["district"],
    type: tourData["startAddress"]["type"],
  });
  let endAddress = new Address({
    province: tourData["endAddress"]["province"],
    district: tourData["endAddress"]["district"],
    type: tourData["endAddress"]["type"],
  });

  let points = tourData["points"].map((pointData) => {
    if (!tourName) {
      tourName = pointData["name"];
    } else {
      tourName += ` - ${pointData["name"]}`;
    }
    point = new Address({
      name: pointData["name"],
      type: pointData["type"],
      street: pointData["street"],
      district: pointData["district"],
      province: pointData["province"],
    });
    return point;
  });

  tour.name = tourData["startAddress"]["province"] + " - " + tourData["endAddress"]["province"] + ": " + tourName;
  tour.startAddress = startAddress;
  tour.endAddress = endAddress;
  tour.points = points;
  let newTour = await tour.save();
  return newTour;
};

const updateTour = async (tourData) => {
  let tourName = "";
  if (!tourData["id"]) {
    throw new CustomError(errorCodes.BAD_REQUEST, "MISSING_PARAM_ID");
  }
  let tour = await Tour.findOne({ _id: parseInt(tourData["id"]) });
  if (!tour) throw new CustomError(errorCodes.TOUR_NOT_EXISTS);

  tour.name = tourData["name"];
  tour.desc = tourData["desc"];

  let startAddress = new Address({
    province: tourData["startAddress"]["province"],
    district: tourData["startAddress"]["district"],
    type: tourData["startAddress"]["type"],
  });
  let endAddress = new Address({
    province: tourData["endAddress"]["province"],
    district: tourData["endAddress"]["district"],
    type: tourData["endAddress"]["type"],
  });

  let points = tourData["points"].map((pointData) => {
    if (!tourName) {
      tourName = pointData["name"];
    } else {
      tourName += ` - ${pointData["name"]}`;
    }
    point = new Address({
      name: pointData["name"],
      type: pointData["type"],
      street: pointData["street"],
      district: pointData["district"],
      province: pointData["province"],
    });
    return point;
  });

  tour.name = tourData["startAddress"]["province"] + " - " + tourData["endAddress"]["province"] + ": " + tourName;
  tour.startAddress = startAddress;
  tour.endAddress = endAddress;
  tour.points = points;
  let newTour = await tour.save();
  return newTour;
};

const getTour = async (tourId) => {
  let tour = await Tour.findOne({ _id: parseInt(tourId) });
  if (!tour) {
    throw new CustomError(errorCodes.TOUR_NOT_EXISTS);
  }
  return tour;
};

// TODO: Handle delete trip
const deleteTour = async (tourId) => {
  tour = await Tour.findOne({_id: parseInt(tourId)});
  trip = await Trip.deleteMany({ _id: { $in: tour.tripIds }});
  await Tour.deleteOne({ _id: parseInt(tourId) });
};

module.exports = {
  getTours,
  insertTours,
  insertTour,
  getTour,
  updateTour,
  deleteTour,
  getToursInfo,
};
