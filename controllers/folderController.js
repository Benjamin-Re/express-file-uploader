const prisma = require("../lib/prisma");
const multer  = require('multer')

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
    await prisma.folder.findUnique({where: { id: Number(folderId) }})
    res.render('uploadFileForm', { folder })
}
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

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), function (req, res, next) {
  // req.file is the file
  console.log(req.file)
  // req.body will hold the text fields, if there were any
})
*/

module.exports = { showAddFolderForm, addFolder, openFolder, deleteFolder, showUpdateFolderForm, updateFolder, showUploadFileForm }

