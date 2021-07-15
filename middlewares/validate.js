const { body, validationResult } = require("express-validator");
const errorCodes = require("../errors/errorCodes");
const CustomError = require("../errors/CustomeError");

const apiTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  GET_USER: "GET_USER",
  UPDATE_USER_ACCOUNT: "UPDATE_USER_ACCOUNT",
};

const validate = (apiType) => {
  switch (apiType) {
    case apiTypes.REGISTER:
      return [
        body("userName")
          .exists()
          .withMessage("username is required")
          .isString()
          .trim(),
        body("password")
          .exists()
          .withMessage("password is required")
          .isString()
          .trim(),
      ];
    case apiTypes.LOGIN:
      return [
        body("userName")
          .exists()
          .withMessage("username is required")
          .isString()
          .trim(),
        body("password")
          .exists()
          .withMessage("password is required")
          .isString()
          .trim(),
      ];
    case apiTypes.GET_USER:
      return [
        body("userName")
          .exists()
          .withMessage("username is required")
          .isString()
          .trim(),
        body("password")
          .exists()
          .withMessage("password is required")
          .isString()
          .trim(),
      ];
    case apiTypes.UPDATE_USER_ACCOUNT:
      return [
        body("fullName").isString(),
        body("firstName").isString().trim(),
      ];
    case apiTypes.CHANGE_PASSWORD:
      return [];
    default:
      return [];
  }
};

const getValidateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new CustomError(errorCodes.BAD_REQUEST, errors.array().shift().msg));
  }
  next();
};

module.exports = {
  apiTypes,
  validate,
  getValidateResult,
};
