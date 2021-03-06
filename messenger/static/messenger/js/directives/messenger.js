'use strict';
(function() {
    angular.module('messenger')
        .directive('messengerClient', directiveFunction)
        .controller('MessengerController', ControllerFunction);

    function directiveFunction() {
        return {
            restrict: 'E',
            scope: {},
            controller: 'MessengerController',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/partials/messenger',
        }
    }

    ControllerFunction.$inject = ['messageService'];

    function ControllerFunction(messageService) {
        var vm = this;

        _.extend(vm, {
            formData: {
                message: ''
            },
            messages: messageService.currentMessages,
            sendMessage: function() {
                if (!vm.formData.message) {
                    return;
                }
                messageService.sendMessage(vm.formData.message).then(function(response) {
                    vm.formData.message = '';
                });
            }
        });
    }
})();
