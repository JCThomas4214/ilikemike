'use strict';

angular.module('missions').controller('MissionsController', ['$scope', '$timeout', '$window', '$stateParams', '$location', 'Authentication', 'Missions', 'DeletePhoto', 'FileUploader', 'ngDialog',
  function ($scope, $timeout, $window, $stateParams, $location, Authentication, Missions, DeletePhoto, FileUploader, ngDialog) {

    var dialog;
    // var imageURL = '';
    var mission = [];
    var mission_index = 0;
    var body_index = 0;
    var width = 0;
    var height = 0;
    var caption = '';
    //For create and edit
    $scope.body_str = '';
    $scope.position_str = '';

    $scope.mission = [];
    $scope.mission_index = 0;
    $scope.paragraph = {
      select: null
    };

    //go to page
    $scope.goTo = function (loc) {
      $location.path(loc);
    };

    $scope.openPhotoPicker = function (missionIndex, _mission) {
      $scope.mission = _mission;
      $scope.mission_index = missionIndex;

      angular.copy(_mission, mission);
      mission_index = missionIndex;

      var dialog = ngDialog.open({
        template: '/modules/missions/client/views/pickerDialogFormat.html',
        className: 'picker_dialog',
        scope: $scope
      });

      dialog.closePromise.then(function (data) {
        $scope.cancelUpload();
      });
    };

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




    // Photo Upload Process
    // Create file uploader instance
    $scope.uploader = new FileUploader({
      alias: 'newMissionPicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called before the user selected a new picture file
    $scope.uploader.onBeforeUploadItem = function (item) {
      item.url = 'missions/' + mission._id + '/bodies/' + body_index + '/width/' + width + '/height/' + height + '/caption/' + caption;
    };

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            var img = new Image();
            img.src = fileReaderEvent.target.result;
            // imageURL = fileReaderEvent.target.result;
            width = img.width;
            height = img.height;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      // $scope.success = true;

      // Populate user object
      var tmp_mission = response;

      for (var i = 0; i < $scope.missions.length; i++) {
        if ($scope.missions[i]._id === tmp_mission._id) {
          $scope.missions[i].body[body_index] = tmp_mission.body[body_index];
          break;
        }
      }
      // Clear upload buttons
      $scope.cancelUpload();

      ngDialog.closeAll();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadParagraphPicture = function (body_i, pic_width, pic_height, pic_caption) {

      body_index = $scope.paragraph.select;
      caption = this.caption;

      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      // $scope.imageURL = $scope.missions[1].body[1].image[0].src;
    };


    //Delete photo from paragraph
    $scope.deleteParagraphPicture = function (missions_index, mission, body_index) {
      var deletePhoto = new DeletePhoto();

      deletePhoto.$update({
        missionsId: mission._id,
        bodyIndex: body_index
      }, function (res) {
        for (var i = 0; i < $scope.missions.length; i++) {
          if ($scope.missions[i]._id === res._id) {
            $scope.missions[i].body[body_index] = res.body[body_index];
            break;
          }
        }
      });
    };

  }
]);