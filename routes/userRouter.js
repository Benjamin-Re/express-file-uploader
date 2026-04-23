const { Router } = require("express");
const userRouter = Router();
const { showLoginForm } = require("../controllers/userController");
const passport = require("../config/passport");

userRouter.get("/login", showLoginForm);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  }),
);

module.exports = userRouter;
