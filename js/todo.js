(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .controller('TodoCtrl', ['$scope', '$filter', 'localStorage', TodoCtrl]);


    function TodoCtrl($scope, $filter, store) {
        'use strict';

        $scope.todos = store.tasks;

        $scope.getTotalTodos = function () {

            return store.tasks.length;
        };


        $scope.addTodo = function () {

            store.add({
                    text: $scope.formTodoText,
                    done: false
                })
                .then(function success() {
                    $scope.todosCount++;
                    console.log("added to localstorage");

                });

            //            localStorage.setItem('todos', JSON.stringify($scope.todos));

            $scope.formTodoText = '';


        };
        $scope.archive = function (todo) {
            todo.done=true;
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) {
                    $scope.todos.push(todo);
                }
            });
            store.set($scope.todos);
          
        };
        $scope.clearCompleted = function () {
            $scope.archive();
        };
     


    }

})();
