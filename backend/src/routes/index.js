var express = require('express');
var router = express.Router();
import FormRouter from './form-router';
import FolderRouter from './folder-router';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.use('/form',FormRouter);
router.use('/folder',FolderRouter);

module.exports = router;
