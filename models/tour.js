var mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { addressSchema } = require("../models/address");
const tourSchema = new mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: false,
    },
    tripIds: [{ type: Number, ref: "Trip" }],
    startAddress: addressSchema,
    endAddress: addressSchema,
    points: [addressSchema],
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

tourSchema.plugin(AutoIncrement, { id: "tour_seq" });

module.exports = mongoose.model("Tour", tourSchema);
