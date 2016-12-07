'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var DishOrderSum = new mongoose.Schema({
  dish: {
    type: Schema.ObjectId,
    ref: 'Dish'
  },
  sum_dish_order_amount: {
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

export default mongoose.model('DishOrderSum', DishOrderSum);
