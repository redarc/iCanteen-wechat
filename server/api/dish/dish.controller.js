/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dishes              ->  index
 * POST    /api/dishes              ->  create
 * GET     /api/dishes/:id          ->  show
 * PUT     /api/dishes/:id          ->  update
 * DELETE  /api/dishes/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Dish = require('./dish.model');
var Image = require('../image/image.model');

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

function saveEntityUpdates(entity, updates){
  var updated = _.merge(entity, updates);
  return updated.saveAsync()
    .spread(updated => {
      return updated;
    });
}

function saveDishUpdatesWithImages(entity, updates) {
  return function(docs) {
    updates.images = eval(JSON.stringify(docs.insertedIds));
    return saveEntityUpdates(entity, updates);
  }
}

function saveUpdates(updates) {
  return function(entity) {
    entity.images = [];
    var images = updates.images;
    if(_.isEmpty(images) || _.isUndefined(images)){
      return saveEntityUpdates(entity, updates);
    } else {
      return Image.collection.insertAsync(images)
        .then(saveDishUpdatesWithImages(entity, updates));
    }
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

// Gets a list of Dishs
export function index(req, res) {
  Dish.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Dish from the DB
export function show(req, res) {
  Dish.findById(req.params.id)
    .populate('images')
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Dish in the DB
export function create(req, res) {
  var data = req.body;
  if(_.isEmpty(data.images) || _.isUndefined(data.images)){
    Dish.createAsync(req.body)
      .then(responseWithResult(res, 201))
      .catch(handleError(res));
  } else {
    Image.collection.insertAsync(data.images)
      .then(function(docs) {
        data.images = eval(JSON.stringify(docs.insertedIds));
        return Dish.createAsync(data);
      })
      .then(responseWithResult(res, 201))
      .catch(handleError(res));
  }
}

// Updates an existing Dish in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Dish.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Dish from the DB
export function destroy(req, res) {
  Dish.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
