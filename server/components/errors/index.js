/**
 * Error responses
 */

'use strict';

var express = require('express');
var config = require('../../config/environment');
var i18n = require('i18n');
var util = require('util');
var winston = require('winston');

i18n.configure({
  locales: ['en', 'zh'],
  defaultLocale: 'zh',
  directory: config.root + '/server/locales'
});

var RestError = function RestError(code, message, cutomized) {
  Error.call(this);
  this.err_code = code;
  if(cutomized) {
    this.err_message = message;
  } else {
    this.err_message = i18n.__(message);
  }
};

util.inherits(RestError, Error);

module.exports.ErrorTable = {
  'success': new RestError(20000, 'success'),
  'incorrect_parameters': new RestError(40000, 'Incorrect parameters'),
  'operation_failure': new RestError(40001, 'Operation failure'),
  'invalid_password': new RestError(40003, 'Invalid password'),
  'user_duplicate': new RestError(40004, 'User duplicate'),
  'user_not_exists': new RestError(40005, 'User not exists'),
  'invalid_captcha': new RestError(40006, 'Invalid captcha'),
  'permission_denied': new RestError(40007, 'Permission denied'),
  'duplicate_records': new RestError(40008, 'Duplicate records'),
  'exceed_order_time_span': new RestError(40009, 'exceed-order-time-span'),
  'exceed_abort_order_time_span': new RestError(40010, 'exceed-abort-order-time-span'),
  'server_internal_error': new RestError(50000, 'Server internal error')
};

express.response.finish = function(statusCode, error) {
  var result = {
    code: error.err_code,
    message: error.err_message
  };
  this.status(statusCode).json(result)
};

module.exports.shortcuts = {
  404 : function pageNotFound(req, res) {
    var viewFilePath = '404';
    var statusCode = 404;
    var result = {
      status: statusCode
    };

    res.status(result.status);
    res.render(viewFilePath, {}, function (err, html) {
      if (err) {
        return res.json(result, result.status);
      }

      res.send(html);
    });
  }
};

module.exports.RestError = RestError;

