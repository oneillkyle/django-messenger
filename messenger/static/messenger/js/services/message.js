'use strict';
(function() {
    angular.module('messenger')
        .service('messageService', serviceFunction);

    serviceFunction.$inject = ['$http'];

    function serviceFunction($http) {
        var selectedUser, messages;

        this.setUser = function(user) {
            selectedUser = user;
            console.log(selectedUser);
        }

        this.selectedUser = function(){
            return selectedUser;
        }

        this.sendMessage = function(message) {
            if (!message) {
                return;
            }

            return $http({
                method: 'POST',
                url: '/message',
                data: {
                    username: selectedUser,
                    message: message
                }
            }).then(function successCallback(response) {
                console.log(response);
                return response;
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        this.getMessages = function() {
            return $http({
                method: 'GET',
                url: '/message?username=' + selectedUser
            }).then(function successCallback(response) {
                console.log(response);
                messages = response.data.messages;
                return messages;
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        this.currentMessages = function() {
            return messages;
        }

        this.deleteMessage = function() {

        }
    }
})();
