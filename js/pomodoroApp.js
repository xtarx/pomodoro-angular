(function () {
    'use strict';

    angular
        .module('pomodoroApp', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);
    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'pomodoroCtrl',
                templateUrl: 'views/pomodoro_plust_todo.html'
                    //                controller: 'HomeController',
                    //                templateUrl: 'home/home.view.html',
                    //                controllerAs: 'vm'
            })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'login/login.view.html',
            controllerAs: 'vm'
        })
      .when('/logout', {
            controller: 'LogoutController',
            template: 'login/login.view.html',
            controllerAs: 'vm'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'register/register.view.html',
            controllerAs: 'vm'
        })
   .when('/faq', {
            controller: 'FAQController',
            templateUrl: 'faq/faq.view.html',
            controllerAs: 'vm'
        })

        .otherwise({
            redirectTo: '/'
        });
        //        $locationProvider.html5Mode(true);
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh

//        console.log('in run fun');
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page

//            console.log('in run funaa');
//            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var restrictedPage=false;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();

//TODO[x] countdown
//TODO[X] global count of finished pomodors
//TODO[X] short break
//TODO[X] long break
//TODO[X] music when ends
//TODO [X]sync in cookie to be pressintent
//TODO [X]integrate TO-Do
//TODO[X] change tab title tex
//TODO Fix in-active tab progress
//TODO[X] save pomodor progress to cookie and make it pressistent even if tab closed
//TODO[X] user authentication
//TODO view all past progress by days (pomodors spent, tasks done)
//TODO change global settings (pomodor duration and break intervals)
//TODO Add watch instead of listenr
//TODO FAQ
//TODO change background when close to finishing
//TODO unit test
//TODO Generate stats based on progress
