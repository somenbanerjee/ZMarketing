const express = require("express");
const { userSchemas } = require("../validations/userSchemas");
const validateSchema = require("../middlewares/validateSchema");
const { userController } = require("../controllers");

// Router Object
const router = express.Router();

router.post("/login", validateSchema(userSchemas.login), userController.login);
router.post("/register", validateSchema(userSchemas.register), userController.register);
router.post("/test", userController.login);

module.exports = router;
