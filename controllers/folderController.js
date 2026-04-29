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
    const folder = await prisma.folder.findUnique({ where: { id: Number(folderId) }, include: { files: true } })
    res.render("folder", { folder: folder })
}

async function deleteFolder(req, res, next) {
    const folderId = req.params.id
    const folder = await prisma.folder.delete({ where: { id: Number(folderId) } })
    res.redirect("/")
}

async function showUpdateFolderForm(req, res, next) {
    const folderId = req.params.id
    const folderToUpdate = await prisma.folder.findUnique({
        where: { id: Number(folderId) }
    })
    res.render("updateFolderForm", { folder: folderToUpdate })
}

async function updateFolder(req, res, next) {
    const folderId = req.params.id
    await prisma.folder.update({ 
        where: { id: Number(folderId) },
        data: { name: req.body.folderName },
    })
    res.redirect("/")
}

async function showUploadFileForm (req, res, next) {
    const folderId = req.params.id
    const folder = await prisma.folder.findUnique({where: { id: Number(folderId) }})
    res.render('uploadFileForm', { folder })
}

async function addFileToFolder (req, res, next) {
    
    const folderId = req.params.id
    
    await prisma.file.create({
        data: {
            url: req.file.path,
            folderId: Number(folderId)
        }
    })

    res.redirect(`/folders/${folderId}`)
}

module.exports = { showAddFolderForm, addFolder, openFolder, deleteFolder, showUpdateFolderForm, updateFolder, showUploadFileForm, addFileToFolder }

