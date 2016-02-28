'use strict';

angular.module('messenger')
    .service('messageService', serviceFunction);

serviceFunction.$inject = ['$http'];

function serviceFunction($http){
    this.sendMessage = function(){
        
    }

    this.getMessages = function(){

    }

    this.deleteMessage = function(){

    }
}
