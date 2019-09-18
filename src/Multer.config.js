const multer = require('multer');


const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null, './tmp/uploads')
  },
  filename:(req,file,cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage}).single('file')

module.exports = upload