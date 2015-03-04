'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the <%= appName %>
 */
angular.module('<%= appName %>')
  .controller('MenuCtrl', function ( $scope, $state, <% if(accounts) { %>Parse, tmLocalStorage, <% } %>Menu, STATES ) {

    // menu factory
    $scope.menu = new Menu([
      STATES['app.dashboard'],
      <% if(messages) { %>
      STATES['app.messages'],
      <% } %>
      <% if(push) { %>
      {
        name: 'Push Notifications',
        stateProviderConfig: {
          name: ''
        },
        accessControl: {
          allow: STATES['app.push'].accessControl.allow
        },
        pages: [
          STATES['app.push']
        ]
      },
      <% } %>
      <% if(accounts) { %>
      STATES['app.user-profile'],
      STATES['app.user-settings'],
      <% } %>
    ]);

    (function onPageLoad() {
      var state = $state.current.name;

      $scope.menu.sections.forEach(function (section) {
        if (section.stateProviderConfig.name === state){

          $scope.menu.setSection(section);
        }
        else if (section.pages){

          section.pages.forEach(function (page){
            if (page.stateProviderConfig.name === state){

              $scope.menu.setPage(page);
              $scope.menu.setSection(section);
            }
          });
        }
      });
    })();

    <% if(accounts) { %>
    $scope.logOutOnClick = function(){
      tmLocalStorage.removeItem( Parse.User.current().id + '-roles' );
      Parse.User.logOut();
      $state.go('login');
    };
    <% } %>

  });
