'use strict';

var express = require('express');
var controller = require('./service.controller');

var router = express.Router();

router.get('/storage/upload_token', controller.getUploadToken);
router.post('/storage/upload', controller.uploadResource);
router.post('/storage/callback', controller.handleUploadCallback);

module.exports = router;
