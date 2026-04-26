const { Router } = require("express");
const folderRouter = Router();
const { showAddFolderForm, addFolder, openFolder, deleteFolder } = require("../controllers/folderController");

folderRouter.get("/:id", openFolder)
folderRouter.get("/delete/:id", deleteFolder)
folderRouter.get("/", showAddFolderForm);
folderRouter.post("/", addFolder);


module.exports = folderRouter;
