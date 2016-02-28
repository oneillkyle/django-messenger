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
        templateUrl: '/partials/messenger',
    }
}

function ControllerFunction(){
    var vm = this;
    // var myDataRef = new Firebase('https://blinding-torch-7293.firebaseio.com/');

    vm.formData = {
        message: ''
    };
    console.log(vm);
}
