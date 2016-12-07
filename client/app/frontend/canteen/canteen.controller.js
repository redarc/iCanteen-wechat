'use strict';

angular.module('encWechatApp')
  .controller('CanteenCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.content = [{'name':'张春玲','age':28},{'name':'王晰','age':26},{'name':'吴正青','age':66}];

    $scope.dropComplete = function(index, obj){
      var idx = $scope.content.indexOf(obj);
      $scope.content.splice(idx,1);
      $scope.content.splice(index,0,obj);
    };

  });
