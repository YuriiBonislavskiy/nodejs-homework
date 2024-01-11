const express = require("express");

const ctrl = require("../../controller/auth");

const {validateBody, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();


router.post(
  "/register",
  validateBody(schemas.userValidationSchema),
  ctrl.register
);


router.post("/login", validateBody(schemas.userValidationSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.userSubscriptionSchema),
  ctrl.updateSubscription
);


module.exports = router;