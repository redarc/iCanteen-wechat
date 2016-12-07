'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('daily_serve', {
        url: '/daily_serve?code',
        templateUrl: 'app/frontend/daily_serve/daily_serve.html',
        controller: 'DailyServeCtrl'
      });
  });
