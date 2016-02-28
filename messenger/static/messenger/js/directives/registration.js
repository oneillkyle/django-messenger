'use strict';
(function() {
    angular.module('messenger')
        .directive('registration', directiveFunction)
        .controller('RegistrationController', ControllerFunction);

    function directiveFunction() {
        return {
            restrict: 'E',
            scope: {},
            controller: 'RegistrationController',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/partials/registration',
        }
    }

    ControllerFunction.$inject = ['$http', 'authService', '$state'];

    function ControllerFunction($http, authService, $state) {
        var vm = this;
        vm.formData = {};
        vm.errors = [];

        _.extend(vm, {
            register: function() {
                authService.register(vm.formData).then(function(response) {
                    if (response.created) {
                        $state.go('home');
                    } else {
                        vm.errors = response.errors;
                    }
                    console.log(response);
                });
            }
        });
    }
})();
