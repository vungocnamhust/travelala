var mongoose = require("mongoose");
const timelineSchema = require("../models/timeline");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const tripSchema = new mongoose.Schema(
  {
    _id: Number,
    tourId: {
      type: Number,
      require: true,
      ref: "Tour",
    },
    desc: {
      type: String,
      require: false,
    },
    code: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    timeline: [timelineSchema],
    startAt: {
      type: Date,
      require: true,
    },
    endAt: {
      type: Date,
      require: true,
    },
    thumbnail: {
      type: String,
    },
    transport: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

tripSchema.plugin(AutoIncrement, { id: "trip_seq" });

module.exports = mongoose.model("Trip", tripSchema);
