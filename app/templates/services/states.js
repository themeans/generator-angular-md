'use strict';

/**
 * @ngdoc service
 * @name <%= appName %>:STATES
 * @description
 * # STATES
 *    Extracted stateProvider objects with options for access control and nav display.
 */
angular.module('<%= appName %>')
  .constant('STATES', {
    <% if(accounts) { %>
    'login': {
      name: 'Login',
      stateProviderConfig: {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html'
      },
      accessControl: {
        allow: ['public']
      }
    },
    <% } %>
    'app': {
      stateProviderConfig: {
        abstract: true,
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'
      },
      accessControl: {
        allow: []
      }
    },
    'app.dashboard': {
      name: 'Dashboard',
      stateProviderConfig: {
        url: '/dashboard',
        views: {
          'menuContent': {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }
      },
      accessControl: {
        allow: ['user']
      }
    },
    <% if(accounts) { %>
    'app.user-profile': {
      name: 'User Profile',
      stateProviderConfig: {
        url: '/user-profile',
        views: {
          'menuContent': {
            templateUrl: 'views/user-profile.html',
            controller: 'UserProfileCtrl'
          }
        }
      },
      accessControl: {
        allow: ['user']
      }
    },
    'app.user-settings': {
      name: 'User Settings',
      stateProviderConfig: {
        url: '/user-settings',
        views: {
          'menuContent': {
            templateUrl: 'views/user-settings.html',
            controller: 'UserSettingsCtrl'
          }
        }
      },
      accessControl: {
        allow: ['user', 'admin']
      }
    },
    <% } %>
    <% if(push) { %>
    'app.push': {
      name: 'Send Notification',
      stateProviderConfig: {
        url: '/push',
        views: {
          'menuContent': {
            templateUrl: 'views/push.html',
            controller: 'PushCtrl'
          }
        }
      },
      accessControl: {
        allow: ['admin']
      }
    },
    <% } %>
    <% if(messages) { %>
    'app.messages': {
      name: 'Inbox',
      stateProviderConfig: {
        url: '/inbox',
        views: {
          'menuContent': {
            templateUrl: 'views/messages.html',
            controller: 'MessagesCtrl'
          }
        }
      },
      accessControl: {
        allow: ['user', 'admin']
      }
    },
    'app.message': {
      stateProviderConfig: {
        url: '/inbox/:threadId',
        views: {
          'menuContent': {
            templateUrl: 'views/message.html',
            controller: 'MessageCtrl'
          }
        }
      },
      accessControl: {
        allow: ['user', 'admin']
      }
    }
    <% } %>
  });