const { Router } = require("express");
const userRouter = Router();
const { loginUser, showLoginForm } = require("../controllers/userController")

userRouter.get("/login", showLoginForm)
userRouter.post("/login", loginUser)

module.exports = userRouter 