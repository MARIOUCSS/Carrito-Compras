const express = require("express");
const router = express.Router();
const registerControllers = require("../controllers/authController");
const authmidle = require("../middlewares/authMidleware");
//routing

router.post("/register", registerControllers.registerController);
router.post("/login", registerControllers.loginController);
//test routes
//ojo tiene que recibir un token para que pase al controllers
router.get(
  "/test",
  authmidle.requiresignIn,
  authmidle.isAdmin,
  registerControllers.testcontroller
);
router.post("/forgot-password", registerControllers.forgotPasswordController);
//user-auth
router.get("/user-auth", authmidle.requiresignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//admin-auth
router.get("/admin-auth", authmidle.requiresignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
module.exports = router;
