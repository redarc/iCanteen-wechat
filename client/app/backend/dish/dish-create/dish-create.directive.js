'use strict';

angular.module('encWechatApp')
  .directive('fileread', function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                console.log(changeEvent.target.file);
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
  });
