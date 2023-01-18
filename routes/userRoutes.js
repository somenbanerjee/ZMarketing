const express = require("express");
const { userSchemas } = require("../validations/userSchemas");
const validateSchema = require("../middlewares/validateSchema");
const auth = require("../middlewares/auth");
const { userController } = require("../controllers");

// Router Object
const router = express.Router();

router.post("/login", validateSchema(userSchemas.login), userController.login);
router.post(
  "/register",
  [auth, validateSchema(userSchemas.register)],
  userController.register
);

module.exports = router;
