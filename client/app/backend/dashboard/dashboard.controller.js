'use strict';

angular.module('encWechatApp')
  .controller('DashboardCtrl', function ($scope, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
