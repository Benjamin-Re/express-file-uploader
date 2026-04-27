const { Router } = require("express");
const folderRouter = Router();
const { showAddFolderForm, addFolder, openFolder, deleteFolder, showUpdateFolderForm, updateFolder } = require("../controllers/folderController");

folderRouter.get("/:id", openFolder)
folderRouter.get("/delete/:id", deleteFolder)
folderRouter.get("/update/:id", showUpdateFolderForm)
folderRouter.post("/update/:id", updateFolder)
folderRouter.get("/", showAddFolderForm);
folderRouter.post("/", addFolder);


module.exports = folderRouter;
