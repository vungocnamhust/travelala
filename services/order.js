const CustomError = require("../errors/CustomeError");
const Order = require("../models/order");
const errorCodes = require("../errors/errorCodes");
const { Address } = require("../models/address");
const { ORDER_STATUS, ROLES } = require("../utils/constants");

const getOrders = async (options) => {
  const { role, userId } = options;
  let orders;
  if (role === ROLES.USER) {
    orders = await Order.find({ userId: parseInt(userId) }).sort({updatedAt: 'desc'}).populate("tripId").exec();
  } else if (role === ROLES.ADMIN) {
    orders = await Order.find({}).sort({updatedAt: 'desc'}).populate("tripId").populate("userId").exec();
  }
  return orders;
};

const newOrder = async (orderData, userId, tripId) => {
  orderData.tripid = tripId;
  if (userId) {
    orderData.userId = userId;
  }
  let order = await Order.create(orderData);
  if (!order) {
    throw new CustomError(errorCodes.BAD_REQUEST);
  }
  return order;
};

const updateOrder = async (orderId, orderData) => {
  console.log(orderId);
  console.log(orderData);
  let options = { new: true };
  let order = await Order.findOneAndUpdate(
    { _id: parseInt(orderId) },
    orderData,
    options
  );
  return order;
};

const getOrder = async (orderId) => {
  let order = await Order.findOne({ _id: parseInt(orderId) });
  if (!order) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  return order;
};

const cancelOrder = async (orderId) => {
  let order = await Order.findOne({ _id: parseInt(orderId) });
  if (!order) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  if (order.status === ORDER_STATUS.CONFIRMED || order.status === ORDER_STATUS.PENDING) {
    order.status = ORDER_STATUS.CANCELED;
    if (order.save()) {
      return "CANCELED_SUCCESSFULLY";
    }
  } else if (order.status === ORDER_STATUS.PAID) {
    return "COULD_NOT_CANCELED";
  }
};

const checkOrderExistWithTrip = async (tripIds) => {
  now = Date.now();
  let order = await Order.findOne({ tripId: { $in: tripIds }, tripStartAt: { $lte: now } });
  return order;
};

module.exports = {
  getOrders,
  newOrder,
  getOrder,
  updateOrder,
  cancelOrder,
  checkOrderExistWithTrip,
};
