app.config(function ($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            abstract: true,
            templateUrl: "views/header.html"
        })
        .state('main', {
            parent: 'root',
            url: '/',
            templateUrl: "views/main.html"
        })
});
