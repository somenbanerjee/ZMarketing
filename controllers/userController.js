const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models/");

const register = async (req, res) => {
  const { introducerCode, name, mobile, email, pan, password } = req.body;
  try {
    // introducer check
    const introducerData = await userModel.findByMemberCode(introducerCode);
    if (!introducerData)
      return res
        .status(404)
        .json({ status: "fail", message: "Introducer code is invalid." });

    // introducer data
    const introducerId = introducerData.member_id;
    const introducerTree = introducerData.intro_tree + introducerCode + ",";
    const introducerLevel = parseInt(introducerData.intro_level) + 1;

    // get new member code
    const memberCode = await userModel.getNewMemberCode();

    const hashPassword = await bcrypt.hash(password, 12);

    // register
    const memberData = {
      memberCode,
      password: hashPassword,
      introducerId,
      introducerLevel,
      introducerTree,
      name,
      mobile,
      email,
      pan,
    };
    const result = await userModel.create(memberData);

    if (result)
      res.status(201).json({
        status: "success",
        message: "Registration is successfully.",
        data: {
          username: memberCode,
          name: name,
          email: email,
          mobile: mobile,
        },
      });
    else
      res.status(400).json({
        status: "error",
        message: "Something went wrong. Please try again.",
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Your request could not be processed. Please try again.",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await userModel.findByMemberCode(username);
    if (!userData)
      return res
        .status(404)
        .json({ status: "fail", message: "Member does not exist." });

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect)
      return res.status(404).json({
        status: "fail",
        message: "You have entered an invalid username or password.",
      });
    const token = jwt.sign(
      {
        user: {
          id: userData.member_id,
          username: userData.member_code,
        },
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    if (token) {
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
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  register,
  login,
};
