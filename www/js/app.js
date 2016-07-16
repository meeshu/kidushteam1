// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'Heart' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Heart', ['ionic', 'backand', 'Heart.controllers', 'Heart.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
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
    .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

        BackandProvider.setAppName('kidushteam1'); // change here to your app name
        BackandProvider.setSignUpToken('71694afb-65fc-48f3-b0f5-263ce3737d1c'); //token that enable sign up. see http://docs.backand.com/en/latest/apidocs/security/index.html#sign-up
        BackandProvider.setAnonymousToken('1518eae0-3438-43ad-aab2-6b34bc358efb'); // token is for anonymous login. see http://docs.backand.com/en/latest/apidocs/security/index.html#anonymous-access

        $stateProvider
            // setup an abstract state for the tabs directive
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl as login'
            })
        .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html',
            })
        .state('tab', {
                url: '/tabs',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.videos', {
                url: '/videos',
                views: {
                    'tab-videos': {
                        templateUrl: 'templates/tab-videos.html',
                        controller: 'VideosCtrl'
                    }
                }
            })
        .state('tab.games', {
                url: '/games',
                views: {
                    'tab-games': {
                        templateUrl: 'templates/tab-games.html'
                        
                    }
                }
            })
         .state('tab.fav', {
                url: '/fav',
                views: {
                    'tab-fav': {
                        templateUrl: ''
                        
                    }
                }
            })
        .state('tab.help', {
                url: '/help',
                views: {
                    'tab-help': {
                        templateUrl: 'templates/tab-help.html'
                        
                    }
                }
            })
        .state('details', {
		url: "/details/:id",
		templateUrl: 'templates/videoplayer.html',
		controller: 'detailsCtrl'
	       });

        $urlRouterProvider.otherwise('/login');

        $httpProvider.interceptors.push('APIInterceptor');
    })

    .run(function ($rootScope, $state, LoginService, Backand) {

        function unauthorized() {
            console.log("user is unauthorized, sending to login");
            $state.go('login');
        }

        function signout() {
            LoginService.signout();
        }

        $rootScope.$on('unauthorized', function () {
            unauthorized();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.name == 'login') {
                signout();
            }
            else if (toState.name != 'login' && Backand.getToken() === undefined) {
                unauthorized();
            }
        });

    })

