const readline = require("readline");
const fs = require("fs");
const addressService = require("../services/address");
require("../models/mongoose");

const initAddresses = async (req, res, next) => {
  var lineNo = 1;
  var addresses = [];
  var province;
  var district;

  const readInterface = readline.createInterface({
    input: fs.createReadStream("./province.txt"),
    output: process.stdout,
    console: false,
  });

  readInterface.on("line", function (data) {
    if (lineNo % 2 == 1) {
      district = data;
    } else {
      province = data;

      let address = {
        province: province,
        district: district,
        type: "district",
        name: `${district}, ${province}`,
      };
      addresses.push(address);
    }
    lineNo++;
  });

  readInterface.on("close", function (data) {
    addressService.initAddresses(addresses);
  });
};

const getAddresses = async (req, res, next) => {
  addressService
    .getAddresses()
    .then((addresses) => {
      res.send({ status: 200, addresses: addresses });
    })
    .catch((e) => {
      next(e);
    });
};

module.exports = {
  initAddresses,
  getAddresses,
};
