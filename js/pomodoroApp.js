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
//TODO[X] music when ends
//TODO [X]sync in cookie to be pressintent
//TODO [X]integrate TO-Do
//TODO Fix in-active tab progress
//TODO save pomodor progress to cookie and make it pressistent even if tab closed
//TODO user authentication
//TODO view all past progress by days (pomodors spent, tasks done)
//TODO change global settings (pomodor duration and break intervals)
//TODO Add watch instead of listenr
//TODO FAQ
//TODO change background when close to finishing
//TODO[X] change tab title text
