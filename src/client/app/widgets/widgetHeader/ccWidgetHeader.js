(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('ccWidgetHeader', ccWidgetHeader);

    /* @ngInject */
    function ccWidgetHeader () {
        //uso: A como atributo de html
        //<div cc-widget-header title="vm.map.title"></div>
        // Creates:
        // <div data-cc-widget-header=""
        //      title="Avengers Movie"
        //      allow-collapse="true" </div>
        //uso: E como elemento etiqueta de html
        // <cc-widget-header></cc-widget-header>
        var directive = {
//            link: link,
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: 'app/widgets/widgetheader/widgetheader.html',
            restrict: 'A'
        };
        return directive;

//        function link(scope, element, attrs) {
//            attrs.$set('class', 'widget-head');
//        }
    }
}());
