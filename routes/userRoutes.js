const express = require("express");
const { userSchemas } = require("../validations/userSchemas");
const validateSchema = require("../middlewares/validateSchema");
const auth = require("../middlewares/auth");
const { userController } = require("../controllers");

// Router Object
const router = express.Router();

router.post("/login", validateSchema(userSchemas.login), userController.login);

router.use(auth);
router.post(
  "/register",
  validateSchema(userSchemas.register),
  userController.register
);
router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.get("/members", userController.getMemberDetailsByIntroId);

module.exports = router;
