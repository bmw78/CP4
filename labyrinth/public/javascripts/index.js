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
            $scope.highscore = OrderScore(data);
        })

    $scope.AddScore = function() {
        console.log("Adding new Score");
        var formData = { name: $scope.name, time: "30" }//$scope.time };
        //console.log(formData);
        
        
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
    
    $scope.GameOrScores = function (priority) {
        if (priority == 'game')
        {
            $scope.chooseGame = false;
        }
        else if (priority == 'score')
        {
            $scope.isGame = false;
        }
    }
    
    function OrderScore(data) {
        var json = data;
        json.sort(function(a, b) {
            //console.log("A:" + a.time + " B:" + b.time);
            var aArray = a.time.split(":");
            var aMinutes = aArray[0];
            var aSeconds = aArray[1];
            
            var bArray = b.time.split(":");
            var bMinutes = bArray[0];
            var bSeconds = bArray[1];
            
            if (aMinutes < bMinutes)
            {
                return -1;
            }
            else if (aMinutes > bMinutes)
            {
                return 1;
            }
            else
            {
                if (aSeconds < bSeconds)
                {
                    return -1;
                }
                else if (aSeconds > bSeconds)
                {
                    return 1;
                }
            }
            return 0;
        });
        
        return json;
    }
}

