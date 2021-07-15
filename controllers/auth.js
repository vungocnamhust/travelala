const authService = require("../services/auth");
const userService = require("../services/user");
const { ROLES } = require("../utils/constants");

const register = async (req, res) => {
  const { name, userName, password, phone, address } = req.body;
  let role = ROLES.USER;
  if (req.path.includes("/admin")) role = ROLES.ADMIN;
  const user = await authService.register({
    name,
    userName,
    password,
    phone,
    address,
    role,
  });
  return res.send({ status: 200, result: {} });
};

const login = async (req, res) => {
  let role = ROLES.USER;
  if (req.path.includes("/admin")) role = ROLES.ADMIN;
  const { userName, password } = req.body;
  const accessToken = await authService.generateAccessToken({ userName, role });

  const user = await userService.getUser({
    userName,
    password,
    role,
  });
  return res.send({
    status: 200,
    result: {
      accessToken: accessToken,
      user: user,
    },
  });
};

module.exports = {
  register,
  login,
};
