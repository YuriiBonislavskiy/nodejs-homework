const express = require("express");

const ctrl = require("../../controller/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();


router.post(
  "/register",
  validateBody(schemas.userValidationSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailVerificationSchema),
  ctrl.resendVerifyEmail
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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;