const { userModel } = require("../models/");

const register = async (req, res) => {
  const memberCode = req.body.memberCode;
  try {
    const data = await userModel.findByMemberCode(memberCode);
    res.status(200).send({
      message: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const login = (req, res) => {
  res.status(200).send({
    message: "Login Page",
  });
};

module.exports = {
  register,
  login,
};
