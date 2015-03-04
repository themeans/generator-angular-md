'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var yeomanAngular = require('generator-angular');
// console.log(yeomanAngular);

var bowerModules = [
  {
    value: {
      key: 'themeans-parse',
      val: 'https://github.com/themeans/themeans.git#bower-parse',
      dep: 'tm.parse'
    },
    name:'themeans-parse.js',
    checked: true,
  },
  {
    value: {
      key: 'themeans-consolelog',
      val: 'https://github.com/themeans/themeans.git#bower-consolelog',
      dep: 'tm.consolelog'
    },
    name:'themeans-consolelog.js',
    checked: true,
  },
  {
    value: {
      key: 'themeans-localstorage',
      val: 'https://github.com/themeans/themeans.git#bower-localstorage',
      dep: 'tm.localstorage'
    },
    name:'themeans-localstorage.js',
    checked: true,
  },
  {
    value: {
      key: 'themeans-jquery-tags',
      val: 'https://github.com/themeans/themeans.git#bower-jquery-tags',
      dep: 'tm.jquery-tags'
    },
    name:'themeans-jquery-tags.js',
    checked: false,
  },
  {
    value: {
      key: 'themeans-geolocation',
      val: 'https://github.com/amay0048/themeans.git#bower-geolocation',
      dep: 'tm.geolocation'
    },
    name:'themeans-geolocation.js',
    checked: false,
  }
];

var bowerModulesParse = [
  {
    value: {
      key: 'themeans-md-parse-login',
      val: 'https://github.com/themeans/themeans.git#bower-md-parse-login',
      dep: 'tm.md-parse-login'
    },
    name:'themeans-md-parse-login.js',
    checked: true,
  },
  {
    value: {
      key: 'themeans-parse-accounts-service',
      val: 'https://github.com/themeans/themeans.git#bower-parse-accounts-service',
      dep: 'tm.parseAccounts'
    },
    name:'themeans-parse-accounts-service.js',
    checked: true,
  },
  {
    value: {
      key: 'themeans-parse-profiles-service',
      val: 'https://github.com/themeans/themeans.git#bower-parse-profiles-service',
      dep: 'tm.parseProfiles'
    },
    name:'themeans-parse-profiles-service.js',
    checked: true,
  },
  {
    value: {
      key: 'themeans-parse-messages',
      val: 'https://github.com/themeans/themeans.git#bower-parse-messages',
      dep: 'tm.parse-messages'
    },
    name:'themeans-parse-messages.js',
    checked: false,
  }
];

function indexAppendScript(html, path, reset){
  var scriptTag = '<script src="scripts/'+path+'"></script>\n        ';
  var output = '$1$2'+scriptTag+'$3';

  if(reset)
  {
    output = '$1'+scriptTag+'$3'
  }

  return html.replace(/(<!-- build:.+ scripts\/scripts.js -->)([\s\S]+)(<!-- endbuild -->)/ig,output);
}

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
    this.appJsPath   = 'app/scripts/app.js';
    this.appJsContent = this.readFileAsString(this.appJsPath);
    
    this.indexPath = 'app/index.html';
    this.indexHtml = this.readFileAsString(this.templatePath('index.html'));
    this.templateFiles = [];

    this.bowerModules = [
      {
        key: 'angular-material',
        val: '*',
        dep: 'ngMaterial'
      },
      {
        key: 'angular-ui-router',
        val: '*',
        dep: 'ui.router'
      },
    ];
  },

  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to The Means ' + chalk.red('AngularMd') + ' generator!'
    ));
    function isParse(response) {
      for(var i=0; i<response.bowerModules.length; i++)
      {
        if(response.bowerModules[i].key === 'themeans-parse')
        {
          return true;
        }
      }
      
      return false;
    }

    var prompts = [
      {
        type: 'confirm',
        name: 'yoAngular',
        message: 'Have you run yo angular already?'
      },
      {
        type: 'checkbox',
        name: 'bowerModules',
        message: 'Which modules would you like to include?',
        choices: bowerModules
      },
      {
        when: isParse,
        type: 'checkbox',
        name: 'bowerModulesParse',
        message: 'Which parse modules would you like to include?',
        choices: bowerModulesParse
      },
      {
        when: isParse,
        type: 'input',
        name: 'parseApplicationId',
        message: 'What is your parse Application Id?'
      },
      {
        when: isParse,
        type: 'input',
        name: 'parseJavaScriptKey',
        message: 'What is your parse Javascript Key?'
      },
      {
        when: isParse,
        type: 'input',
        name: 'parseClientKey',
        message: 'What is your parse Client Key?'
      },
      {
        when: isParse,
        type: 'confirm',
        name: 'push',
        message: 'Include push notifications?'
      },
    ];

    this.prompt(prompts, function (props) {
      var parse = [];
      this.parse = false;
      if(props.bowerModulesParse)
      {
        parse = props.bowerModulesParse;
        this.parse = true;
      }

      this.bowerModules = this.bowerModules.concat(props.bowerModules.concat(parse));

      this.parseApplicationId = props.parseApplicationId;
      this.parseJavaScriptKey = props.parseJavaScriptKey;
      this.parseClientKey = props.parseClientKey;
      this.push = props.push;

      this.accounts = false;
      this.messages = false;
      for(var i=0; i<this.bowerModules.length; i++)
      {
        if(this.bowerModules[i].key === 'themeans-parse-accounts-service')
        {
          this.accounts = true;
        }
        if(this.bowerModules[i].key === 'themeans-parse-messages')
        {
          this.messages = true;
        }
      }

      done();
    }.bind(this));
  },

  writing: {
    bower: function () {

      var path = 'bower.json',
          file = this.readFileAsString(path),
          bwr  = JSON.parse(file);

      for(var i=0;i<this.bowerModules.length;i++)
      {
        var module = this.bowerModules[i];
        bwr.dependencies[module.key] = module.val;
      }

      /* make modifications to the file string here */

      this.write(path, JSON.stringify(bwr));
    },

    app: function(){
      var appJsPath   = 'app/scripts/app.js',
        appJs         = this.readFileAsString(appJsPath),
        configTmpl    = this.templatePath('partials/parse-config.js.tmpl'),
        parseConfig   = this.readFileAsString(configTmpl),
        statesTmpl    = this.templatePath('partials/states-config.js.tmpl'),
        statesConfig  = this.readFileAsString(statesTmpl),
        routesTmpl    = this.templatePath('partials/secure-routes.js.tmpl'),
        secureRoutes  = this.readFileAsString(routesTmpl);

      // Render Parse Variables
      parseConfig = this.engine(parseConfig, this);
      var regex = /([\s\S]+?module\([\s\S]+?)\[([\s\S]+?)\](\))/ig;
      var grep = regex.exec(appJs);

      this.appJsContent = grep[1];

      this.appName = /[\s\S]+?module\(['](.+)[']/ig.exec(this.appJsContent)[1];

      var modules = grep[2].replace(/['\s]/g,'').split(',');

      for(var i=0; i<this.bowerModules.length; i++)
      {
        modules.push(this.bowerModules[i].dep);
      }

      this.appJsContent += JSON.stringify(modules).replace(/"/g,'\'');
      this.appJsContent += grep[3];

      if(this.parse)
      {
        this.appJsContent += parseConfig;
      }
      this.appJsContent += statesConfig;
      if(this.accounts)
      {
        this.appJsContent += secureRoutes;
      }

      this.indexHtml = this.engine(this.indexHtml, this);
      this.indexHtml = indexAppendScript(this.indexHtml, 'app.js', true);
    },

    base: function () {

      this.templateFiles = this.templateFiles.concat([
        'controllers/menu.js',
        'controllers/dashboard.js',
        'services/menu.js',
        'services/states.js',
        'views/menu.html',
        'views/dashboard.html',
      ]);

    },

    accounts: function () {
      if(!this.accounts)
      {
        return;
      }

      this.templateFiles = this.templateFiles.concat([
        'controllers/login.js',
        'controllers/user-profile.js',
        'controllers/user-settings.js',
        'views/login.html',
        'views/user-profile.html',
        'views/user-settings.html',
      ]);

    },

    push: function () {
      if(!this.push)
      {
        return;
      }

      this.templateFiles = this.templateFiles.concat([
        'controllers/push.js',
        'views/push.html',
      ]);
    },

    messages: function () {
      if(!this.messages)
      {
        return;
      }

      this.templateFiles = this.templateFiles.concat([
        'controllers/message.js',
        'controllers/messages.js',
        'views/message.html',
        'views/messages.html',
      ]);
    },

    appjs: function(){
      this.appJsContent += ';';
      this.write(this.appJsPath, this.appJsContent);
    },

    index: function(){
      var files = this.templateFiles,
        destinationSuffix = '';

      for(var i=0; i<files.length; i++)
      {
        destinationSuffix = 'app/';

        if(files[i].indexOf('views') < 0)
        {
          destinationSuffix += 'scripts/';
          this.indexHtml = indexAppendScript(this.indexHtml, files[i]);
        }

        this.fs.copyTpl(
          this.templatePath(files[i]),
          this.destinationPath(destinationSuffix+files[i]),
          this
        );
      }

      this.write(this.indexPath, this.indexHtml);
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
