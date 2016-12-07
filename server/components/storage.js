var config = require('../config/environment');
var qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = config.qiniu.access_key;
qiniu.conf.SECRET_KEY = config.qiniu.secret_key;

var getUploadToken = function() {

  console.log(qiniu.conf.ACCESS_KEY);
  console.log(qiniu.conf.SECRET_KEY);
  console.log(config.qiniu.bucket_name);

  var putPolicy = new qiniu.rs.PutPolicy(config.qiniu.bucket_name);
  putPolicy.callbackUrl = config.cloud.domain_url + '/api/services/storage/callback';
  putPolicy.callbackBody =
    'name=$(fname)&size=$(fsize)&hash=$(etag)&w=$(imageInfo.width)&h=$(imageInfo.height)}';
  //putPolicy.callbackBody = '{ "name": $(fname), "size": $(fsize), "w": $(imageInfo.width), "h": $(imageInfo.height), "hash": $(etag)}';

  console.log('$$$ Qiniu put policy = ' + JSON.stringify(putPolicy, true, 2));
  return putPolicy.token();
};

var uploadResource = function(data, key, token, done) {
  var extra = new qiniu.io.PutExtra();
  //extra.params = params;
  //extra.mimeType = mimeType;
  //extra.crc32 = crc32;
  //extra.checkCrc = checkCrc;

  qiniu.io.put(token, key, data, extra, function(err, ret) {
    console.log(err);
    done(err, ret);
  });
};

module.exports.getUploadToken = getUploadToken;
module.exports.uploadResource = uploadResource;
