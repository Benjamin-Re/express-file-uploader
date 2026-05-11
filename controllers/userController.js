const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");

function showLoginForm(req, res) {
  res.render("loginForm");
}

async function addUser(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await prisma.user.create({
    data: { name: req.body.name, password: hashedPassword },
  });

  req.logIn(newUser, (err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
}

module.exports = { showLoginForm, addUser };
