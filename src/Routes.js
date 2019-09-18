const routes = require('express').Router();
const fs = require('fs');
const upload = require('./Multer.config');
const { TesseractWorker } = require('tesseract.js');
const worker = new TesseractWorker();


routes.get('/', (req, res) => {
  res.render('index.html')
});

routes.post('/upload', (req,res) => {
  
  upload(req,res,err => {
    fs.readFile(`./src/tmp/uploads/${req.file.originalname}`, (err,data) => {
      if(err) return console.log('Something went wrong', err);
      worker
      .recognize(data, 'eng', {tessjs_create_pdf:'1'})
      .progress(progress => {
        console.log(progress);
        
      })
      .then(result => {
        res.redirect('/download')
      })
      .finally(() => worker.terminate());
    });
  });
})
routes.get('/download', (req,res) => {
  const file = `${__dirname}/../tesseract.js-ocr-result.pdf`;
  res.download(file)
})


module.exports = routes;