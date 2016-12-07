'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import timestamps from 'mongoose-timestamp';
var Schema = mongoose.Schema;

var DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    default: 0
  },
  images: [{
    type: Schema.ObjectId,
    ref: 'Image'
  }],
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: [
      '主荤',
      '副荤',
      '蔬菜',
      '汤',
      '煲仔',
      '面点小吃'
    ]
  }
},{
  versionKey:false
});

DishSchema.plugin(timestamps);

export default mongoose.model('Dish', DishSchema);
