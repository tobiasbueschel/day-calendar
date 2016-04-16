var app = angular.module('calendarTM', [
    'ui.router',
    'ui.bootstrap'
]);

app.run(function($rootScope, $state) {
    $rootScope.$state = $state;
});