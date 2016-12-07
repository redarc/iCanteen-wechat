/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/serve_plan              ->  index
 * POST    /api/serve_plan              ->  create
 * GET     /api/serve_plan/:days_of_week          ->  show
 * PUT     /api/serve_plan/:id          ->  update
 * DELETE  /api/serve_plan/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var ServePlan = require('./serve_plan.model');

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
    entity.dish_menu = [];
    entity.meal_menu = [];
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

function getNestedEntity() {
  return function(entity) {
    var options = {
      path: 'meal_menu.package',
      model: 'Dish'
    }
    return ServePlan.populate(entity, options);
  }
}

// Gets a list of ServePlans
export function index(req, res) {
  ServePlan.find()
    .populate('dish_menu meal_menu')
    .execAsync()
    .then(getNestedEntity())
    .then(responseWithResult(res))
    .catch(handleError(res));
}

export function showByDayOfWeek(req, res) {
  ServePlan.findOne({days_of_week : req.params.dayOfWeek})
    .populate('dish_menu meal_menu')
    .execAsync()
    .then(getNestedEntity())
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single ServePlan from the DB
export function show(req, res) {
  ServePlan.findById(req.params.id)
    .populate('dish_menu meal_menu')
    .execAsync()
    .then(getNestedEntity())
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new ServePlan in the DB
export function create(req, res) {
  ServePlan.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ServePlan in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  ServePlan.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a ServePlan from the DB
export function destroy(req, res) {
  ServePlan.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
