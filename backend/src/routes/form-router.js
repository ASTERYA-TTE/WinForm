var express = require('express');
var router = express.Router();
import {create,list} from '../controllers/form-controller';

router.post('/create', create);
router.post('/list', list);

module.exports = router;
