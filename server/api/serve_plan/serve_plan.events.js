/**
 * ServePlan model events
 */

'use strict';

import {EventEmitter} from 'events';
var ServePlan = require('./serve_plan.model');
var ServePlanEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ServePlanEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ServePlan.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ServePlanEvents.emit(event + ':' + doc._id, doc);
    ServePlanEvents.emit(event, doc);
  }
}

export default ServePlanEvents;
