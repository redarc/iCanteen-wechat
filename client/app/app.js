'use strict';

angular.module('encWechatApp', [
  'encWechatApp.auth',
  'encWechatApp.admin',
  'encWechatApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.select',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'oitozero.ngSweetAlert',
  'datatables',
  'datatables.buttons',
  'isteven-multi-select',
  'angularQFileUpload',
  'daterangepicker',
  'ngDraggable'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  });
