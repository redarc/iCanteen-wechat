'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.dish.dish-edit', {
        url: '/dish-edit/{dishId}',
        templateUrl: 'app/backend/dish/dish-edit/dish-edit.html',
        controller: 'DashboardDishEditCtrl'
      });
  });
