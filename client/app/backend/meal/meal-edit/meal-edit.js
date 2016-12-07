'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.meal.meal-edit', {
        url: '/meal-edit/:mealId',
        templateUrl: 'app/backend/meal/meal-edit/meal-edit.html',
        controller: 'DashboardMealEditCtrl'
      });
  });
