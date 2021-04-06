const express = require('express');
const router = express.Router();
const comsCtrl = require('../controllers/Coms');
const auth = require('../middleware/auth');

router.post('/coms', comsCtrl.createCom);

module.exports = router;