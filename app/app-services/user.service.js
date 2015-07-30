(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var service = {};
    
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

   

        function GetByEmail(email) {
            return $http.post('api/users/' + email).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('api/users/add', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(data) {
//            console.log("handle success");
//            console.log(data.r);

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
