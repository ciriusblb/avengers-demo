(function() {
    'use strict';

    angular
        .module('app.data')
        .factory('dataservice', dataservice);

    dataservice.$inject=['$http', '$location', '$q', 'exception','logger'];    
    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getAvengersCast: getAvengersCast,
            getAvengerCount: getAvengerCount,
            getAvengers: getAvengers,
            ready: ready
        };

        return service;

        function getAvengers() {
            return $http.get('/api/maa')//llmada a nodejs 
                .then(getAvengersComplete)
                .catch(function(message) {//en caso de error
                    exception.catcher('llamada fallida para getAvengers')(message);
                    $location.url('/');
                });

            function getAvengersComplete(data, status, headers, config) {//obtenidos de nodejs
                console.log("data ",data);
                return data.data[0].data.results;
            }
        }

        function getAvengerCount() {
            var count = 0;
            return getAvengersCast()
                .then(getAvengersCastComplete)
                .catch(exception.catcher('llamada fallida para getAvengerCount'));

            function getAvengersCastComplete (data) { //la data del cast 
                count = data.length;
                return $q.when(count);
            }
        }

        function getAvengersCast() {
            var cast = [
                {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
                {name: 'Chris Hemsworth', character: 'Thor'},
                {name: 'Chris Evans', character: 'Steve Rogers / Captain America'},
                {name: 'Mark Ruffalo', character: 'Bruce Banner / The Hulk'},
                {name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow'},
                {name: 'Jeremy Renner', character: 'Clint Barton / Hawkeye'},
                {name: 'Gwyneth Paltrow', character: 'Pepper Potts'},
                {name: 'Samuel L. Jackson', character: 'Nick Fury'},
                {name: 'Paul Bettany', character: 'Jarvis'},
                {name: 'Tom Hiddleston', character: 'Loki'},
                {name: 'Clark Gregg', character: 'Agent Phil Coulson'}
            ];
            // return $q.when(cast); devolver satisfactoriamente
            // return $q.reject(reason); devolver erroneamente con intecon

            return $q.when(cast);
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                //carga de data inicial
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function fallida'));
        }

    }
}());
