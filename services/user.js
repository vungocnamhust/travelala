const CustomError = require("../errors/CustomeError");
const User = require("../models/user");
const errorCodes = require("../errors/errorCodes");
const { ROLES } = require("../utils/constants");

const getUser = async ({ userName, password, role }) => {
  const user = await User.findOne().and([
    { role: role },
    { userName: userName },
    { password: password },
  ]);

  console.log(user);
  if (!user) {
    throw new CustomError(errorCodes.USER_NOT_EXISTS);
  }

  return user;
};

const findUserById = async ({ userId }) => {
  const user = await User.findOne({ _id: parseInt(userId) });
  if (!user) {
    throw new CustomError(errorCodes.USER_NOT_EXISTS);
  }
  return user;
};

const updateUser = async ({ userName, userData, role }) => {
  const options = { new: true };
  const user = await User.findOneAndUpdate(
    { role: role, userName: userName },
    userData,
    options
  );
  console.log(user);
  if (!user) {
    throw new CustomError(errorCodes.USER_NOT_EXISTS);
  }

  return user;
};

const createAnonymous = async ({ fullName, email, phone }) => {
  let role = ROLES.ANONYMOUS;
  const user = await User.create({
    fullName,
    email,
    phone,
    role,
  });
  console.log(user);
  return user;
};

module.exports = {
  getUser,
  updateUser,
  createAnonymous,
  findUserById,
};
