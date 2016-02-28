'use strict';

angular.module('messenger')
    .service('authService', serviceFunction);

serviceFunction.$inject = ['$http'];

function serviceFunction($http){
    var authenticated = false;
    this.isAuthenticated = function(){
        $http({
            method: 'GET',
            url: '/authenticate'
        }).then(function successCallback(response) {
            authenticated = response.data.authenticated;
        }, function errorCallback(response) {
            console.log(response);
        });
        return authenticated;
    }

    this.login = function(credentials){
        return $http({
            method: 'POST',
            url: '/authenticate',
            data: credentials
        }).then(function successCallback(response) {
            console.log(response);
            authenticated = true;
            return {authenticated: authenticated, message: response.data.message}
        }, function errorCallback(response) {
            authenticated = false;
            return {authenticated: authenticated, message: response.data.message}
        });
    }

    this.logout = function(){
        authenticated = false;
    }

    this.createAccount = function(){

    }
}
