var ObjectId = require('mongodb').ObjectId;
import {getDb} from '../services/database';
const collection_name = 'forms';

exports.create = (req,res) => {

    const form = {
        title:req.body.title,
        folder_id: req.body.folder_id == null ? null : ObjectId(req.body.folder_id)
    }

    getDb().collection(collection_name).insertOne(form, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
}

exports.list =  (req,res) => {
    getDb().collection(collection_name).find({folder_id: ObjectId(req.body.folder_id)}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
}