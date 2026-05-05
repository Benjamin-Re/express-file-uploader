const { Router } = require("express");
const folderRouter = Router();
const { showAddFolderForm, addFolder, openFolder, deleteFolder, showUpdateFolderForm, updateFolder, showUploadFileForm, addFileToFolder, showFileDetails, downloadFile } = require("../controllers/folderController");
const multer  = require('multer')
const path = require('path')

/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + extension)
  }
})
*/

const upload = multer({ storage: multer.memoryStorage() })

folderRouter.get("/new", showAddFolderForm);
folderRouter.post("/new", addFolder);
folderRouter.get("/:id", openFolder)
folderRouter.get("/delete/:id", deleteFolder)
folderRouter.get("/update/:id", showUpdateFolderForm)
folderRouter.post("/update/:id", updateFolder)
folderRouter.get("/upload/:id", showUploadFileForm)
folderRouter.get("/file/download/:id", downloadFile)
folderRouter.get("/file/:id", showFileDetails)
folderRouter.post("/upload/:id", upload.single('file'), addFileToFolder)


module.exports = folderRouter;
