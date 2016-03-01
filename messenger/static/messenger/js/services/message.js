'use strict';
(function() {
    angular.module('messenger')
        .service('messageService', serviceFunction);

    serviceFunction.$inject = ['$http', '$timeout'];

    function serviceFunction($http, $timeout) {
        var selectedUser, messages, ws;

        this.setUser = function(user) {
            selectedUser = user;
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
                return response;
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        this.getMessages = function() {
            if(ws){
                ws.close();
            }

            return $http({
                method: 'GET',
                url: '/message?username=' + selectedUser
            }).then(function successCallback(response) {
                messages = response.data.messages;

                ws = new WebSocket('ws://127.0.0.1:8000/ws/messages?subscribe-user');

                ws.onmessage = function(e) {
                    var data = JSON.parse(e.data);
                    data.sent = selectedUser !== data.sender;
                    $timeout(function(){
                        messages.push(data);
                        while(messages.length > 10){
                            messages.shift();
                        }
                    });
                };
                ws.onerror = function(e) {
                    console.error(e);
                };

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
