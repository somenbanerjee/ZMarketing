const express = require("express");
const { userController } = require("../controllers");

// Router Object
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/test", userController.login);

module.exports = router;
