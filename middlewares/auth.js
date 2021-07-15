const CustomError = require("../errors/CustomeError");
const errorCodes = require("../errors/errorCodes");
const authService = require("../services/auth");
const { publicRoute } = require("../utils/publicRoute");
const auth = async function (req, res, next) {
  console.log("_______");
  if (publicRoute(req.path, req.method)) return next();
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError(errorCodes.UNAUTHORIZED);
    const [tokenType, accessToken] = authorization.split(" ");
    if (tokenType !== "Bearer") throw new CustomError(errorCodes.UNAUTHORIZED);
    const { data, user } = await authService.verifyAccessToken(accessToken);
    req.data = data;
    req.user = user;

    if (["/auth/logout", "/auth/verify"].includes(req.path)) {
      req.accessToken = accessToken;
    }
  } catch (e) {
    console.log("ERROR at auth middleware");
    return res.status(errorCodes.UNAUTHORIZED).send({ status: errorCodes.UNAUTHORIZED, message: "UNAUTHORIZED" });
  }

  next();
};

module.exports = auth;
