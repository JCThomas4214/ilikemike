'use strict';

angular.module('missions').controller('MissionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Missions',
  function($scope, $stateParams, $location, Authentication, Missions) {
  	
    // Page changed handler
    $scope.pageChanged = function() {
      $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
    };

  	// Create new Mission
    $scope.create = function() {
      // Create new Mission object
      var mission = new Missions({
        header: this.header,
        body: this.body,
        position: this.position,
        hidden: this.hidden
      });

      // Redirect after save
      mission.$save(function(response) {
        $location.path('missions/' + response._id);

        //clear for fields
        $scope.header = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Mission
    $scope.remove = function(mission) {
      if (mission) {
        mission.$remove();

        for (var i in $scope.missions) {
          if ($scope.missions [i] === mission) {
            $scope.missions.splice(i,1);
          }
        }
      } else {
        $scope.mission.$remove(function() {
          $location.path('missions');
        });
      }
    };

    // Update Existing Mission
    $scope.update = function() {
      var mission = $scope.mission;

      mission.$update(function() {
        $location.path('missions/' + mission._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Missions
    $scope.find = function() {
      $scope.missions = Missions.query();
    };

    // Find existing Mission
    $scope.findOne = function() {
      $scope.mission = Missions.get({
        missionsId: $stateParams.missionsId
      });
    };

    // Search for a mission
    $scope.missionSearch = function(mission) {
      $location.path('missions/' + mission._id);
    };

  }
]);