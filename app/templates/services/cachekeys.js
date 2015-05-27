'use strict';

/**
 * @ngdoc service
 * @name creemWebApp.shared/CACHEKEYS
 * @description
 * # shared/CACHEKEYS
 * Constant in the creemWebApp.
 */
angular.module('<%= appName %>')
  .constant('CACHEKEYS', {
    user: {
      key: 'User',
      roles:{
        key:'User/Roles'
      },
      settings: {
        key: 'User/Settings',
        edit: {
          key: 'User/Settings/Edit'
        },
      },
    },
    <% if (messages) { %>
    messages: {
      key: '<%= appName %>/Messages',
      edit: {
        key: '<%= appName %>/Messages/Edit'
      },
      threads: {
        key: '<%= appName %>/Messages/Threads',
        edit: '<%= appName %>/Messages/Threads/Edit'
      },
      thread: {
        key: '<%= appName %>/Messages/Thread',
        edit: {
          key: '<%= appName %>/Messages/Thread/Edit'
        }
      }
    }
    <% } %>
});
