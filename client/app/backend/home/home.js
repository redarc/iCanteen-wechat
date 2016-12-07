'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.home', {
        url: '',
        templateUrl: 'app/backend/home/home.html',
        controller: 'DashboardHomeCtrl'
      });
  });
