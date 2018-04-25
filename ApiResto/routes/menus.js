var express = require('express');
var router = express.Router();

//controlleur
var menu_controller = require('../controller/menuControlleur');
///menu///
router.get('/', menu_controller.menu_index);
router.get('/:id/get', menu_controller.menu_get);
router.post('/:id/add', menu_controller.menu_add);
router.delete('/:id/remove', menu_controller.menu_delete);
router.get('/get/:id', menu_controller.menu_get_id);
router.post('/update/:id', menu_controller.menu_update_id);
router.delete('/remove/:id', menu_controller.menu_remove_id);

module.exports = router;