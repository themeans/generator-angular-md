'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the <%= appName %>
 */
angular.module('<%= appName %>')
  .controller('UserProfileCtrl', function ($scope, Parse, tmProfiles, $mdDialog) {

    var user = Parse.User.current();

    tmProfiles
    .getProfileByIdForEditing(user.get('profile').id)
    .then(function (profile) {
      $scope.profile = profile;
    },function (err) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Error :(')
          .content(err.message)
          .ok('Close')
      );
    },function (profile) {
      $scope.profile = profile;
    });

    $scope.updateProfile = function() {
      $scope.showLoading = true;

      tmProfiles
      .updateProfile($scope.profile)
      .then(function (profile) {
        $scope.showLoading = false;
        $scope.profile = profile;
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
