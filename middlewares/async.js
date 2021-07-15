const asyncFunction = (fn) => (req, res, next) => {
  console.log("Body: " + JSON.stringify(req.body));
  return Promise.resolve(fn(req, res, next)).catch(next);
};
module.exports = asyncFunction;
