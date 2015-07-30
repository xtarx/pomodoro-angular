(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .factory('localStorage', TaskService);

    TaskService.$inject = ['$timeout', '$filter', '$q'];

    function TaskService($timeout, $filter, $q) {

        var service = {};
        var STORAGE_ID = 'todos';
        var STATETRACKER_ID = 'pomodoro-angular-state-tracker';
        var PAUSE_ID = 'pomodoro-angular-pause';
        service.tasks = tasks;
        service.GetById = GetById;
        //START OF RESUME FUNCTIONS
        service.setCurrentState = setCurrentState;
        service.getCurrentState = getCurrentState;
        service.removeCurrentState = removeCurrentState;
        service.setPause = setPause;
        service.getPause = getPause;
        service.removePause = removePause;
        service.removeAll = removeAll;
        //END OF RESUME FUNCTIONS
        service.add = add;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function tasks() {
            return getTasks();
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getTasks(), {
                id: id
            });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }


        function add(task) {
            var deferred = $q.defer();

            var tasks = getTasks();

            // assign id
            var lastTask = tasks[tasks.length - 1] || {
                id: 0
            };
            task.id = lastTask.id + 1;

            // save to local storage
            tasks.push(task);
            setTasks(tasks);

            deferred.resolve({
                success: true
            });

            return deferred.promise;
        }

        function Update(task) {
            var deferred = $q.defer();
            delete task.$$hashKey;
            var tasks = getTasks();
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id === task.id) {
                    tasks[i] = task;
                    break;
                }
            }
            setTasks(tasks);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            console.log("DELETE CALLED WITH Id " + id)
            var tasks = getTasks();
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                if (task.id === id) {
                    tasks.splice(i, 1);
                    break;
                }
            }
            setTasks(tasks);
            deferred.resolve();

            return deferred.promise;
        }

        //START OF RESUME FUNCTIONS
        function setCurrentState(state) {
            localStorage.setItem(STATETRACKER_ID, JSON.stringify(state));
        }

        function getCurrentState() {
            return JSON.parse(localStorage.getItem(STATETRACKER_ID) || false);
        }

        function removeCurrentState() {
            localStorage.removeItem(STATETRACKER_ID)
        }

        function setPause(state) {
            localStorage.setItem(PAUSE_ID, JSON.stringify(state));
        }

        function getPause() {
            return JSON.parse(localStorage.getItem(PAUSE_ID) || false);
        }

        function removePause() {
            localStorage.removeItem(PAUSE_ID)
        }
        //END OF RESUME FUNCTIONS

        //logout fun
        function removeAll() {
            localStorage.removeItem(PAUSE_ID);
            localStorage.removeItem(STATETRACKER_ID);
            localStorage.removeItem(STORAGE_ID);
        }
        //logout fun

        // private functions

        function getTasks() {
            if (!localStorage.todos) {
                localStorage.todos = JSON.stringify([]);
            }
            //            console.log("get task just called")
            return JSON.parse(localStorage.todos);
        }

        function setTasks(todos) {
            localStorage.todos = JSON.stringify(todos);
        }
    }
})();
