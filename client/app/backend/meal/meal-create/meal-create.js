'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.meal.meal-create', {
        url: '/meal-create',
        templateUrl: 'app/backend/meal/meal-edit/meal-edit.html',
        controller: 'DashboardMealCreateCtrl'
      });
  });
