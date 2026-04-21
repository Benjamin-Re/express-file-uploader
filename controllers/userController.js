function showLoginForm(req, res) {
    res.render("loginForm")
}

async function loginUser(req, res) {
    res.redirect("/")
}

module.exports = { loginUser, showLoginForm }

