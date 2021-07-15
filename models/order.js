var mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { PAYMENT_MODES, ORDER_STATUS } = require("../utils/constants");
const { addressSchema } = require("../models/address");

const orderSchema = new mongoose.Schema(
  {
    _id: Number,
    userId: {
      type: Number,
      ref: "User",
    },
    phone: {
      type: Number,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    tripId: {
      type: Number,
      require: true,
      ref: "Trip",
    },
    orderNote: {
      type: String,
      require: false,
    },
    totalSlots: {
      type: Number,
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    paymentMode: {
      type: String,
      enum: [PAYMENT_MODES.BANK, PAYMENT_MODES.CASH],
    },
    orderAt: {
      type: Date,
      require: true,
    },
    paymentDueDate: {
      type: Date,
      require: false,
    },
    status: {
      type: String,
      enum: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELED, ORDER_STATUS.PAID, ORDER_STATUS.PENDING],
      require: true,
    },
    orderCode: {
      type: String,
      require: true,
    },
    tourName: {
      type: String,
    },
    startAddress: String,
    tripStartAt: String,
    tripCode: String,
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

orderSchema.plugin(AutoIncrement, { id: "order_seq" });

module.exports = mongoose.model("Order", orderSchema);
