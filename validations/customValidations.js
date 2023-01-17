//const { userModel } = require("../models/");

/* const uniqueIntroducerCode = async (value, helpers) => {
  try {
  const userData = await userModel.findByMemberCode(value);
  console.log(userData);
  if (!userData) return helpers.message("Invalid introducer code.");
  return value;
  } catch (error) {
    return helpers.message("Something went wrong.");
  }
}; */
const pan = (value, helpers) => {
  if (value.length !== 10) {
    return helpers.message("PAN must be at least 10 characters");
  }
  if (!value.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
    return helpers.message("PAN number is invalid.");
  }
  return value;
};

const mobile = (value, helpers) => {
  value = value.toString();
  if (value.length !== 10) {
    return helpers.message("Mobile must be at least 10 digit.");
  }
  if (!value.match(/^[6-9]\d{9}$/)) {
    return helpers.message("Mobile number is invalid.");
  }
  return value;
};

module.exports = {
  pan,
  mobile,
};
