'use strict';
(function() {

    angular.module('messenger')
        .directive('messengerUsers', directiveFunction)
        .controller('MessengerUsersController', ControllerFunction);

    function directiveFunction() {
        return {
            restrict: 'E',
            scope: {},
            controller: 'MessengerUsersController',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/partials/users',
        }
    }

    ControllerFunction.$inject = ['$http', 'messageService'];

    function ControllerFunction($http, messageService) {
        var vm = this;

        _.extend(vm, {
            users: [],
            selectUser: function(username) {
                messageService.setUser(username);
                messageService.getMessages();
            },
            selectedUser: function(){
                return messageService.selectedUser();
            }
        });

        $http({
            method: 'GET',
            url: '/user_list'
        }).then(function successCallback(response) {
            vm.users = response.data.users;
            if(vm.users){
                vm.selectUser(vm.users[0].username);
            }
        }, function errorCallback(response) {
            console.log(response);
        });

        console.log(vm);
    }
})();
