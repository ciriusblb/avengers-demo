(function() {
    'use strict';

    angular
        .module('app.avengers')
        .controller('Avengers', Avengers);

    Avengers.$inject=['dataservice','logger'];
    function Avengers(dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.avengers = [];
        vm.title = 'Avengers';

        activate();

        function activate() {
            return getAvengers().then(function() {
                logger.info('Activated Avengers View consola');
            });
        }

        function getAvengers() {
            return dataservice.getAvengers().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }
    }
}());
