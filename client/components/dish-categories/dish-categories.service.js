'use strict';

angular.module('encWechatApp')
  .factory('DishCategories', function () {
    // Public API here
    return {
      categories : [
       {
         value: "主荤"
       },
       {
         value: "副荤"
       },
       {
         value: "蔬菜"
       },
       {
         value: "汤"
       },
       {
         value: "煲仔"
       },
       {
         value: "面点小吃"
       }
      ]
    };
  });
