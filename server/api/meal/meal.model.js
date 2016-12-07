'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import timestamps from 'mongoose-timestamp';

var Schema = mongoose.Schema;
var MealSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    default: ''
  },
  images: [{
    type: Schema.ObjectId,
    ref: 'Image'
  }],
  price: {
    type: Number,
    default: 0
  },
  package: [{
    type: Schema.ObjectId,
    required: true,
    ref: 'Dish'
  }]
},{
  versionKey:false
});

MealSchema.plugin(timestamps);

export default mongoose.model('Meal', MealSchema);
