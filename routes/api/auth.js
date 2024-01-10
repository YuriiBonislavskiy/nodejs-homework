const express = require("express");

const ctrl = require("../../controller/auth");

const {validateBody, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(schemas.userValidationSchema),
  ctrl.register
);

// signin
router.post("/login", validateBody(schemas.userValidationSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;