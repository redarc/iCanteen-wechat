/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/operation_records              ->  index
 * POST    /api/operation_records              ->  create
 * GET     /api/operation_records/:id          ->  show
 * PUT     /api/operation_records/:id          ->  update
 * DELETE  /api/operation_records/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var OperationRecord = require('./operation_record.model');

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

// Gets a list of OperationRecords
export function index(req, res) {
  OperationRecord.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single OperationRecord from the DB
export function show(req, res) {
  OperationRecord.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new OperationRecord in the DB
export function create(req, res) {
  OperationRecord.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing OperationRecord in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  OperationRecord.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a OperationRecord from the DB
export function destroy(req, res) {
  OperationRecord.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
