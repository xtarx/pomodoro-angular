(function () {
    'use strict';

    angular
        .module('pomodoroApp', []);

    angular.module('pomodoroApp')
        .constant('SHORT_BREAK', 5 * 60)
        .constant('LONG_BREAK', 15 * 60)
    .constant('POMODORO', 25 * 60);

})();

//TODO[x] countdown
//TODO[X] global count of finished pomodors
//TODO[X] short break
//TODO[X] long break
//TODO music when ends
//TODO change background when close to finishing
//TODO change tab text
//TODO sync in cookie to be pressintent
//TODO integrate TO-Do
//TODO change global settings (pomodor duration and break intervals)
//TODO Add watch instead of listenr
