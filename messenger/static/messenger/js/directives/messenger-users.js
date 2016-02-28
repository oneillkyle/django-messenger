'use strict';

angular.module('messenger')
    .directive('messengerUsers', directiveFunction)
    .controller('MessengerUsersController', ControllerFunction);

function directiveFunction() {
    return {
        restrict: 'E',
        controller: 'MessengerUsersController',
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: '/partials/users',
    }
}

ControllerFunction.$inject = ['$http'];

function ControllerFunction($http) {
    var vm = this;

    _.extend(vm, {
        users: []
    });

    $http({
        method: 'GET',
        url: '/user_list'
    }).then(function successCallback(response) {
        vm.users = response.data.users;
    }, function errorCallback(response) {
        console.log(response);
    });

    console.log(vm);
}
