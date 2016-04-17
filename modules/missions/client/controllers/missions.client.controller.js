'use strict';

angular.module('missions').controller('MissionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Missions',
  function ($scope, $stateParams, $location, Authentication, Missions) {

    var parsePara = function (body) {
      var final = [];

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
    };

    // $scope.mission_body = [{
    //   paragraph: ''
    // }];
    // $scope.position_body = [{
    //   paragraph: ''
    // }];

    // // Add another paragraph during creation
    // $scope.addParagraph = function (item) {
    //   item.push({
    //     paragraph: ''
    //   });
    // };
    // $scope.removeParagraph = function (item) {
    //   if (item.length > 1)
    //     item.pop();
    // };


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
    };

    // Search for a mission
    $scope.missionSearch = function (mission) {
      $location.path('missions/' + mission._id);
    };

    var unparsePara = function (textArray) {
      var paraCount = 0;

      var body_paragraph = JSON.parse(textArray);
      // angular.forEach(textArray, function(value,key) {

      // });
      // console.log(textArray);

      // $scope.body_str = '';
      // for (var i = 0; i < textArray.body; i++) {
      //   $scope.body_str = $scope.body_str + textArray.body[i].paragraph + '\n\n';
      //   paraCount++;
      // }
    };


  }
]);