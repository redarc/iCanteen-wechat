'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ImageSchema = new mongoose.Schema({
  path: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
},{
  versionKey:false
});

export default mongoose.model('Image', ImageSchema);
