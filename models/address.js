var mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const addressSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    type: {
      type: String,
      required: true,
      enum: ["district", "province", "place"],
    },
    number: String,
    street: String,
    district: String,
    province: String,
    desc: String,
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

addressSchema.plugin(AutoIncrement, { id: "address_seq" });
const Address = mongoose.model("Address", addressSchema);
module.exports = {
  Address,
  addressSchema,
};
