const { Router } = require("express");
const folderRouter = Router();
const { showAddFolderForm, addFolder, openFolder } = require("../controllers/folderController");

folderRouter.get("/:id", openFolder)
folderRouter.get("/", showAddFolderForm);
folderRouter.post("/", addFolder);


module.exports = folderRouter;
