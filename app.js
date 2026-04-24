const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const path = require("node:path");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./lib/prisma");
const passport = require("./config/passport");
const multer  = require('multer')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);

app.get("/upload", function (req, res, next) {
  res.render('uploadFileForm')
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + extension)
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), function (req, res, next) {
  // req.file is the file
  console.log(req.file)
  // req.body will hold the text fields, if there were any
})

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
