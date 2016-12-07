'use strict';

var express = require('express');
var controller = require('./order.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

// router.get('/mealorders', controller.indexMealOrders);
// router.get('/dishorders', controller.indexDishOrders);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/summary', controller.indexOrderSummary);
router.get('/summary/detail', controller.indexOrdersByOrderName);
router.get('/:id', controller.show);
router.get('/admin/:id', controller.showByAdmin);
router.post('/', controller.create);
router.post('/admin/', auth.isAuthenticated(), controller.createByAdmin);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', controller.destroy);
router.delete('/admin/:id', auth.isAuthenticated(), controller.destroyByAdmin);

module.exports = router;
