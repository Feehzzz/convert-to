const routes = require('express').Router();
const fs = require('fs');
const upload = require('./Multer.config')


routes.get('/', (req, res) => {
  res.render('index.html')
});

routes.post('/upload', (req,res) => {
  
})


module.exports = routes;