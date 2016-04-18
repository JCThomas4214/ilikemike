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
        hidden: this.hidden,
        order: $scope.missions.length + 1
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
    // Update Mission Order
    var updateOrder = function (record) {
      var mission = record;

      mission.$update();
    };

    // Find a list of Missions
    $scope.find = function () {
      $scope.missions = Missions.query();

      $scope.missions.$promise.then(function (data) {
        console.log($scope.missions);
      });
    };

    // Find existing Mission
    $scope.findOne = function () {
      $scope.mission = Missions.get({
        missionsId: $stateParams.missionsId
      });

      $scope.mission.$promise.then(function (data) {
        $scope.mission = data;

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

    //increment order for record
    $scope.incOrder = function (mission) {
      if (mission.order < $scope.missions.length) {
        var currID = mission._id;
        mission.order = mission.order + 1;
        var currOrder = mission.order;

        for (var i = 0; i < $scope.missions.length; i++) {
          if ($scope.missions[i].order === currOrder && $scope.missions[i]._id !== currID) {
            $scope.missions[i].order = $scope.missions[i].order - 1;
            // Update both missions
            updateOrder($scope.missions[i]);
            updateOrder(mission);
            return;
          }
        }
      }
      console.log('missions is currently at the end');
    };

    //decrement order for record
    $scope.decOrder = function (mission) {
      if (mission.order > 1) {
        var currID = mission._id;
        mission.order = mission.order - 1;
        var currOrder = mission.order;

        for (var i = 0; i < $scope.missions.length; i++) {
          if ($scope.missions[i].order === currOrder && $scope.missions[i]._id !== currID) {
            $scope.missions[i].order = $scope.missions[i].order + 1;
            // Update both missions
            updateOrder($scope.missions[i]);
            updateOrder(mission);
            return;
          }
        }
      }
      console.log('missions is currently at the beginning');
    };


  }
]);