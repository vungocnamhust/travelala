const { Address } = require("../models/address");
const { ADDRESS_TYPE } = require("../utils/constants");

const initAddresses = async (addressesData) => {
  const options = { ordered: true };

  Address.insertMany(addressesData, options)
    .then(function (addresses) {
      console.log(addresses);
    })
    .catch(function (err) {
      console.log("ERROR: " + err);
    });
};

const getAddresses = async () => {
  const addresses = await Address.find({ type: ADDRESS_TYPE.DISTRICT })
    .distinct("province");
  return addresses;
};

module.exports = {
  initAddresses,
  getAddresses,
};
