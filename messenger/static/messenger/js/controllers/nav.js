'use strict';

angular.module('messenger')
    .controller('NavController', ControllerFunction);

ControllerFunction.$inject = ['$scope', '$http', 'authService', '$state'];

function ControllerFunction($scope, $http, authService, $state) {
    $scope.logout = function() {
        authService.logout().then(function(response) {
            $state.go('login');
        });
    }

    $scope.isAuthenticated = authService.getAuthenticated;
}
