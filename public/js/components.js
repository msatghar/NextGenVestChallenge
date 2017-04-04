
var app = angular.module("myWidget", ["ngRoute", "ngResource", "chart.js"]);

app.controller('widgetCtrl', function ($scope, $http) {

    $scope.loanList = [];
    $scope.loanTypes = [{ id: 1, name: "Direct Subsidized Loan" }, { id: 2, name: "Direct Unsubsidized Loan" }, { id: 3, name: "Private Bank Loan" }, { id: 4, name: "University Loan" }];

    let subROI, unsubROI, privateROI = 4.2, uniROI = 4.0;

    $scope.updateForm = function (item) {
        $scope.loanList.push(item.name);
        var roiDiv = angular.element(document.querySelector('#roiTxt'));
        if (item.id == 1) {
            $http.get("/roi/1").success(function (data) {
                $scope.roi = "The current rate of interest for this type of loan is: " + data.roi + "%";
                subROI = data.roi;
                roiDiv.removeClass("hidden");
            });
        }
        else if (item.id == 2) {
            $http.get("/roi/2").success(function (data) {
                $scope.roi = "The current rate of interest for this type of loan is: " + data.roi + "%";
                unsubROI = data.roi;
                roiDiv.removeClass("hidden");
            });
        }
        else if (item.id == 3) {
            $scope.roi = "The current rate of interest for this type of loan is: " + privateROI + "%";
            roiDiv.removeClass("hidden");
        }
        else if (item.id == 4) {
            $scope.roi = "The current rate of interest for this type of loan is: " + uniROI + "%";
            roiDiv.removeClass("hidden");
        }
    };

    $scope.makeChart = function () {

        if ($scope.amount && $scope.interest && $scope.period && $scope.loanType) {
            $scope.labels = [];
            let year = 2016;
            for (let i = 0; i < $scope.period; i = i + 12) {
                year++;
                $scope.labels.push(year + "");
            }

            let p = $scope.amount;
            let r = $scope.interest / 12;
            let n = $scope.period;
            let emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            let total = emi * n;
            let totalInterest = total - p;
            let arr = [];
    
            $scope.emi = "Monthly installments required: " + emi.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            $scope.total = "Total amount to be paid: " + total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            $scope.totalInterest = "Total interest to be paid: " + totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            var infoDiv = angular.element(document.querySelector('#infoDiv'));
            infoDiv.removeClass("hidden");

            if ($scope.period < 12) {
                arr.push(emi * $scope.period);
            }
            else {
                let p = $scope.period % 12;
                for (let i = $scope.period - p; i > 0; i = i - 12) {
                    arr.push(emi * 12);
                }
                if (p !== 0)
                    arr.push(emi * p);
            }

            $scope.data = [
                arr
            ];
        }
    };
});

