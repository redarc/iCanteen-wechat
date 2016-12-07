'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.meal.meal-list', {
        url: '',
        templateUrl: 'app/backend/meal/meal-list/meal-list.html',
        controller: 'DashboardMealListCtrl'
      });
  });
