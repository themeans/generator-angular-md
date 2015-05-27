'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the <%= appName %>
 */
angular.module('<%= appName %>')
  <% if (accounts) { %>
  .controller('LoginCtrl', function ($scope, Parse, $state, tmAccounts, $mdDialog, tmLocalStorage) {
  <% } else { %>
  .controller('LoginCtrl', function ($scope, Parse, $state, $mdDialog) {
  <% } %>

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

    $scope.onLoginSuccess = function(user, isNewUser) {
      <% if (accounts) { %>
      ////// Query Parse for User roles and save to localStorage on login.
      tmAccounts
      .getUserRoles(user)
      .then(function (){
        if (!isNewUser) {
          // Existing user, return loginCompleted.
          return loginComplete();
        }
        // Run code here for new user on login success.//
        /////////////////////////////////////////////////
        loginComplete();

      }, function() {
        tmLocalStorage.clear();
        Parse.User.logOut();
        $state.go('login');
        $mdDialog.show(
          $mdDialog.alert()
          .title('You account is missing or something is wrong with authorisation.')
          .content('Please try loggin in again or contacting support.')
          .ok('Close')
        );
      });
      <% } else { %>
        loginComplete();
      <% } %>
    };

    function loginComplete(){
      $state.go('app.dashboard');
    }

  });
