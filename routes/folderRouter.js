const { Router } = require("express");
const folderRouter = Router();
const { showAddFolderForm, addFolder, openFolder, deleteFolder, showUpdateFolderForm, updateFolder, showUploadFileForm, addFileToFolder } = require("../controllers/folderController");
const multer  = require('multer')
const path = require('path')

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

folderRouter.get("/:id", openFolder)
folderRouter.get("/delete/:id", deleteFolder)
folderRouter.get("/update/:id", showUpdateFolderForm)
folderRouter.post("/update/:id", updateFolder)
folderRouter.get("/upload/:id", showUploadFileForm)
folderRouter.post("/upload/:id", upload.single('file'), addFileToFolder)
folderRouter.get("/", showAddFolderForm);
folderRouter.post("/", addFolder);


module.exports = folderRouter;
