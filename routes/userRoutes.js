const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");
// Router Object
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
