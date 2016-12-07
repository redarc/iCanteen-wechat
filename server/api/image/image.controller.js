'use strict';

import _ from 'lodash';
var Image = require('./image.model');

export function saveBundleImages(images) {
  return Image.collection.insertAsync(images)
}
