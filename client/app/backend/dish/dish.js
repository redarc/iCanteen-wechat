'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.dish', {
        url: '/dish',
        abstract: true,
        templateUrl: 'app/backend/dish/dish.html',
        controller: 'DashboardDishCtrl'
      });
  });
