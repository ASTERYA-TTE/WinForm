var express = require('express');
var router = express.Router();
import {create,list} from '../controllers/folder-controller';

router.post('/create', create);
router.post('/list', list);

module.exports = router;
