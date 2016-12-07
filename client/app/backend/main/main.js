'use strict';

angular.module('encWechatApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/backend/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
