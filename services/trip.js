const CustomError = require("../errors/CustomeError");
const Trip = require("../models/trip");
const Tour = require("../models/tour");
const errorCodes = require("../errors/errorCodes");
const orderService = require("../services/order");
const { generateRandomCode } = require("../utils/random");

const getTrips = async (options) => {
  const { tourId, startAt, startPoint, endPoint } = options;
  let trips = [];

  if (tourId) {
    trips = await Trip.find({ tourId: tourId }).populate("tourId").exec();
    return trips;
  }
  trips = await Trip.find({}).populate("tourId").exec();

  if (startAt) {
    trips = trips.filter((trip) => {
      let x = new Date(startAt);
      let y = new Date(trip.startAt);

      return x.getTime() <= y.getTime();
    });
  }

  if (startPoint) {
    trips = trips.filter((trip) =>
      trip.tourId.startAddress.province
        .toLowerCase()
        .includes(startPoint.trim().toLowerCase())
    );
  }

  if (endPoint) {
    trips = trips.filter((trip) =>
      trip.tourId.endAddress.province
        .toLowerCase()
        .includes(endPoint.trim().toLowerCase())
    );
  }
  console.log("Result: " + trips);
  trips = trips.map((trip) => {
    let startAt = new Date(trip.startAt);
    let endAt = new Date(trip.endAt);
    let last = Math.ceil(
      (endAt.getTime() - startAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    let s = Math.floor(Math.random() * 2);
    let transport = "Máy bay";
    if (s == 0) {
      transport = "Xe du lịch";
    } else if (s == 1) {
      transport = "Xe khách, máy bay";
    }
    return {
      name: trip.tourId.name,
      code: trip.code,
      tourId: trip.tourId._id,
      tripId: trip._id,
      price: trip.price,
      startAt: trip.startAt,
      endAt: trip.endAt,
      last: last + " ngày",
      desc: trip.desc,
      transport: trip.transport,
      thumbnail: trip.thumbnail,
      locationStart: trip.tourId.startAddress.province,
    };
  });
  return trips;
};

const insertTrips = async (tripsData, tourId) => {
  return await Promise.all(
    tripsData.map((tripData) => insertTrip(tripData, tourId))
  );
};

const insertTrip = async (tripData, tourId) => {
  tripData.code = generateRandomCode(tourId);
  tripData.tourId = tourId;
  console.log("Trip data: " + tripData);
  let tour = await Tour.findOne({ _id: tourId });
  console.log("Tour: " + tour);
  if (!tour) throw new CustomError(errorCodes.TOUR_NOT_EXISTS);
  tripData.tourId = tourId;
  if (!tripData.transport) {
    tripData.transport = generateTransport();
  }
  let trip = await Trip.create(tripData);
  console.log("TRIP: " + trip);
  await Tour.findOneAndUpdate(
    { _id: tourId },
    { $push: { tripIds: trip._id } }
  );
  return trip;
};

const generateTransport = () => {
  let s = Math.floor(Math.random() * 2);
  let transport = "Máy bay";
  if (s == 0) {
    transport = "Xe du lịch";
  } else if (s == 1) {
    transport = "Xe khách, máy bay";
  }
  return transport;
};

const updateTrip = async (tripData, tourId) => {
  console.log("Trip data: " + tripData);
  let tour = await Tour.findOne({ _id: tourId });
  if (!tour) throw new CustomError(errorCodes.TOUR_NOT_EXISTS);
  let options = { new: true };
  let trip = await Trip.findOneAndUpdate(
    { _id: tripData.id, tourId: tourId },
    tripData,
    options
  );
  console.log("TRIP: " + trip.desc);
  return trip;
};

const getTrip = async (tourId, tripId) => {
  let trip = await Trip.findOne({ _id: parseInt(tripId), tourId: tourId })
    .populate("tourId")
    .populate("tripIds")
    .exec();
  if (!trip) {
    throw new CustomError(errorCodes.TRIP_NOT_FOUND);
  }
  let relatedTripIds = trip.tourId.tripIds;
  let relatedTrips = [];
  for (var id of Object.keys(relatedTripIds)) {
    if (id !== tripId) {
      let relatedTrip = await Trip.findOne({
        _id: parseInt(relatedTripIds[id]),
        tourId: tourId,
      })
        .populate("tourId")
        .exec();
      if (!relatedTrip) {
        continue;
      }
      let last = generateTripLong(relatedTrip);
      relatedTrips.push({
        name: relatedTrip.tourId.name,
        code: relatedTrip.code,
        tourId: relatedTrip.tourId._id,
        tripId: relatedTrip._id,
        desc: relatedTrip.desc,
        price: relatedTrip.price,
        startAt: relatedTrip.startAt,
        endAt: relatedTrip.endAt,
        last: last + " ngày",
        transport: relatedTrip.transport,
        thumbnail: relatedTrip.thumbnail,
        locationStart: relatedTrip.tourId.startAddress.province,
      });
    }
  }

  let last = generateTripLong(trip);
  return {
    name: trip.tourId.name,
    code: trip.code,
    tourId: trip.tourId._id,
    price: trip.price,
    startAt: trip.startAt,
    endAt: trip.endAt,
    last: last + " ngày",
    transport: trip.transport,
    thumbnail: trip.thumbnail,
    desc: trip.desc,
    locationStart: trip.tourId.startAddress.province,
    relatedTrips: relatedTrips,
  };
};

const generateTripLong = (trip) => {
  // Generate transport
  let startAt = new Date(trip.startAt);
  let endAt = new Date(trip.endAt);
  let last = Math.ceil(
    (endAt.getTime() - startAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  return last;
};

const deleteTrip = async (tourId, tripId) => {
  const orderExist = await orderService.checkOrderExistWithTrip([tripId]);
  console.log(orderExist);
  if (orderExist) {
    throw new CustomError(errorCodes.TRIP_ALREADY_BOOKED);
  }
  await Trip.deleteOne({ _id: parseInt(tripId), tourId: tourId });
};

const getTripById = async (tripId) => {
  let trip = await Trip.findOne({ _id: parseInt(tripId)})
    .populate("tourId")
    .populate("tripIds")
    .exec();
  if (!trip) {
    throw new CustomError(errorCodes.TRIP_NOT_FOUND);
  }
  return trip;
};

module.exports = {
  getTrips,
  insertTrips,
  insertTrip,
  getTrip,
  updateTrip,
  deleteTrip,
  getTripById,
};
