const snakecaseKeys = require("snakecase-keys");
const codes = require("../errors/errorCodes");

const errorHandlers = (err, req, res, next) => {
  let statusCode = err.code;
  let resStatusCode = err.code;
  let { message } = err;
  switch (statusCode) {
    case codes.BAD_REQUEST:
      message = message || "BAD_REQUEST";
      break;
    case codes.UNAUTHORIZED:
      message = message || "UNAUTHORIZED";
      break;
    case codes.FORBIDDEN:
      message = message || "FORBIDDEN";
      break;
    case codes.NOT_FOUND:
      message = message || "NOT_FOUND";
      break;
    case codes.TOO_MANY_REQUESTS:
      message = message || "TOO_MANY_REQUESTS";
      break;
    case codes.INTERNAL_SERVER_ERROR:
      message = message || "INTERNAL_SERVER_ERROR";
      break;
    case codes.TOUR_NOT_EXISTS:
      message = message || "TOUR_NOT_EXISTS";
      resStatusCode = codes.NOT_FOUND;
      break;
    case codes.USER_NOT_EXISTS:
      message = message || "USER_NOT_EXISTS";
      resStatusCode = codes.NOT_FOUND;
      break;
    case codes.USER_EXISTS:
      message = message || "USER_EXISTS";
      resStatusCode = codes.NOT_FOUND;
      break;
    case codes.TRIP_NOT_FOUND:
      message = message || "TRIP_NOT_FOUND";
      resStatusCode = codes.NOT_FOUND;
      break;
    case codes.TOUR_ALREADY_BOOKED:
      message = message || "TOUR_ALREADY_BOOKED";
      resStatusCode = codes.NOT_FOUND;
      break;
    case codes.TRIP_ALREADY_BOOKED:
      message = message || "TRIP_ALREADY_BOOKED";
      resStatusCode = codes.NOT_FOUND;
      break;
    default:
      message = message || "INTERNAL_SERVER_ERROR";
      statusCode = statusCode || 500;
      resStatusCode = codes.INTERNAL_SERVER_ERROR;
  }
  console.log("ERROR: " + err.message);
  return res.status(resStatusCode).send({
    status: resStatusCode,
    message,
  });
};

module.exports = errorHandlers;
