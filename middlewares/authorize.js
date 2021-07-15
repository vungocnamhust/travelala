const asyncFunction = require("./async");
const CustomError = require("../errors/CustomeError");
const errorCodes = require("../errors/errorCodes");
const { ROLES } = require("../utils/constants");
const { publicRoute } = require("../utils/publicRoute");

const authorize = (roles) =>
  asyncFunction(async (req, res, next) => {
    if (typeof roles === "string") {
      roles = [roles];
    }

    if (publicRoute(req.path, req.method)) return next();
    try {
      if (roles.length && !roles.includes(req.user.role)) {
        throw new CustomError(errorCodes.UNAUTHORIZED);
      }
    } catch (e) {
      console.log("ERROR at authorize middleware");
      return res.status(errorCodes.UNAUTHORIZED).send({ status: errorCodes.UNAUTHORIZED, message: "UNAUTHORIZED" });
    }

    next();
  });
module.exports = authorize;
