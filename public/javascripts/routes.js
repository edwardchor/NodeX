/**
 * Created by EdwardChor on 30/11/2016.
 */
angular.module('NodeX').config(function($urlRouterProvider, $stateProvider){
    $stateProvider
        .state('funku',{
            templateUrl:'views/FunkU.html',
            controller:'FunkUController'
        })
        .state('canvas',{
            templateUrl:'views/canvas.html',
            controller:'CanvasController'
        })
        .state('ui',{
            templateUrl:'views/ui.html',
            controller:'UIController'
        })
        .state('animation',{
            templateUrl:'views/animation.html',
            controller:'FlashController'

        })
        .state('paper',{
            templateUrl:'views/paper.html',
            controller:'PaperController'
        });

    $urlRouterProvider.otherwise('/')
});