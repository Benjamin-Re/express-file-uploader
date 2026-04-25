const prisma = require("../lib/prisma");

function showAddFolderForm(req, res) {
    res.render("addFolderForm")
}

async function addFolder(req, res, next) {
    console.log(req.body.folderName)
    await prisma.folder.create({
        data: { name: req.body.folderName }
    });
    res.redirect("/")
}

module.exports = { showAddFolderForm, addFolder }

