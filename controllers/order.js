const orderService = require("../services/order");
const tripService = require("../services/trip");
const userService = require("../services/user");
const { generateRandomCode } = require("../utils/random");
const { ORDER_STATUS, ROLES } = require("../utils/constants");
const CustomError = require("../errors/CustomeError");
const errorCodes = require("../errors/errorCodes");
// status = booking successfully
// payment done -> status =
// orderCode = generateCode
// paymentDueDate = orderAt + 10 days || Trip.startAt - 1 days || now
const newOrder = async (req, res, next) => {
  let userId;
  let user;
  try {
    if (req.body.userId) {
      userId = req.body.userId;
      user = await userService.findUserById({ userId });
      if (!userId) {
        throw new CustomError(errorCodes.USER_NOT_EXISTS);
      }
    }

    const tripId = req.params.tripId;
    const tourId = req.params.tourId;
    console.log(userId);
    const {
      orderNote,
      totalSlots,
      totalPrice,
      paymentMode,
      email,
      phone,
      fullName,
    } = req.body;
    const trip = await tripService.getTrip(tourId, tripId);
    const expireDate = 3;
    const status = ORDER_STATUS.PENDING;
    let orderDate = new Date();
    orderDate.setDate(orderDate.getDate() + expireDate);
    let startAt = new Date(trip.startAt);
    let paymentDueDate = new Date(
      Math.min(orderDate.getTime(), startAt.getTime())
    );
    let orderCode = generateRandomCode(tourId);
    let tourName = trip.name;
    let startAddress = trip.locationStart;
    let tripCode = trip.code;
    let tripStartAt = trip.startAt;

    const orderData = {
      orderNote,
      totalSlots,
      totalPrice,
      paymentMode,
      paymentDueDate,
      status,
      orderCode,
      email,
      phone,
      fullName,
      tourName,
      startAddress,
      tripStartAt,
      tripCode,
      tripId,
    };
    const order = await orderService.newOrder(orderData, userId, tripId);
    res.send({ status: 200, message: "success" });
  } catch (e) {
    next(e);
  }
};

const getOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  orderService
    .getOrder(orderId)
    .then((order) => {
      res.send({ status: 200, order: order });
    })
    .catch((e) => {
      next(e);
    });
};

const getAllOrders = async(req, res, next) => {
  const options = {
    role: ROLES.ADMIN,
  };
  try {
    let orders = await orderService.getOrders(options);
    if (!orders) {
      orders = [];
    }

    orders = orders.map((order) => {
      let response = {
        orderId: order._id,
        orderNote: order.orderNote,
        totalSlots: order.totalSlots,
        totalPrice: order.totalPrice,
        paymentDueDate: order.paymentDueDate,
        status: order.status,
        fullName: order.fullName,
        phone: order.phone,
        email: order.email,
        tripCode: order.tripCode,
        tripName: order.tourName,
        startAddress: order.startAddress,
        tripStartAt: order.tripStartAt,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
      if (order.userId) {
        response.userId = order.userId._id;
        response.userName = order.userId.fullName;
      } else {
        response.userId = null;
      }

      return response;
    });
    res.send({ status: 200, order: orders });
  } catch (e) {
    next(e);
  }
}

const getOrders = async (req, res, next) => {
  const { role, _id } = req.user;
  const options = {
    role: role,
    userId: _id,
  };
  try {
    let orders = await orderService.getOrders(options);
    if (!orders) {
      orders = [];
    }
    orders = orders.map((order) => {
      let response = {
        orderId: order._id,
        orderNote: order.orderNote,
        totalSlots: order.totalSlots,
        totalPrice: order.totalPrice,
        paymentDueDate: order.paymentDueDate,
        status: order.status,
        fullName: order.fullName,
        phone: order.phone,
        email: order.email,
        tripCode: order.tripCode,
        tripName: order.tourName,
        startAddress: order.startAddress,
        tripStartAt: order.tripStartAt,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
      if (order.userId) {
        response.userId = order.userId;
      } else {
        response.userId = null;
      }

      return response;
    });
    res.send({ status: 200, order: orders });
  } catch (e) {
    next(e);
  }
};

const cancelOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  orderService
    .cancelOrder(orderId)
    .then((msg) => {
      res.send({ status: 200, message: msg });
    })
    .catch((e) => {
      next(e);
    });
};

// Only handle the case: user send request pay -> done
const orderPayment = async (req, res, next) => {
  const orderId = req.params.orderId;
  const { status } = req.body;
  const orderData = {
    status: status,
  };
  orderService
    .updateOrder(orderId, orderData)
    .then((msg) => {
      res.send({ status: 200, message: msg });
    })
    .catch((e) => {
      next(e);
    });
};
module.exports = {
  newOrder,
  getOrder,
  getOrders,
  cancelOrder,
  orderPayment,
  getAllOrders,
};
