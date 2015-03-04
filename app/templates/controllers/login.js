'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the creemWebApp
 */
angular.module('<%= appName %>')
  .controller('LoginCtrl', function ($scope, Parse, $state, tmAccounts, $mdDialog) {
    
    // md-parse-login directive configurations
    $scope.mdToolbarClass = 'md-primary md-default-theme';
    $scope.mdToolbarToolsClass= 'md-toolbar-tools';

    $scope.submitButtonClass = 'md-raised md-primary md-default-theme';
    $scope.submitButtonText = 'Submit';
    $scope.backButtonClass = 'md-raised md-primary';
    $scope.backButtonText = 'Back';

    $scope.loginInputsAttributes = 'layout="row" layout-sm="column"';
    $scope.loginButtonClass = 'md-raised md-primary md-default-theme';
    $scope.loginButtonText = 'Login';
    $scope.loginToolbarText = 'Enter your login details';

    $scope.createCustomDialog = true;
    $scope.createCustomDialogUrl = 'views/templates/createaccountmodal.tmpl.html';
    $scope.createCustomDialogCtrl = 'CreateAccountCtrl';
    $scope.createButtonClass = 'md-raised md-default-theme';
    $scope.createButtonText = 'Create Account';
    $scope.createToolbarText = 'Enter your details';
    $scope.createInputsAttributes = 'layout="column" layout-sm="column" layout-align="center center"';

    $scope.resetInputsAttributes = 'layout="row" layout-sm="column"';
    $scope.resetToolbarText = 'Enter your email address';
    // Sets a catch for logic on beforeSave User to assign a Parse.Role.
    $scope.user = {
      username: '',
      password: '',
      role: 0
    };

    $scope.onLoginSuccess = function(user){
      ////// Query Parse for User roles and save to localStorage on login.
      tmAccounts
      .getUserRoles(user)
      .then(function (roles){
        // Fail safe, problems with cloud-code setting role relations to user on signUp.
        if (!roles)
        {
          fail({ message: 'Please try again, or contact system admin' });
          return;
        }
        $state.go('app.dashboard');

      },function (err){
        // deferred reject; Parse.Role Query error
        fail(err.message);
      });
    };

    function fail(err){
      var alert = $mdDialog.confirm()
      .title('Something went wrong!')
      .content(err.message)
      .ok('Close');

      $mdDialog.show(alert).then(function() {
        Parse.User.logOut();
        $state.go('login');
      });
    }

  });
