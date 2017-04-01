
var app = angular.module("myWidget", ["ngRoute", "ngResource", "chart.js"]);

app.controller('widgetCtrl', function ($scope) {

    $scope.makeChart = function () {
        $scope.labels = [];
        let year = 2016;
        for (let i = 0; i < $scope.period; i = i + 12) {
            year++;
            $scope.labels.push(year + "");
        }

        let p = $scope.amount;
        let r = $scope.interest / 12;
        let n = $scope.period;
        
        $scope.emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        let arr = [];

        if ($scope.period < 12) {
            arr.push($scope.emi * $scope.period);
        }
        else {
            let p = $scope.period % 12;
            for (let i = $scope.period - p; i > 0; i = i - 12) {
                arr.push($scope.emi * 12);
            }
            if (p !== 0)
                arr.push($scope.emi * p);
        }

        $scope.data = [
            arr
        ];
    };


});

