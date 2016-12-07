'use strict';

angular.module('encWechatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('canteen', {
        url: '/canteen',
        templateUrl: 'app/frontend/canteen/canteen.html',
        controller: 'CanteenCtrl'
      });
  });
