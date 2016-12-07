'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var MealOrderSum = new mongoose.Schema({
  meal: {
    type: Schema.ObjectId,
    ref: 'Meal'
  },
  sum_meal_order_amount: {
    type: Number,
    default: 0
  },
  sum_ordered_employees: [{
    type: Number,
    default: 0
  }]
},{
  versionKey:false
});

export default mongoose.model('MealOrderSum', MealOrderSum);
