const camelCaseKeys = require("camelcase-keys");

const camelCaseReq = (req, res, next) => {
  req.query = camelCaseKeys(req.query, { deep: true });
  req.body = camelCaseKeys(req.body, { deep: true});
  next();
};

module.exports = camelCaseReq;
