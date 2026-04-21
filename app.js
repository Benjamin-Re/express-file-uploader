const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter")
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }))

app.use("/users", userRouter)

app.get("/", (req, res) => {
    res.render("index")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {throw error}
  console.log(`My first Express app - listening on port ${PORT}!`);
});