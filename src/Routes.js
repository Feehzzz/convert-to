const routes = require('express').Router();
const fs = require('fs');
const upload = require('./Multer.config');
const { TesseractWorker } = require('tesseract.js');
const worker = new TesseractWorker();


routes.get('/', (req, res) => {
  res.render('index.html')
});

routes.post('/upload/:lang', (req,res) => {
  const { lang } = req.params
  upload(req,res,err => {
    fs.readFile(`./src/tmp/uploads/${req.file.originalname}`, (err,data) => {
      if(err) return console.log('Something went wrong', err);
      worker
      .recognize(data, lang, {create_pdf:'1'})
      .progress(progress => {
        console.log(progress);
        
      })
      .then(result => {
        res.send(result.text)
      })
      .finally(() => worker.terminate());
    });
  });
})


module.exports = routes;