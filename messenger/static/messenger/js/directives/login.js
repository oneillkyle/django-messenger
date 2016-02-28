'use strict';

angular.module('messenger')
    .directive('login', directiveFunction)
    .controller('LoginController', ControllerFunction);

function directiveFunction() {
    return {
        restrict: 'E',
        controller: 'LoginController',
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: '/partials/login',
    }
}

ControllerFunction.$inject = ['$http', 'authService'];

function ControllerFunction($http, authService) {
    var vm = this;

    _.extend(vm, {
        login: function login(){
            authService.login(vm.formData).then(function(response){
                console.log(response);
                vm.message = response.message;
            });
        }
    });

    console.log(vm);
}
