const router = require("express").Router();
const userController = require("../controllers/user");
const {
  validate,
  getValidateResult,
  apiTypes,
} = require("../middlewares/validate");
const asyncFunction = require("../middlewares/async");
const authorize = require("../middlewares/authorize");
const { ROLES, ALL_ACCESS } = require("../utils/constants");
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post(
  "/user",
  authorize(ALL_ACCESS),
  validate(apiTypes.GET_USER),
  getValidateResult,
  asyncFunction(userController.getUser)
);

router.put(
  "/user",
  authorize(ROLES.USER),
  upload.single("avatar"),
  asyncFunction(userController.updateUser)
);

router.put(
  "/user/bank",
  authorize(ROLES.USER),
  asyncFunction(userController.updateUserBankAccount)
);

module.exports = router;
