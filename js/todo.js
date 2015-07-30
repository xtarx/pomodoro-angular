(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .controller('TodoCtrl', TodoCtrl);
    TodoCtrl.$inject = ['$scope', '$filter', 'localStorage', 'TodoService', 'AuthenticationService'];


    function TodoCtrl($scope, $filter, store, TodoService, AuthenticationService) {
        'use strict';
        var isLoggedIn = AuthenticationService.isLoggedIn();

        if (isLoggedIn) {
            //if logged in then get tasks from DB
            logged_loadAllTasks();
        } else {
            //if non-logged users then get tasks from localstorage
            
            $scope.todos = store.tasks();
        }
        $scope.getTotalTodos = function () {
            return store.tasks.length;
        };


        function logged_loadAllTasks() {
            TodoService.GetTasksByUser()
                .then(function (todos) {
                    $scope.todos = todos;
                    var filtered = $filter('filter')(todos, {
                        done: 0
                    });
                    $scope.todosCount = filtered.length ? filtered.length : 0;


                });
        }


        function logged_removeTask() {
            TodoService.Delete()
                .then(function (todos) {
                    //remove item from scope
                    $scope.todos = todos;
                });
        }

        $scope.addTodo = function () {

            if (isLoggedIn) {
                logged_addTodotoUser({
                    text: $scope.formTodoText,
                    done: 0
                });
            } else {
                store.add({
                        text: $scope.formTodoText,
                        done: 0
                    })
                    .then(function success() {

                    $scope.todos.push({
                        text: $scope.formTodoText,
                        done: 0
                    });
                        $scope.todosCount++;
                        $scope.formTodoText = '';
                        console.log("added to localstorage");
                    });
            }

        };
        /**
         * adds the todo task to user's tasks API
         */
        function logged_addTodotoUser(data) {
            TodoService.Create(data)
                .then(function (response) {
                    if (response.success) {
                        console.log('Task added successful');
                        $scope.todos.push(data);
                        $scope.formTodoText = '';
                        $scope.todosCount++;

                    } else {
                        console.log('Task failed to add');
                    }
                });
        }
        /**
         * adds the todo task to user's tasks API
         */
        function logged_deleteTodofromUser(todo) {
            TodoService.Delete(todo.id)
                .then(function (response) {
                    if (response.success) {
                        console.log('Task deleted successful');
                        $scope.todos.pop(todo);
                        $scope.formTodoText = '';
                        $scope.todosCount--;
                    } else {
                        console.log('Task failed to delete');
                    }
                });
        }

        $scope.archive = function (todo) {

            if (isLoggedIn) {
                logged_deleteTodofromUser(todo);

            } else {

                todo.done = 1;
                var oldTodos = $scope.todos;
                $scope.todos = [];
                angular.forEach(oldTodos, function (todo) {
                    if (!todo.done) {
                        $scope.todos.push(todo);
                    }
                });
                store.set($scope.todos);
            }
        };

        /**
         * Toggles the state of the task in both cases
         * whether user is logged in then change in Database else change in localStorage
         * @param {Object} todo task object
         */
        $scope.markDone = function (todo) {

            if (isLoggedIn) {
                logged_markDone(todo);

            } else {
                todo.done = (todo.done===0)?1:0;
                store.Update(todo);
            }
        };


        function logged_markDone(todo) {
            TodoService.MarkDone(todo.id)
                .then(function (todos) {
                    console.log('Task ' + todo.text + " marked done");
                    logged_loadAllTasks();
                });
        };

        $scope.clearCompleted = function () {
            $scope.archive();
        };



    }

})();
