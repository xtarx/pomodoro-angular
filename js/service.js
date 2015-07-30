(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .factory('localStorageOLD', ['$q', storageFactory]);

    function storageFactory($q) {
        'use strict';
        var STORAGE_ID = 'pomodoro-angular';
        var STATETRACKER_ID = 'pomodoro-angular-state-tracker';
        var PAUSE_ID = 'pomodoro-angular-pause';
        var store = {
            tasks: [],

            _getFromLocalStorage: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            _saveToLocalStorage: function (tasks) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
            },

            set: function (tasks) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
            },
            setCurrentState: function (state) {
                localStorage.setItem(STATETRACKER_ID, JSON.stringify(state));
            },
            getCurrentState: function () {
                return JSON.parse(localStorage.getItem(STATETRACKER_ID) || false);
            },
            removeCurrentState: function () {
                localStorage.removeItem(STATETRACKER_ID)
            },
            setPause: function (state) {
                localStorage.setItem(PAUSE_ID, JSON.stringify(state));
            },
            getPause: function () {
                return JSON.parse(localStorage.getItem(PAUSE_ID) || false);
            },
            removePause: function () {
                localStorage.removeItem(PAUSE_ID)
            },
            add: function (task) {
                var deferred = $q.defer();
                
                var tasks = store.tasks;

                // assign id
                var lastTask = tasks[tasks.length - 1] || {
                    id: 0
                };
                task.id = lastTask.id + 1;

            
                store.tasks.push(task);
                store._saveToLocalStorage(store.tasks);
                deferred.resolve(store.tasks);
                return deferred.promise;
            },
            remove: function (task) {
                var deferred = $q.defer();
                store.tasks.push(task);
                store._saveToLocalStorage(store.tasks);
                deferred.resolve(store.tasks);
                return deferred.promise;
            },
            removeAll: function () {
                localStorage.removeItem(PAUSE_ID);
                localStorage.removeItem(STATETRACKER_ID);
                localStorage.removeItem(STORAGE_ID);
            },
        };

        store.tasks = store._getFromLocalStorage();

        return store;
    }

})();
