"use strict";

(function () {
    var app = angular.module('test', ['kendo.directives']);
    app.controller('testCtrl', function($scope, $timeout){
        $scope.generateId = function(){
            return new Date().getUTCMilliseconds();
        };
        $scope.dataSource = [
            { id: $scope.generateId(), parentId: null, Name: 'Investment '}
        ];
        $scope.onSelect = function(e) {
            var command = $(e.item).data('tag');
            var nodeId = $(e.target).data('nodeId');
            var index = _.findIndex($scope.dataSource, {id: nodeId});
            var node = $scope.dataSource[index];
            switch (command.toUpperCase()){
                case "ADD":
                {
                    var newNode = { id: $scope.generateId(), parentId: nodeId, Name: "New Item"};
                    $scope.dataSource.push(newNode);
                }
                    break;

                case "DELETE":
                {
                    function _deleteRecusive(nodeId){
                        for(var i=0; i<$scope.dataSource.length; ++i){
                            var node = $scope.dataSource[i];
                            if(node.id === nodeId) {
                                $scope.dataSource.splice(i, 1);
                                --i;
                            }
                            else if(node.parentId === nodeId){
                                _deleteRecusive(node.id);
                                $scope.dataSource.splice(i, 1);
                                --i;
                            }
                        }
                    }
                    _deleteRecusive(nodeId);
                }
                    break;

                case "COPY":
                {
                    if(node.parentId !== null) {
                        var newNode = {id: node.id+1, parentId: node.parentId, Name: "Copy Item"};
                        $scope.dataSource.push(newNode);
                    }
                }
                    break;
            }
            if(!$scope.dataSource.length)
                $scope.dataSource = [{}];
            $scope.renderChart();
        };
        $scope.renderChart = function(){
            var chart = new getOrgChart($scope.$chart, {
                siblingSeparation: 150,
                orientation: getOrgChart.RO_TOP_PARENT_LEFT,
                enableEdit: false,
                dataSource: angular.copy($scope.dataSource)
            });
        };

        $timeout(function() {
            $scope.$chart = document.getElementById('chart');
            $scope.renderChart();
            $scope.isChartRendered = true;
        });
    });
})();