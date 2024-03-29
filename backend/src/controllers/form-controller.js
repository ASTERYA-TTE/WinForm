var ObjectId = require('mongodb').ObjectId
import { request } from 'express'
import { getDb } from '../services/database'
const collection_name = 'forms'

exports.create = (req, res) => {
  const form = {
    title: req.body.title,
    folder_id: req.body.folder_id == null ? null : ObjectId(req.body.folder_id),
    data: null,
  }

  getDb()
    .collection(collection_name)
    .insertOne(form, function (err, result) {
      if (err) throw err
      res.send(result)
    })
}

exports.list = (req, res) => {
  getDb()
    .collection(collection_name)
    .find({ folder_id: ObjectId(req.body.folder_id) })
    .toArray(function (err, result) {
      if (err) throw err
      res.send(result)
    })
}

exports.update = async (req, res) => {
  const formCollection = getDb().collection(collection_name)
  const result = await formCollection.updateOne(
    { _id: ObjectId(req.body.formId) },
    { $set: { data: req.body.data } }
  )

  res.send(result)
}

exports.getForm = async (req, res) => {
  const formCollection = getDb().collection(collection_name)
  const result = await formCollection.findOne(
    { _id: ObjectId(req.body.formId) },
    {}
  )

  res.send(result)
}

exports.deleteOne = async (req, res, json) => {
  const formCollection = getDb().collection(collection_name)

  const Query = { title: { $regex: 'm' || 'y' || 'a' || 'n' || 's' || 'r' } }

  const result = await formCollection.deleteOne({
    _id: ObjectId(req.body.formId),
  })

  if (result.deletedCount === 1) {
    res.send({ message: 'Form Silindi' })
  } else {
    res.send({ message: 'Form Silinemedi' })
  }
}

exports.updateFormTitle = async (req, res) => {
  const formCollection = getDb().collection(collection_name)

  const result = await formCollection.updateOne(
    { _id: ObjectId(req.body.formId) },

    { $set: { title: req.body.title, _id: ObjectId(req.body.formId) } }
  )

  res.send(result)
}
