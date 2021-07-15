const CustomError = require("../errors/CustomeError");
const User = require("../models/user");
const errorCodes = require("../errors/errorCodes");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/auth");
const JWT_SECRET_KEY = jwtConfig.secret;
const JWT_EXPIRES_TIME = jwtConfig.exp;

const register = async ({ fullName, userName, password, phone, address, role }) => {
  let userExists = await User.findOne().and([
    { role: role },
    { userName: userName },
    // { $or: [{ userName: userName }, { phone: phone }] },
  ]);

  if (userExists)
    throw new CustomError(
      errorCodes.USER_EXISTS,
      "USERNAME_ALREADY_REGISTERED"
    );

  userExists = await User.findOne().and([{ role: role }, { phone: phone }]);

  if (userExists)
    throw new CustomError(errorCodes.USER_EXISTS, "PHONE_ALREADY_REGISTERED");

  const user = await User.create({
    fullName,
    userName,
    password,
    phone,
    address,
    role,
  });
  return user;
};

const generateAccessToken = async ({ userName, role }) => {
  return jwt.sign({ userName: userName, role: role }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
};

const verifyAccessToken = async (accessToken) => {
  const data = jwt.verify(accessToken, JWT_SECRET_KEY);
  const { userName, role } = data;
  const user = await User.findOne({ userName: userName, role: role });

  if (!user) throw new CustomError(errorCodes.UNAUTHORIZED);
  return { data, user };
};

module.exports = {
  register,
  generateAccessToken,
  verifyAccessToken,
};
