'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.meal', {
        url: '/meal',
        abstract: true,
        templateUrl: 'app/backend/meal/meal.html',
        controller: 'DashboardMealCtrl'
      });
  });
