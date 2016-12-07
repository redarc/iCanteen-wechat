/**
 * OperationRecord model events
 */

'use strict';

import {EventEmitter} from 'events';
var OperationRecord = require('./operation_record.model');
var OperationRecordEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OperationRecordEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  OperationRecord.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    OperationRecordEvents.emit(event + ':' + doc._id, doc);
    OperationRecordEvents.emit(event, doc);
  }
}

export default OperationRecordEvents;
