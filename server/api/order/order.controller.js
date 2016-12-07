/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import config from '../../config/environment';
var Order = require('./order.model');
var Meal = require('../meal/meal.model');
var MealOrderSum = require('../meal_order_sum/meal_order_sum.model');
var DishOrderSum = require('../dish_order_sum/dish_order_sum.model');
var Moment = require("moment");
var RestError = require('../../components/errors').RestError;
var ET = require('../../components/errors').ErrorTable;
var Promise = require("bluebird");
//For ObjectId
var mongoose = require('mongoose');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleDuplicateEntity(data) {
  return function(entity) {
    if (_.isEmpty(entity)) {
      return Order.createAsync(data);
    }
    var createdAt = Moment(entity.createdAt).format("YYYY年MM月DD日 HH:mm");
    var message = '您已于' + createdAt + '订餐, 请不要重复订餐，谢谢!';
    throw new RestError(40001, message, true);
  }
}

function getNestedEntity() {
  return function(entity) {
    var options = {
      path: 'meal_orders.meal.package',
      model: 'Dish'
    }
    return Order.populate(entity, options);
  }
}

// Gets a list of Orders
export function index(req, res) {
  Order.find()
    .populate('meal_orders.meal dish_orders.dish')
    .execAsync()
    .then(getNestedEntity())
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Order from the DB
// Get by phone
export function showByAdmin(req, res) {
  Order.findById(req.params.id)
    .populate('meal_orders.meal dish_orders.dish')
    .execAsync()
    .then(getNestedEntity())
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Order from the DB
// Get by phone
export function show(req, res) {
  //00:00 - 16:00 is valid order span
  // var orderTimeMin = Moment({hour: 0});
  // var orderTimeMax = Moment({hour: 16});

  var orderTimeMin = Moment(config.orderTime.min, "HH:mm");
  var orderTimeMax = Moment(config.orderTime.max, "HH:mm");

  var filter = {
      "employee.userid": {
        $eq: req.params.id
      },
      "createdAt": {
        $gte: orderTimeMin.toDate(),
        $lte: orderTimeMax.toDate()
      }
    };

  Order.findOne(filter)
    .populate('meal_orders.meal dish_orders.dish')
    .execAsync()
    .then(getNestedEntity())
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Order in the DB by Admin
export function createByAdmin(req, res) {
  Order.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Creates a new Order in the DB
export function create(req, res) {
  // var orderTimeMin = Moment({hour: 0});
  // var orderTimeMax = Moment({hour: 16});

  var orderTimeMin = Moment(config.orderTime.min, "HH:mm");
  var orderTimeMax = Moment(config.orderTime.max, "HH:mm");
  var now = Moment();

  if(!now.isBetween(orderTimeMin, orderTimeMax)){
    console.log('order time is out of valid time span');
    return res.status(500).json(ET.exceed_order_time_span);
  }

  var filter = {
      "employee.userid": {
        $eq: req.body.employee.userid
      },
      "createdAt": {
        $gte: orderTimeMin.toDate(),
        $lte: orderTimeMax.toDate()
      }
    };

  Order.findOne(filter)
    .execAsync()
    .then(handleDuplicateEntity(req.body))
    .then(responseWithResult(res, 201))
    .catch(handleError(res));

}

// Updates an existing Order in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Order from the DB
export function destroy(req, res) {
  var orderTimeMin = Moment(config.orderTime.min, "HH:mm");
  var orderTimeMax = Moment(config.orderTime.max, "HH:mm");
  var now = Moment();

  if(!now.isBetween(orderTimeMin, orderTimeMax)){
    console.log('abort order time is out of valid time span');
    return res.status(500).json(ET.exceed_abort_order_time_span);
  }

  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Deletes a Order from the DB
export function destroyByAdmin(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function getMealOrderSummary(orderTimeMin,  orderTimeMax) {
  console.log('getMealOrderSummary');
  return Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: orderTimeMin.toDate(),
            $lte: orderTimeMax.toDate()
          }
        }
      },
      {
        $unwind: "$meal_orders"
      },
      {
        $project: {
          _id: true,
          employee: true,
          createdAt: true,
          updatedAt: true,
          meal_order: {
            meal: "$meal_orders.meal",
            amount: "$meal_orders.amount"
          }
        }
      },
      {
        $group : {
          _id: "$meal_order.meal",
          sum_order_amount: { $sum : "$meal_order.amount"},
          sum_ordered_employees: { $addToSet: "$employee.userid"}
        }
      },
      {
        $project: {
          _id: false,
          meal: "$_id",
          sum_order_amount: true,
          sum_ordered_employees: true,
        }
      }
    ])
  .execAsync()
  .then(function(entity) {
    return MealOrderSum.populate(entity, 'meal');
  })
}

function getDishOrderSummary(orderTimeMin,  orderTimeMax) {
  console.log('getDishOrderSummary');
  return Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: orderTimeMin.toDate(),
            $lte: orderTimeMax.toDate()
          }
        }
      },
      {
        $unwind: "$dish_orders"
      },
      {
        $project: {
          _id: true,
          employee: true,
          createdAt: true,
          updatedAt: true,
          dish_order: {
            dish: "$dish_orders.dish",
            amount: "$dish_orders.amount"
          }
        }
      },
      {
        $group : {
          _id: "$dish_order.dish",
          sum_order_amount: { $sum : "$dish_order.amount"},
          sum_ordered_employees: { $addToSet: "$employee.userid"}
        }
      },
      {
        $project: {
          _id: false,
          dish: "$_id",
          sum_order_amount: true,
          sum_ordered_employees: true
        }
      }
    ])
  .execAsync()
  .then(function(entity) {
    return DishOrderSum.populate(entity, 'dish');
  })
}

//for order search by date range
export function indexOrderSummary(req, res) {
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;

  var orderTimeMin = startDate ? Moment(startDate + config.orderTime.min , 'YYYY-MM-DD HH:mm') : Moment(config.orderTime.min, "HH:mm");
  var orderTimeMax = endDate ? Moment(endDate + config.orderTime.max , 'YYYY-MM-DD HH:mm') : Moment(config.orderTime.max, "HH:mm");

  console.log(orderTimeMin.toDate());
  console.log(orderTimeMax.toDate());

  Promise.all([
    getMealOrderSummary(orderTimeMin, orderTimeMax),
    getDishOrderSummary(orderTimeMin, orderTimeMax)
  ])
  .then(function([mealOrderSum, dishOrderSum]){
    var result = mealOrderSum;
    for(var item of dishOrderSum){
      result.push(item);
    }
    return result;
  })
  .then(responseWithResult(res))
  .catch(handleError(res));
}

function getMealOrderDetail(orderTimeMin,  orderTimeMax, mealId) {
  return Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: orderTimeMin.toDate(),
            $lte: orderTimeMax.toDate()
          }
        }
      },
      {
        $unwind: "$meal_orders"
      },
      {
        $project: {
          _id: true,
          employee: true,
          createdAt: true,
          updatedAt: true,
          meal: "$meal_orders.meal",
          amount: "$meal_orders.amount"
        }
      },
      {
        $match: {
          meal: mongoose.Types.ObjectId(mealId)
        }
      }
    ])
  .execAsync();
}


function getDishOrderDetail(orderTimeMin,  orderTimeMax, dishId) {
  return Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: orderTimeMin.toDate(),
            $lte: orderTimeMax.toDate()
          }
        }
      },
      {
        $unwind: "$dish_orders"
      },
      {
        $project: {
          _id: true,
          employee: true,
          createdAt: true,
          updatedAt: true,
          dish: "$dish_orders.dish",
          amount: "$dish_orders.amount"
        }
      },
      {
        $match: {
          dish: mongoose.Types.ObjectId(dishId)
        }
      }
    ])
  .execAsync();
}

//indexOrdersByOrderName
export function indexOrdersByOrderName(req, res) {
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;

  var orderTimeMin = startDate ? Moment(startDate + config.orderTime.min , 'YYYY-MM-DD HH:mm') : Moment(config.orderTime.min, "HH:mm");
  var orderTimeMax = endDate ? Moment(endDate + config.orderTime.max , 'YYYY-MM-DD HH:mm') : Moment(config.orderTime.max, "HH:mm");

  console.log(orderTimeMin.toDate());
  console.log(orderTimeMax.toDate());

  var mealId = req.query.mealId;
  var dishId = req.query.dishId;

  if(!_.isEmpty(mealId)) {
    getMealOrderDetail(orderTimeMin, orderTimeMax, mealId)
    .then(responseWithResult(res))
    .catch(handleError(res));
  } else if(!_.isEmpty(dishId)) {
    getDishOrderDetail(orderTimeMin, orderTimeMax, dishId)
    .then(responseWithResult(res))
    .catch(handleError(res));
  }
}
