'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        abstract: true,
        referrer: 'login',
        templateUrl: 'app/backend/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
  });
