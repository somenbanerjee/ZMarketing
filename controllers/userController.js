const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models/");

/**
 *
 * @desc Register a new user
 * @route POST /api/v1/user/register
 * @access Private
 *
 */
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

    // new member data
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
      createdBy: req.user.username,
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
    res.status(500).json({
      status: "error",
      message: "Your request could not be processed. Please try again.",
    });
  }
};

/**
 *
 * @desc Login an existing user
 * @route POST api/v1/user/login
 * @access Public
 *
 */
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

/**
 *
 * @desc Get data of the logged in user
 * @route GET /api/v1/user/profile
 * @access Private
 *
 */
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findByMemberCode(req.user.username);
    if (!userData)
      return res
        .status(404)
        .json({ status: "fail", message: "Member data not found." });

    res.status(200).json({
      status: "success",
      message: "Data found successfully.",
      data: {
        name: userData.name,
        memberCode: userData.member_code,
        mobile: userData.mobile,
        email: userData.email,
        pan: userData.pan,
        createdOn: userData.created_on,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Your request could not be processed. Please try again.",
    });
  }
};

/**
 *
 * @desc update profile details of the logged in user
 * @route PUT /api/v1/user/profile/
 * @access Private
 *
 */
const updateProfile = async (req, res) => {
  try {
    const { name, mobile, email, pan } = req.body;

    const userData = await userModel.findByMemberCode(req.user.username);
    if (!userData)
      return res
        .status(404)
        .json({ status: "fail", message: "Member data not found." });

    // updated member data
    const memberData = {
      memberCode: req.user.username,
      name,
      mobile,
      email,
      pan,
    };
    const result = await userModel.update(memberData);

    if (result)
      res.status(201).json({
        status: "success",
        message: "Record is updated successfully.",
        data: { ...memberData },
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

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
