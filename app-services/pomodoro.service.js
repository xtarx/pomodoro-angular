(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .factory('PomodoroService', PomodoroService);

    PomodoroService.$inject = ['$http'];

    function PomodoroService($http) {
        var service = {};

        service.GetCountByDay = GetCountByDay;
        service.GetTodaysCount = GetTodaysCount;
        service.Create = Create;

        return service;

        function GetCountByDay(id) {
            return $http.get('api/pomodoros/countByDay' , user).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetTodaysCount() {
            return $http.get('api/pomodoros/').then(handleSuccess, handleError('Error getting user by id'));
        }


        function Create(user) {
            return $http.post('api/pomodoros/add', user).then(handleSuccess, handleError('Error creating user'));
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
