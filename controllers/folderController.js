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

async function openFolder(req, res, next) {
    const folderId = req.params.id
    const folder = await prisma.folder.findUnique({ where: { id: Number(folderId) } })
    res.render("folder", { folder: folder })
}

async function deleteFolder(req, res, next) {
    const folderId = req.params.id
    const folder = await prisma.folder.delete({ where: { id: Number(folderId) } })
    res.redirect("/")
}

module.exports = { showAddFolderForm, addFolder, openFolder, deleteFolder }

