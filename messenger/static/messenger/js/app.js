'use strict';

var app = angular.module('messenger', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "",
            templateUrl: "partials/home",
            authenticate: true
        })
        // .state('state1.list', {
        //   url: "/list",
        //   templateUrl: "partials/state1.list.html",
        //   controller: function($scope) {
        //     $scope.items = ["A", "List", "Of", "Items"];
        //   }
        // })
        .state('login', {
            url: "/login",
            template: "<login></login>"
        })
        .state('register', {
            url: "/register",
            template: "<registration></registration>"
        })
        // .state('state2.list', {
        //   url: "/list",
        //   templateUrl: "partials/state2.list.html",
        //   controller: function($scope) {
        //     $scope.things = ["A", "Set", "Of", "Things"];
        //   }
        // });
});

app.run(function($rootScope, $state, authService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && !authService.isAuthenticated()) {
            // User isn’t authenticated
            //   $state.transitionTo("login");
            $state.go("login");
            event.preventDefault();
        }
    });
});
