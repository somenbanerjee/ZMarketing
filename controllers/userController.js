const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models/");

const register = async (req, res) => {
  const { introducerCode, name, mobile, email, pan } = req.body;
  res.status(200).json({
    status: "success",
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await userModel.findByMemberCode(username);
    //console.log(userData);
    if (!userData)
      return res
        .status(404)
        .json({ status: "fail", message: "Member does not exist." });

    //console.log(password, userData.password);

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect)
      return res.status(404).json({
        status: "fail",
        message: "You have entered an invalid username or password.",
      });
    const token = jwt.sign(
      { id: userData.id, username: userData.member_code },
      "key",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      status: "success",
      message: "Logged in successfully.",
      data: {
        username: userData.member_code,
        name: userData.name,
        email: userData.email,
      },
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  register,
  login,
};
