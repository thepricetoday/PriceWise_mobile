// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
 
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl',
          resolve: {
      ListCart: function(MakeListService) {
        return MakeListService.getList();
      }
        }
        }
      }
      
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
   .state('login', {
      url: '/login',
      templateUrl: 'templates/logins.html',
      controller: 'LoginCtrl'
  })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegCtrl'
  })


.state('tab.PriceFrezeInfo', {
      url: "/PriceFrezeInfo",
      views: {
        'tab-account': {
          templateUrl: "templates/PriceFrezeInfo.html",
          controller: 'PriceFrezeInfoCtrl'
        }
      }
    })
.state('tab.Org', {
      url: "/Org",
      views: {
        'tab-account': {
          templateUrl: "templates/Org.html",
          controller: 'OrgCtrl'
        }
      }
    })
.state('tab.list', {
      url: "/list",
      views: {
        'tab-account': {
          templateUrl: "templates/list.html",
          controller: 'ListCtrl'
        }
      }
    })
.state('tab.listdetail', {
      url: "/listdetail/:listId",
      views: {
        'tab-account': {
          templateUrl: "templates/listdetail.html",
          controller: 'ListdetailCtrl'
        }
      }
    })
;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
