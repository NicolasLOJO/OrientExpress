var express = require('express');
var router = express.Router();

//Futur controlleur
var carte_controller = require('../controller/carteControlleur');
var menu_controller = require('../controller/menuControlleur');
///carte///
router.get('/', carte_controller.carte_index);
router.get('/get', carte_controller.carte_get);
router.get('/:id/get', carte_controller.carte_details);
router.post('/add',carte_controller.carte_create_post);
router.delete('/:id/remove', carte_controller.carte_delete);
///menu///
router.get('/menus', menu_controller.menu_index);
router.get('/menus/:id/get', menu_controller.menu_get);
router.post('/menus/:id/add', menu_controller.menu_add);
router.delete('/menus/:id/remove', menu_controller.menu_delete);
router.get('/menus/get/:id', menu_controller.menu_get_id);
router.post('/menus/update/:id', menu_controller.menu_update_id);
router.delete('/menus/remove/:id', menu_controller.menu_remove_id);

module.exports = router;