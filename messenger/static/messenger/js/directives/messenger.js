'use strict';

angular.module('messenger')
    .directive('messengerClient', directiveFunction)
    .controller('MessengerController', ControllerFunction);

function directiveFunction(){
    return {
        restrict: 'E',
        controller: 'MessengerController',
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: '/client',
    }
}

function ControllerFunction(){
    var vm = this;

    vm.formData = {
        message: ''
    };
    console.log(vm);
}
