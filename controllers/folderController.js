const prisma = require("../lib/prisma");
const path = require("path")
const { supabase } = require('../lib/supabase');

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

async function showUploadFileForm(req, res, next) {
    const folderId = req.params.id
    const folder = await prisma.folder.findUnique({ where: { id: Number(folderId) } })
    res.render('uploadFileForm', { folder })
}

async function addFileToFolder(req, res, next) {

    const { data, error } = await supabase.storage // data contains file path
        .from('uploads') // this is the supabase bucket
        .upload(`folder/${req.file.originalname}`, req.file.buffer); // buffer is the actual file data

    const folderId = req.params.id

    const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(req.file.originalname);

    await prisma.file.create({
        data: {
            url: publicUrl,
            folderId: Number(folderId),
            name: req.file.originalname,
            size: req.file.size,
        }
    })

    res.redirect(`/folders/${folderId}`)
}

async function showFileDetails(req, res, next) {
    const fileId = req.params.id
    const file = await prisma.file.findUnique({
        where: { id: Number(fileId) }
    })
    res.render("file", { file })
}

async function downloadFile(req, res, next) {
    const fileId = req.params.id
    const file = await prisma.file.findUnique({
        where: { id: Number(fileId) }
    })
    const absolutePath = path.join(__dirname, '..', file.url);
    try {
        res.download(absolutePath, (err) => {
            if (err) {
                res.status(404).send("File not found on disk");
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { showAddFolderForm, addFolder, openFolder, deleteFolder, showUpdateFolderForm, updateFolder, showUploadFileForm, addFileToFolder, showFileDetails, downloadFile }

