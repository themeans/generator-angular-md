'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>:PushCtrl
 * @description
 * # PushCtrl
 * Controller of the <%= appName %>
 */
angular.module('<%= appName %>')
  .controller('PushCtrl', function ($scope, Parse) {
    $scope.sendPush = function (){
      Parse.Push.send({
        channels: [ "BaseNotifications" ],
        data: {
          "alert": "Quit Your Jibba Jabba",
          "badge": "Increment",
          "location": "ROUTE"
        }
      });
    };
  });
