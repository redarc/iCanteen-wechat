'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.dish.dish-list', {
        url: '',
        templateUrl: 'app/backend/dish/dish-list/dish-list.html',
        controller: 'DashboardDishListCtrl'
      });
  });
