var app = window.angular.module('app', ['ngAnimate'])

app.factory('highscoreFetcher', highscoreFetcher)
app.controller('mainCtrl', mainCtrl)


function highscoreFetcher($http) {
    var API_ROOT = 'highscore'
    return {
        get: function() {
            return $http
                .get(API_ROOT)
                .then(function(resp) {
                    return resp.data
                })
        }
    }
}

function mainCtrl($scope, highscoreFetcher, $http) {
    $scope.highscore = []

    highscoreFetcher.get()
        .then(function(data) {
            $scope.highscore = data
        })

    $scope.AddScore = function() {
        console.log("Adding new Score");
        var formData = { name: $scope.name, time: "3:00"}//$scope.time };
        console.log(formData);
        
        
        var highscoreURL = 'highscore';
        $http({
            url: highscoreURL,
            method: "POST",
            data: formData
        }).success(function(data, status, headers, config) {
            console.log("Post worked");
        }).error(function(data, status, headers, config) {
            console.log("Post failed");
        });
        $scope.name = '';
        //$scope.time = '';
    }
}
