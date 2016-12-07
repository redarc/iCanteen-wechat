'use strict';

import _ from 'lodash';
import winston from 'winston';
import async from 'async';

var storage = require('../../components/storage');
var config = require('../../config/environment');
var ET = require('../../components/errors').ErrorTable;

export function getUploadToken(req, res) {
  var token = storage.getUploadToken();
  res.status(200).json({
    token: token
  });
}

export function uploadResource(req, res) {
  storage.uploadResource(req.body.data, req.body.key, req.body.token, function(err, ret) {
    if (err) {
      winston.error(err);
      return res.finish(400, ET.operation_failure);
    }
    res.status(200).json(ret);
  })
}

export function handleUploadCallback(req, res) {
  winston.info('Body = ' + req.body);
  var data = {
    name: req.body.name,
    url: config.qiniu.service_url + '/' + req.body.name
  };
  res.status(200).json(data);
}
