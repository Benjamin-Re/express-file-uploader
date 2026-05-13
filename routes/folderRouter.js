const { Router } = require("express");
const folderRouter = Router();
const {
  showAddFolderForm,
  addFolder,
  openFolder,
  deleteFolder,
  showUpdateFolderForm,
  updateFolder,
  showUploadFileForm,
  addFileToFolder,
  showFileDetails,
  downloadFile,
} = require("../controllers/folderController");
const multer = require("multer");
const path = require("path");
const { isAuth } = require('../config/passport')

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
const MAX_SIZE_MB = 5;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed types: JPEG, PNG, GIF, PDF`));
    }
  },
});

folderRouter.use(isAuth)

folderRouter.get("/new", showAddFolderForm);
folderRouter.post("/new", addFolder);
folderRouter.get("/:id", openFolder);
folderRouter.get("/delete/:id", deleteFolder);
folderRouter.get("/update/:id", showUpdateFolderForm);
folderRouter.post("/update/:id", updateFolder);
folderRouter.get("/upload/:id", showUploadFileForm);
folderRouter.get("/file/download/:id", downloadFile);
folderRouter.get("/file/:id", showFileDetails);
folderRouter.post("/upload/:id", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE'
        ? `File too large. Maximum size is ${MAX_SIZE_MB}MB`
        : err.message;
      return res.status(400).render("uploadFileForm", {
        folder: { id: Number(req.params.id) },
        error: message,
      });
    }
    next();
  });
}, addFileToFolder);

module.exports = folderRouter;
