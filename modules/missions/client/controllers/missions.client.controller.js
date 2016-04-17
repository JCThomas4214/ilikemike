'use strict';

angular.module('missions').controller('MissionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Missions',
  function ($scope, $stateParams, $location, Authentication, Missions) {

    //For create and edit
    $scope.body_str = '';
    $scope.position_str = '';

    //Parse the string for sending
    var parsePara = function (body) {
      var final = [];

      if (body) {
        var tmp = body.split('\n');

        for (var i = 0; i < tmp.length; i++) {
          if (angular.equals(tmp[i], '')) {
            tmp.splice(i, 1);
          }
        }

        for (var o = 0; o < tmp.length; o++) {
          final.push({
            paragraph: tmp[o]
          });
        }
        return final;
      }
      return final;
    };


    // Page changed handler
    $scope.pageChanged = function () {
      $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
    };

    // Create new Mission
    $scope.create = function () {

      // Create new Mission object
      var mission = new Missions({
        header: this.header,
        body: parsePara(this.body),
        position: parsePara(this.position),
        hidden: this.hidden
      });

      // Redirect after save
      mission.$save(function (response) {
        $location.path('missions/' + response._id);

        //clear for fields
        $scope.header = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Mission
    $scope.remove = function (mission) {
      if (mission) {
        mission.$remove();

        for (var i in $scope.missions) {
          if ($scope.missions[i] === mission) {
            $scope.missions.splice(i, 1);
          }
        }
      } else {
        $scope.mission.$remove(function () {
          $location.path('missions');
        });
      }
    };

    // Update Existing Mission
    $scope.update = function () {
      angular.copy(parsePara($scope.body_str), $scope.mission.body);
      angular.copy(parsePara($scope.position_str), $scope.mission.position);
      var mission = $scope.mission;

      mission.$update(function () {
        $location.path('missions/' + mission._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Missions
    $scope.find = function () {
      $scope.missions = Missions.query();
    };

    // Find existing Mission
    $scope.findOne = function () {
      $scope.mission = Missions.get({
        missionsId: $stateParams.missionsId
      });

      $scope.mission.$promise.then(function (data) {
        $scope.mission = data;
        console.log('this is promised data');
        console.log(data);

        for (var i = 0; i < $scope.mission.body.length; i++) {
          $scope.body_str = $scope.body_str + $scope.mission.body[i].paragraph + '\n\n';
        }
        for (var o = 0; o < $scope.mission.position.length; o++) {
          $scope.position_str = $scope.position_str + $scope.mission.position[o].paragraph + '\n\n';
        }
      });
    };

    // Search for a mission
    $scope.missionSearch = function (mission) {
      $location.path('missions/' + mission._id);
    };


  }
]);