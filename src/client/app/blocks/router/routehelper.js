
(function () {
    'use strict';

    angular.module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$rootScope','$state','logger','routehelperConfig'];

    function routehelperConfig(){
        this.config = {
           $stateProvider : undefined,
           $urlRouterProvider: undefined,
           resolveAlways: undefined,
           docTitle : undefined
        };

        this.$get = function () {
          return{
              config: this.config
          }
        };
    }

    function routehelper($rootScope, $state, logger, routehelperConfig){
       var routes = [];

       var $urlRouterProvider = routehelperConfig.config.$urlRouterProvider;
       var $stateProvider = routehelperConfig.config.$stateProvider;

       var service = {
         configureRoutes: configureRoutes,
         getRoutes: getRoutes
       };

        init();

        return service;

        function configureRoutes(routes){
            routes.forEach(function (route) {

                route.config.resolve =
                    angular.extend(route.config.resolve || {},
                                        routehelperConfig.config.resolveAlways);

                $stateProvider.state(route.name, route.config);
            });
            $urlRouterProvider.otherwise("/");
        }

        function getRoutes(){
        	// $state.get() va a tener informacion de todos los estados configurados
            for (var i = 0; i < $state.get().length; i++) {
                var route = $state.get()[i];
                var isRoute = !!route.title;
                if(isRoute){
                    routes.push(route);
                }
            }

            return routes;
        }

        function init(){
            updateDocTitle();
        }

        function updateDocTitle(){//$rootScope es un obejto al cual se enlace un modelo disponible en el 
        // controlador y usado dentro de la vista
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, fromState) {
                   var title = routehelperConfig.config.docTitle + ' ' + (toState.title || '');
                    $rootScope.title = title; //databind hacia la etiqueta <title> de las vistas
                });
        }
    };
}());