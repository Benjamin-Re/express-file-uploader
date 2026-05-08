const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");

function showLoginForm(req, res) {
  res.render("loginForm");
}

async function addUser(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({
    data: { name: req.body.name, password: hashedPassword },
  });
  res.redirect("/");
}

module.exports = { showLoginForm, addUser };
