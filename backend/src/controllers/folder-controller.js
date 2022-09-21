var ObjectId = require('mongodb').ObjectId;
import {getDb} from '../services/database';
const collection_name = 'folders';

exports.create = (req,res) => {

    const folder = {
        'title': req.body.title,
        'parent_id': req.body.parent_id == null ? null : ObjectId(req.body.parent_id)
    }

    getDb().collection(collection_name).insertOne(folder, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
}

exports.list =  (req,res) => {
    getDb().collection(collection_name).find({parent_id: req.body.parent_folder_id}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
}