var mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  _id: Number,
  pointIds: [
    {
      type: Number,
      ref: "Address",
    },
  ],
  desc: String,
});

mongoose.model("Timeline", timelineSchema);
module.exports = timelineSchema;
