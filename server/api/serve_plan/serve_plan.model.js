'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import timestamps from 'mongoose-timestamp';

var Schema = mongoose.Schema;
var ServePlanSchema = new mongoose.Schema({
  days_of_week: {
    type: Number,
    required: true,
    unique: true,
    enum: [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ]
  },

  meal_menu: [{
    type: Schema.ObjectId,
    ref: 'Meal'
  }],

  dish_menu: [{
    type: Schema.ObjectId,
    ref: 'Dish'
  }],

  line_name: {
    type: String,
    default: ''
  }
}, {
  versionKey: false
});

ServePlanSchema.plugin(timestamps);

export default mongoose.model('ServePlan', ServePlanSchema);
