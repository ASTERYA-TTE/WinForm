var express = require('express')
var router = express.Router()
import {
  create,
  list,
  update,
  getForm,
  deleteOne,
  updateFormTitle,
} from '../controllers/form-controller'

router.post('/create', create)
router.post('/list', list)
router.post('/update', update)
router.post('/getForm', getForm)
router.post('/deleteOne', deleteOne)
router.post('/updateFormTitle', updateFormTitle)

module.exports = router
