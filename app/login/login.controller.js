(function () {
    'use strict';

    angular
        .module('pomodoroApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$location', 'AuthenticationService', 'FlashService'];

    function LoginController($rootScope, $location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            //            console.log("is logged + "+$rootScope.isLoggedIn)
            if ($rootScope.isLoggedIn) {
                $location.path('/');
            } else {
                AuthenticationService.ClearCredentials();
            }
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.email, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.email, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
