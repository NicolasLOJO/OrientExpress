var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/userController');

/* GET users listing. */
router.post('/verify', userCtrl.verify);
router.get('/:username/connected', userCtrl.connected);
router.post('/create', userCtrl.new_user);

module.exports = router;
