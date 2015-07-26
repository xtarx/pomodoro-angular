(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .controller('pomodoroCtrl', ['$scope', '$interval', 'localStorage', pomodoroCtrl]);


    function pomodoroCtrl($scope, $interval, store) {
        'use strict';
        var timer = null;
        var pomodorTime = 25;
        var shortBreakTime = 5;
        var longBreakTime = 15;
        $scope.isActive = false;
        $scope.isBreak = false;
        $scope.initialRun = true;
        $scope.current = null;
        $scope.tasks = store.tasks;
        $scope.pomodoroCounter = 0;
        $scope.humanTime = "25:00";


        $scope.start = function () {
            $scope.isActive = true;
            $scope.initialRun = false;
            $scope.humanTime = _pad(pomodorTime, 2) + ':' + _pad(0, 2);
            _runPomodoro();
        };

        $scope.pause = function () {
            $scope.isActive = false;
        };

        $scope.resume = function () {
            $scope.isActive = true;
        };

        $scope.stop = function () {
            $scope.initialRun = true;
            $scope.current = null;
            $scope.isActive = false;
            $scope.isBreak = false;
            $scope.humanTime = _pad(pomodorTime, 2) + ':' + _pad(0, 2);
            if (angular.isDefined(timer)) {
                console.log("stoping pomodoro");
                $interval.cancel(timer);

            }
        };

        $scope.finish = function (pomodoro) {
            store.add($scope.current)
                .then(function success() {
                    $scope.current = null;

                    if (pomodoro) {
                        console.log("pomodoro just finished starting break");
                        $scope.pomodoroCounter++;
                        var longBreak = false;
                        if ($scope.pomodoroCounter % 5 == 0) {
                            longBreak = true;
                        }

                        _runBreak(longBreak);

                    } else {
                        console.log("break  just finished starting pomodoro");
                        _runPomodoro();
                    }


                });
        };



        var _runBreak = function (longBreak) {

            var breakDuration = shortBreakTime * 60;
            if (longBreak) {
                breakDuration = longBreakTime * 60;
            }

            $scope.current = {
                left: breakDuration
            };
            $scope.isActive = true;
            $scope.isBreak = true;
            // Execute timer
            _runTimer(false);
            // Set a 1s interval for the timer
            timer = $interval(function () {
                _runTimer(false);
            }, 1000);
        };

        var _runPomodoro = function () {
            $scope.current = {
                left: pomodorTime * 60
            };
            // Clean task description
            // Execute timer
            //            _runTimer(true);
            // Set a 1s interval for the timer
            timer = $interval(function () {
                console.log("calling timer")
                _runTimer(true);
            }, 1000);

        };

        var _runTimer = function (pomodoro) {
            if ($scope.isActive && $scope.current) {
                $scope.current.left -= 1;
                $scope.humanizeTimeleft();
                if ($scope.current.left <= 0) {
                    $interval.cancel(timer);
                    $scope.finish(pomodoro);
                }
            }
        };

        $scope.humanizeTimeleft = function () {
            var text = "";
            if ($scope.current && $scope.current.left) {
                var minutes = Math.floor($scope.current.left / 60);
                var seconds = $scope.current.left - minutes * 60;
                text = _pad(minutes, 2) + ':' + _pad(seconds, 2);
                $scope.humanTime = _pad(minutes, 2) + ':' + _pad(seconds, 2);
            }
            return text;
        };
        var _pad = function (num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        };
    }

})();
