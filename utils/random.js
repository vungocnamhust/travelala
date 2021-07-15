const generateRandomCode = (tourId) => {
  var now = new Date();
  var result = [tourId, now.getTime()];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = 10;
  for (var i = 0; i < charactersLength; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

module.exports = {
    generateRandomCode,
}