const router = require("express").Router();
const authController = require("../controllers/auth");
const { validate, getValidateResult, apiTypes } = require("../middlewares/validate");
const asyncFunction = require("../middlewares/async");
const authorize = require("../middlewares/authorize");
const { ROLES }= require("../utils/constants")

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post(
  "/auth/login",
  validate(apiTypes.LOGIN),
  getValidateResult,
  asyncFunction(authController.login)
);

router.post(
  "/auth/register",
  validate(apiTypes.REGISTER),
  getValidateResult,
  asyncFunction(authController.register)
);


router.post(
  "/auth/admin/register",
  validate(apiTypes.REGISTER),
  getValidateResult,
  asyncFunction(authController.register)
);

router.post(
  "/auth/admin/login",
  validate(apiTypes.LOGIN),
  getValidateResult,
  asyncFunction(authController.login)
);

router.post(
  "/auth/getUser",
  authorize(ROLES.USER),
  validate(apiTypes.GET_USER),
  getValidateResult,
  asyncFunction(authController.getUser)
);

module.exports = router;
