/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/meals              ->  index
 * POST    /api/meals              ->  create
 * GET     /api/meals/:id          ->  show
 * PUT     /api/meals/:id          ->  update
 * DELETE  /api/meals/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Meal = require('./meal.model');
var Image = require('../image/image.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
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

function saveBundleDishes(dishes) {
  return function () {
    return Dish.collection.insertAsync(dishes)
  }
}

function saveEntityUpdates(entity, updates){
  var updated = _.merge(entity, updates);
  return updated.saveAsync()
    .spread(updated => {
      return updated;
    });
}

function saveUpdatesWithImages(entity, updates) {
  return function(docs) {
    updates.images = eval(JSON.stringify(docs.insertedIds));
    console.log('###### saveUpdatesWithImages ########');
    console.log(updates);
    return saveEntityUpdates(entity, updates);
  }
}

function saveUpdates(updates) {
  return function(entity) {
    entity.package =[];
    //
    entity.images = [];
    var images = updates.images;
    if(_.isEmpty(images) || _.isUndefined(images)){
      console.log('########### image none ###########');
      return saveEntityUpdates(entity, updates);
    } else {
      console.log('########### image not none ###########');
      return Image.collection.insertAsync(images)
        .then(saveUpdatesWithImages(entity, updates));
    }
    //
    // var updated = _.merge(entity, updates);
    // return updated.saveAsync()
    //   .spread(updated => {
    //     return updated;
    //   });
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

// Gets a list of Meals
export function index(req, res) {
  Meal.find()
    .populate('package')
    .execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Meal from the DB
export function show(req, res) {
  Meal.findById(req.params.id)
    .populate('package images')
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Meal in the DB
export function create(req, res) {
  var data = req.body;
  if(_.isEmpty(data.images) || _.isUndefined(data.images)){
    Meal.createAsync(req.body)
      .then(responseWithResult(res, 201))
      .catch(handleError(res));
  } else {
    Image.collection.insertAsync(data.images)
      .then(function(docs) {
        data.images = eval(JSON.stringify(docs.insertedIds));
        return Meal.createAsync(data);
      })
      .then(responseWithResult(res, 201))
      .catch(handleError(res));
  }
}

// Updates an existing Meal in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Meal.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Meal from the DB
export function destroy(req, res) {
  Meal.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
