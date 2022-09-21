var express = require('express');
var router = express.Router();
import FormRouter from './form-router';
import FolderRouter from './folder-router';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/form/list',);

router.post('/form/update', (req,res) => {
  console.log(req.body.data);
  console.log(req.body.formId);
  const filter = {_id : ObjectId(req.body.formId)};
  const newValues = {$set:{form:req.body.data, title:'yepyep'}};
  getDb().collection("forms").updateOne(filter, newValues, {upsert:true}, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/form/get', (req,res,next) => {
  console.log('Forms', req.body.formId);
  getDb().collection("forms").findOne({_id: ObjectId(req.body.formId)}, (err,result) => {
    res.send(result);
  });
});

router.post('/form/publish', (req,res) => {
  getDb().collection("forms").findOne({_id: ObjectId(req.body.formId)}, (err,result) => {
    console.log(result._id);
    getDb().createCollection('form_' + result._id, function(err, collectionResult) {
      if (err) throw err;
      console.log("Collection created!");
      res.send(result);
    });
  });
});

router.use('/form',FormRouter);
router.use('/folder',FolderRouter);

module.exports = router;
