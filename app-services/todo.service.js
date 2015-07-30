(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$http'];

    function TodoService($http) {
        var service = {};

        service.GetTasksByUser = GetTasksByUser;    
        service.Create = Create;
        service.MarkDone = MarkDone;
        service.Update = Update;
        service.Delete = Delete;

        return service;

     
        function GetTasksByUser(id) {
            return $http.get('api/todos/').then(handleSuccess, handleError('Error getting user by id'));
        }
        function Create(user) {
            return $http.post('api/todos/add', user).then(handleSuccess, handleError('Error creating user'));
        }

     
        function MarkDone(taskid) {
            return $http.get('api/todos/done/'+ taskid).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('api/todos/edit/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('api/todos/remove/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(data) {
            console.log("handle success");

            return data.data;
        }

        function handleError(error) {
            return function () {
                return {
                    success: false,
                    message: error
                };
            };
        }
    }

})();
