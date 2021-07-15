const { NON_SECURE_PATHS } = require("./constants");

const publicRoute = (path, method) => {
  var publicRoutes = ["/trips", "/tours"];
  if (NON_SECURE_PATHS.includes(path)) return true;
  for (var route of publicRoutes) {
    if (path.includes(route) && method == "GET") {
      return true;
    } else if (
      path.includes("/order") &&
      path.includes("/tours") &&
      path.includes("/trips") &&
      method == "POST"
    ) {
      return true;
    }
  }
  if (path.endsWith("/admin/orders") && method == "GET") {
    return true;
  } else if (
    path.includes("/orders/") &&
    (method == "DELETE" || method == "PUT")
  ) {
    return true;
  }
  return false;
};

module.exports = {
  publicRoute,
};
