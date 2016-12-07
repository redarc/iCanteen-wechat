'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.dish.dish-create', {
        url: '/dish-create',
        templateUrl: 'app/backend/dish/dish-edit/dish-edit.html',
        controller: 'DashboardDishCreateCtrl'
      });
  });
