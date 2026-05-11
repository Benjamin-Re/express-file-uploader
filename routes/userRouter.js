const { Router } = require("express");
const userRouter = Router();
const { showLoginForm, addUser } = require("../controllers/userController");
const { passport } = require("../config/passport");

userRouter.get("/signup", (req, res, next) => {
  res.render("signupform")
})
userRouter.post("/signup", addUser)

userRouter.get("/login", showLoginForm);
userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      console.log("Login failed:", info?.message);
      return res.redirect("/users/login");
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});

userRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err)
    } else {
      res.redirect("/")
    }
  })
})

module.exports = userRouter;
