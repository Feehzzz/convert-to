const multer = require('multer');
const {TesseractWorker} = require('tesseract.js');
const worker = new TesseractWorker();

const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null, './src/tmp/uploads')
  },
  filename:(req,file,cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage}).single('file')

module.exports = upload