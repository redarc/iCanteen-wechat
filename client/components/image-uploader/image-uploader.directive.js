'use strict';

//depneds on bower package angular-qiniu-upload
//app.js depends on angularQFileUpload
angular.module('encWechatApp')
  .directive('imageuploader', function () {
    return {
      templateUrl: 'components/image-uploader/image-uploader.html',
      restrict: 'EA',
      scope: {
        selectFiles: '=',
        labelName: '@',
        multiUpload: '@'
      },
      controller : function($scope, $http, $log, $qupload, Auth) {
        var vm = $scope;
        console.log('---- initi directive --');
        console.log(typeof vm.multiUpload);

        vm.labelName = vm.labelName ? vm.labelName : '图片';

        function getQiuNiuToken(callback) {
          $http({
            url: '/api/services/storage/upload_token',
            method: 'GET',
            headers: {
              "Authorization" : "Bearer " + Auth.getToken()
            }
          }).success(function(data, header, config, status){
            callback(data.token);
          }).error(function(data, header, config, status){
            SweetAlert.swal("获取图片Token失败", data.message, "error");
            console.log(data);
          });
        }

        var start = function (index) {

          getQiuNiuToken(function(token){
            var fileForUpload = vm.selectFiles[index];
            console.log(fileForUpload);

            var uploadFileKey = Date.now() + fileForUpload.file.name;

            fileForUpload.progress = { p: 0 };
            fileForUpload.upload = $qupload.upload({
              key: uploadFileKey,
              file: fileForUpload.file,
              token: token
            });

            fileForUpload.upload.then(function (response) {
              fileForUpload.path = response.url + uploadFileKey;
              fileForUpload.description = '';
            }, function (response) {
              $log.info('upload failed');
              $log.info(response);
            }, function (evt) {
              fileForUpload.progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
            });

          });
        };

        vm.abort = function (index) {
          var fileForUpload = vm.selectFiles[index];
          console.log(fileForUpload);

          if(!_.isUndefined(fileForUpload.upload)) {
            fileForUpload.upload.abort();
          }
          vm.selectFiles.splice(index, 1);
        };

        vm.onFileSelect = function ($files) {
          console.log('-- onFileSelect ');
          console.log(vm.multiUpload);
          console.log(typeof vm.multiUpload);

          if(vm.multiUpload == 'true') {
            console.log('multiUpload');
            var offsetx = vm.selectFiles.length;
            for (var i = 0; i < $files.length; i++) {
              vm.selectFiles[i + offsetx] = { file: $files[i] };
              start(i + offsetx);
            }
          } else {
            console.log('not multiUpload');
            vm.selectFiles[0] = {file : $files[$files.length - 1]};
            start(0);
          }
        };

      },
      link: function (scope, element, attrs) {
        //none
      }
    };
  });
