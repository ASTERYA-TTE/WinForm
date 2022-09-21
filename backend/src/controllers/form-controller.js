var ObjectId = require('mongodb').ObjectId;
import {getDb} from '../services/database';
const collection_name = 'forms';

exports.create = (req,res) => {
    getDb().collection(collection_name).insertOne({"title":req.body.title}, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
}

exports.list =  (req,res) => {
    getDb().collection(collection_name).find({folder_id: req.body.folder_id}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
}