var mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { addressSchema } = require("../models/address");
const { ROLES, SEX } = require("../utils/constants");
const userSchema = new mongoose.Schema(
  {
    _id: Number,
    fullName: String,
    firstName: String,
    userName: String,
    phone: String,
    password: String,
    avatarImg: Object,
    email: String,
    birthday: Date,
    bankAccountNumber: String,
    bankAccountBalance: Number,
    sex: {
      type: String,
      enum: [SEX.MALE, SEX.FEMALE],
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.USER, ROLES.DEV, ROLES.ANONYMOUS],
    },
    address: String,
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

userSchema.statics.findOneOrCreate = function findOneOrCreate(
  condition,
  callback
) {
  const self = this;
  self.findOne(condition, (err, result) => {
    return result
      ? callback(err, result)
      : self.create(condition, (err, result) => {
          return callback(err, result);
        });
  });
};

userSchema.plugin(AutoIncrement, { id: "user_seq" });

module.exports = mongoose.model("User", userSchema);
