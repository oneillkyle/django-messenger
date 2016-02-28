'use strict';
(function() {
    angular.module('messenger')
        .service('authService', serviceFunction);

    serviceFunction.$inject = ['$http'];

    function serviceFunction($http) {
        var authenticated = false;
        this.isAuthenticated = function() {
            return $http({
                method: 'GET',
                url: '/authenticate'
            }).then(function successCallback(response) {
                authenticated = response.data.authenticated;
                return authenticated;
            }, function errorCallback(response) {
                console.log(response);
                authenticated = false;
                return authenticated;
            });
        }

        this.login = function(credentials) {
            return $http({
                method: 'POST',
                url: '/authenticate',
                data: credentials
            }).then(function successCallback(response) {
                console.log(response);
                authenticated = true;
                return {
                    authenticated: authenticated,
                    message: response.data.message
                }
            }, function errorCallback(response) {
                console.log(response);
                authenticated = false;
                return {
                    authenticated: authenticated,
                    message: response.data.message
                }
            });
        }

        this.register = function(credentials) {
            return $http({
                method: 'POST',
                url: '/register',
                data: credentials
            }).then(function successCallback(response) {
                console.log(response);
                authenticated = true;
                return {
                    created: true,
                    message: response.data.message
                }
            }, function errorCallback(response) {
                authenticated = false;
                return {
                    created: false,
                    errors: response.data.errors
                }
            });
        }

        this.logout = function() {
            return $http({
                method: 'POST',
                url: '/logout'
            }).then(function successCallback(response) {
                console.log(response);
                authenticated = false;
                return {
                    authenticated: authenticated
                }
            }, function errorCallback(response) {
                console.log(response)
            });
        }

        this.createAccount = function() {

        }
    }
})();
