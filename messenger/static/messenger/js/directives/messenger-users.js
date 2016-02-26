'use strict';

angular.module('messenger')
    .directive('messengerUsers', directiveFunction)
    .controller('MessengerUsersController', ControllerFunction);

function directiveFunction(){
    return {
        restrict: 'E',
        controller: 'MessengerUsersController',
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: '/users',
    }
}

function ControllerFunction(){
    var vm = this;

    _.extend(vm,{
        users: [
            {name: 'Test'}
        ]
    });
    console.log(vm);
}
