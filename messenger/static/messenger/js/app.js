'use strict';
(function() {
    var app = angular.module('messenger', ['ui.router', 'ui.bootstrap']);

    app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "partials/home",
                authenticate: true
            })
            .state('login', {
                url: "/login",
                template: "<login></login>"
            })
            .state('register', {
                url: "/register",
                template: "<registration></registration>"
            });
    });

    app.run(function($rootScope, $state, authService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate) {
                authService.isAuthenticated().then(function(authenticated) {
                    if (!authenticated) {
                        $state.go("login");
                        event.preventDefault();
                    }
                })
            }
        });
    });
})();
