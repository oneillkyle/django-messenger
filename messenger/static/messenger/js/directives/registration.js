'use strict';

angular.module('messenger')
    .directive('registration', directiveFunction)
    .controller('RegistrationController', ControllerFunction);

function directiveFunction() {
    return {
        restrict: 'E',
        controller: 'RegistrationController',
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: '/partials/registration',
    }
}

ControllerFunction.$inject = ['$http', 'authService'];

function ControllerFunction($http, authService) {
    var vm = this;

    _.extend(vm, {
        auth: authService
    });

    // $http({
    //     method: 'GET',
    //     url: '/user_list'
    // }).then(function successCallback(response) {
    //     vm.users = response.data.users;
    // }, function errorCallback(response) {
    //     console.log(response);
    // });

    console.log(vm);
}
