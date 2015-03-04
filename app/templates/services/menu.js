'use strict';

/**
 * @ngdoc service
 * @name <%= appName %>
 * @description
 * # Menu
 *    Factory for menu generation, with self awareness and visibility from user roles & state accessControls.
 */
angular.module('<%= appName %>')
  .factory('Menu', function ( $state <% if (accounts) { %>, tmLocalStorage, Parse <% } %>) {

    // Takes an array of State objects to generate app specific sections with self-awareness &
    // visibility methods.
    var Menu = function(sectionsConfig){
      this.sections = sectionsConfig;
      return this;
    };

    Menu.prototype.selectSection = function(section, beforeSectionChange) {
      this.currentPage = undefined;
      this.setSection(section);
      if (section.stateProviderConfig.name)
      {
        if(typeof beforeSectionChange === 'function')
        {
          beforeSectionChange();
        }
        $state.go(section.stateProviderConfig.name);
      }
    };

    Menu.prototype.setSection = function (section){
      this.openedSection = section;
    };

    Menu.prototype.isSectionSelected = function(section) {
      return this.openedSection === section;
    };

    Menu.prototype.selectPage = function(page) {
      if (page && page.stateProviderConfig.name)
      {
        this.setPage(page);
        // TODO: amay0048 - this probably needs this to stop
        // animation strangeness
        // $ionicHistory.nextViewOptions({
        //   disableAnimate: true
        // });
        $state.go(page.stateProviderConfig.name);
      }
    };

    Menu.prototype.setPage = function (page){
      this.currentPage = page;
    };

    Menu.prototype.isPageSelected = function(page) {
      return this.currentPage === page;
    };

    Menu.prototype.currentSectionOrPage = function () {
      if (this.currentPage)
      {
        return this.currentPage;
      }
      return this.openedSection;
    };

    Menu.prototype.visible = function(menuObject) {
      <% if (accounts) { %>
      if ( Parse.User.current() ){

        var userRoles = tmLocalStorage.getObject(Parse.User.current().id + '-roles', []);

        if (userRoles.length) {

          var allowed = menuObject.accessControl.allow;
          var concatArray = userRoles.concat(allowed).sort();

          for(var i = 1; i < concatArray.length; i++){

            if (concatArray[i - 1] === concatArray[i]){

              return true;
            }
          }
          return false;
        }
      }
      <% } else { %>
        return true;
      <% } %>
    };

    return Menu;
  });
