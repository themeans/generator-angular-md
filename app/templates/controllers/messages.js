'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>:MessagesCtrl
 * @description
 * # MessagesCtrl
 * Controller of the cree<%= appName %>mWebApp
 */
angular.module('<%= appName %>')
  .controller('MessagesCtrl', function ( $scope, Parse, tmMessages, $location, $mdDialog ) {

    $scope.threads = [];

    tmMessages
    .getThreads()
    .then(function (threads){
      $scope.threads = threads;
    },function (err){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Error.. ')
        .content(err.message)
        .ok('Got it!')
      );
    },function (cachedThreads){
      $scope.threads = cachedThreads;
    });

    $scope.openThread = function(thread){
      $location.url('/inbox/'+thread.objectId);
    };

  });
