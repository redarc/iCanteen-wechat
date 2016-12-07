'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import timestamps from 'mongoose-timestamp';

var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
  employee : {
    name : {
      type: String,
      default: ''
    },
    mobile : {
      type: String,
      default: ''
    },
    errmsg : {
      type: String,
      default: ''
    },
    department : {
      type: String,
      default: ''
    },
    attrs : {
      type: String,
      default: ''
    },
    gender : {
      type: String,
      default: ''
    },
    status : {
      type: String,
      default: ''
    },
    userid : {
      type: String,
      default: ''
    },
    weixinid : {
      type: String,
      default: ''
    },
    avatar : {
      type: String,
      default: ''
    }
  },

  meal_orders: [{
    meal: {
      type: Schema.ObjectId,
      ref: 'Meal'
    },
    amount: {
      type: Number,
      default: 1
    }
  }],

  dish_orders: [{
    dish: {
      type: Schema.ObjectId,
      ref: 'Dish'
    },
    amount: {
      type: Number,
      default: 1
    }
  }]

},{
  versionKey:false
});

OrderSchema.plugin(timestamps);
export default mongoose.model('Order', OrderSchema);
