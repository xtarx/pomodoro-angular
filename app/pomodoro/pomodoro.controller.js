(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .controller('pomodoroCtrl', pomodoroCtrl);

    pomodoroCtrl.$inject = ['$rootScope', '$scope', '$interval', 'localStorage', 'PomodoroService', 'AuthenticationService'];

    function pomodoroCtrl($rootScope, $scope, $interval, store, PomodoroService, AuthenticationService) {

        var timer = null;
        var pomodorTime = 25;
        var shortBreakTime = 5;
        var longBreakTime = 15;
        $scope.isActive = false;
        $scope.isBreak = false;
        $scope.initialRun = true;
        $scope.current = null;
        $scope.pomodoroCounter = 0;
        $rootScope.humanTime = "25:00";
        init();
        var isLoggedIn = AuthenticationService.isLoggedIn();
        $rootScope.isLoggedIn = isLoggedIn;
        console.log("isLoggedIn " + isLoggedIn);


        //if logged in then
        //store) tasks, pomodoros include date
        if (isLoggedIn) {
            logged_getTodaysCount();
        }

        /**
         * resumes pomdoro/break progress even if tab is closed
         * make sure to clear localstorage in case pause/stop
         * restores also Pause state 
         * 
         */
        function init() {
            console.warn("INIT HAVE BEEN CALLED")

            //pause case
            var pauseState = store.getPause();
            if (pauseState) {
                //restore to pause state
                console.warn("INIT HAVE BEEN in PAUSE STATE")
                $scope.initialRun = false;
                $scope.current = {
                    left: pauseState.timeLeft
                };
                humanizeTimeleft();
            } else {

                var currentTime = Math.floor(Date.now() / 1000);
                var res = store.getCurrentState();
                if (!res) {
                    console.log(" its not there aslan");
                    return false;
                }


                if (currentTime < (res.startTime + res.duration)) {
                    var timeLeft = res.duration - (currentTime - res.startTime);
                    _resumeTimer(timeLeft, res.isPomodoro);
                } else {
                    console.log(" no it alread passed");
                }
            }
        }


        $scope.$on('$destroy', function () {
            if (angular.isDefined(timer)) {
                console.log("stoping pomodoro from on $destroy");
                $interval.cancel(timer);
            }
        });

        function _resumeTimer(timeLeft, isPomodoro) {
            $scope.current = {
                left: timeLeft
            };
            $scope.isActive = true;
            $scope.initialRun = false;
            console.log(" $scope.isActive " + $scope.isActive);
            _executeTimer(isPomodoro)

        }


        $scope.getNumber = function (num) {
            return new Array(num);
        }

        $scope.start = function () {
            $scope.isActive = true;
            $scope.initialRun = false;
            $rootScope.humanTime = _pad(pomodorTime, 2) + ':' + _pad(0, 2);
            _runPomodoro();
        };

        $scope.pause = function () {
            $scope.isActive = false;

            //set pause cookie instead of listeer
            store.setPause({
                timeLeft: $scope.current.left,
                isPomodoro: !$scope.isBreak,
            });
            store.removeCurrentState();

            if (angular.isDefined(timer)) {
                console.log("stoping pomodoro for Pause");
                $interval.cancel(timer);
            }
        };
        /**resumes counter
        in case of presistence remove Pause state and add current state to 
         */
        $scope.resume = function () {
            var pause = store.getPause();
            var timeLeft = pause.timeLeft;
            var isPomodoroPause = pause.isPomodoro;
            _executeTimer(isPomodoroPause)
                //save to localstorage for consistent exp
            store.removePause();
            store.setCurrentState({
                isPomodoro: !$scope.isBreak,
                duration: timeLeft,
                startTime: Math.floor(Date.now() / 1000)
            });
            $scope.isActive = true;
        };

        $scope.stop = function () {
            $scope.initialRun = true;
            $scope.current = null;
            $scope.isActive = false;
            $scope.isBreak = false;
            //remove presistency onResume
            store.removeCurrentState();
            store.removePause();

            $rootScope.humanTime = _pad(pomodorTime, 2) + ':' + _pad(0, 2);
            if (angular.isDefined(timer)) {
                console.log("stoping pomodoro");
                $interval.cancel(timer);


            }
        };


        /**
         * increment the # of pomodors perfomred by the logged in user
         */
        function logged_addPomodoro() {
            PomodoroService.Create()
                .then(function () {
                    console.log('API - pomodor count updated successful');
                });
        }

        /**
         * get the # of pomodors perfomred by the logged in user
         */
        function logged_getTodaysCount() {
            PomodoroService.GetTodaysCount()
                .then(function (data) {
                    $scope.pomodoroCounter = parseInt(data);
                    console.log('API - pomodor count is ' + data);

                });
        }


        function finish(pomodoro) {
            var audio = new Audio('assets/audio/Ship_Bell-Mike_Koenig-1911209136.mp3');
            audio.play();

            $scope.current = null;
            if (pomodoro) {
                console.log("pomodoro just finished starting break");
                $scope.pomodoroCounter++;
                //if logged in, save to API
                if (isLoggedIn) {
                    logged_addPomodoro();
                }
                var islongBreak = false;
                if ($scope.pomodoroCounter % 5 == 0) {
                    islongBreak = true;
                }
                _runBreak(islongBreak);

            } else {
                console.log("break  just finished starting pomodoro");
                _runPomodoro();
            }

        };




        function _executeTimer(isPomodoro) {

            if(!isPomodoro){
                $scope.isBreak = true;
            }
            // Execute timer
            _runTimer(isPomodoro);
            // Set a 1s interval for the timer
            timer = $interval(function () {
                _runTimer(isPomodoro);
            }, 1000);
        }

        function _runBreak(longBreak) {

            var breakDuration = shortBreakTime * 60;
            if (longBreak) {
                breakDuration = longBreakTime * 60;
            }

            $scope.current = {
                left: breakDuration
            };

            //save to localstorage for consistent exp
            store.setCurrentState({
                isPomodoro: !$scope.isBreak,
                duration: $scope.current.left,
                startTime: Math.floor(Date.now() / 1000)
            });

            $scope.isActive = true;
            $scope.isBreak = true;
            // Execute timer
            _executeTimer(false)

        };

        function _runPomodoro() {


            $scope.isBreak = false;
            $scope.current = {
                left: pomodorTime * 60
            };

            //save to localstorage for consistent exp
            store.setCurrentState({
                isPomodoro: !$scope.isBreak,
                duration: $scope.current.left,
                startTime: Math.floor(Date.now() / 1000)
            });

            // Clean task description
            // Execute timer

            _executeTimer(true)


        };

        function _runTimer(pomodoro) {
            if ($scope.isActive && $scope.current) {
                $scope.current.left -= 1;
                humanizeTimeleft();
                if ($scope.current.left <= 0) {
                    $interval.cancel(timer);
                    finish(pomodoro);
                }
            }
        };

        function humanizeTimeleft() {
            var text = "";
            if ($scope.current && $scope.current.left) {
                var minutes = Math.floor($scope.current.left / 60);
                var seconds = $scope.current.left - minutes * 60;
                text = _pad(minutes, 2) + ':' + _pad(seconds, 2);
                $rootScope.humanTime = _pad(minutes, 2) + ':' + _pad(seconds, 2);
            }
            return text;
        };


        function _pad(num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        };
    }

})();
