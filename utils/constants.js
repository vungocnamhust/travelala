const ROLES = {
  ADMIN: "admin",
  USER: "user",
  DEV: "dev",
  ANONYMOUS: "anonymous",
};

const ALL_ACCESS = [
  ROLES.ADMIN,
  ROLES.USER,
];

const NON_SECURE_PATHS = [
  "/trips/*",
  "/tours/*",
  "/api/v1/addresses",
  "/addresses",
  "/api/v1/auth/register",
  "/api/v1/auth/admin/register",
  "/api/v1/auth/login",
  "/api/v1/auth/admin/login",
  "/api-docs", 
];

const PAYMENT_MODES = {
  BANK: "bank",
  CASH: "cash",
};

const ORDER_STATUS = {
  CONFIRMED: "confirmed",
  PAID: "paid",
  CANCELED: "canceled",
  PENDING: "pending",
}

const ADDRESS_TYPE = {
  DISTRICT: "district",
  PROVINCE: "province",
  PLACE: "place",
}

const SEX = {
  MALE: "male", 
  FEMALE: "female",
}
module.exports = {
  ROLES,
  NON_SECURE_PATHS,
  ALL_ACCESS,
  PAYMENT_MODES,
  ORDER_STATUS,
  ADDRESS_TYPE,
  SEX,
};
