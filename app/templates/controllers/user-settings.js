'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the <%= appName %>
 */
angular.module('<%= appName %>')
  .controller('UserSettingsCtrl', function ($scope, Parse, tmAccounts, $mdDialog) {

    var user = Parse.User.current();

    tmAccounts
    .getSettingsByIdForEditing(user.get('settings').id)
    .then(function (settings) {
      $scope.settings = settings;
    },function (err) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Error :(')
          .content(err.message)
          .ok('Close')
      );
    },function (settings) {
      $scope.settings = settings;
    });

    $scope.updateSettings = function() {
      $scope.showLoading = true;

      tmAccounts
      .updateSettings($scope.settings)
      .then(function (settings) {
        $scope.showLoading = false;
        $scope.settings = settings;
      },function (err) {
        $scope.showLoading = false;
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error :(')
            .content(err.message)
            .ok('Close')
        );
      });
    };
  });
