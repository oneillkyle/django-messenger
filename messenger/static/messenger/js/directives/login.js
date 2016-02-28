'use strict';
(function() {
    angular.module('messenger')
        .directive('login', directiveFunction)
        .controller('LoginController', ControllerFunction);

    function directiveFunction() {
        return {
            restrict: 'E',
            scope: {},
            controller: 'LoginController',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/partials/login',
        }
    }

    ControllerFunction.$inject = ['$http', 'authService', '$state'];

    function ControllerFunction($http, authService, $state) {
        var vm = this;

        authService.isAuthenticated().then(function(authenticated) {
            if (authenticated) {
                $state.go('home');
            }
        });

        _.extend(vm, {
            login: function login() {
                authService.login(vm.formData).then(function(response) {
                    console.log(response);
                    if (response.authenticated) {
                        $state.go('home');
                    }
                    vm.message = response.message;
                });
            }
        });
    }
})();
