const { Router } = require("express");
const folderRouter = Router();
const { showAddFolderForm, addFolder } = require("../controllers/folderController");

folderRouter.get("/", showAddFolderForm);
folderRouter.post("/", addFolder);

module.exports = folderRouter;
