'use strict';

angular.module('missions').controller('AlbumsController', ['$scope', '$location', '$window', '$timeout', '$stateParams', 'Albums', 'StoreRecord',
  'DeleteAlbum', 'DeleteAlbumPhoto', 'Dropboxapi', 'DropboxHostapi', 'FileUploader', 'ngDialog',
  function ($scope, $location, $window, $timeout, $stateParams, Albums, StoreRecord, DeleteAlbum, DeleteAlbumPhoto, Dropboxapi, DropboxHostapi, FileUploader, ngDialog) {
    // Controller Logic

    var dialog;
    $scope.album = [];
    var album = [];
    var photo;
    var width;
    var height;
    var caption = '';


    $scope.loading = {
      running: 0,
      state: 'Synced'
    };


    //go to page
    $scope.goTo = function (loc) {
      $location.path(loc);
    };

    $scope.incLoading = function () {
      $scope.loading.running++;
      $scope.loading.state = 'Syncing...';
    };

    $scope.decLoading = function () {
      $scope.loading.running--;
      if (!$scope.loading.running)
        $scope.loading.state = 'Synced';
    };

    $scope.errorLoading = function (err) {
      $scope.loading.running--;
      $scope.loading.state = err;
      console.log($scope.loading.running);
      if ($scope.loading.running) {
        $timeout(function () {
          $scope.loading.state = 'Syncing...';
        }, 1500);
      } else {
        $timeout(function () {
          $scope.loading.state = 'Synced';
        }, 1500);
      }
    };

    $scope.openPhotoPicker = function (_album) {
      $scope.newImage = {
        image: '',
        imageName: '',
        imageURL: 'uploads/photo-gallery/',
        caption: '',
        width: 0,
        height: 0,
        imageLink: ''
      };


      $scope.progress = {
        state: false,
        position: 0,
        class: ''
      };

      angular.copy(_album, album);
      angular.copy(_album, $scope.album);

      dialog = ngDialog.open({
        template: '/modules/missions/client/views/pickerPDialogFormat.html',
        className: 'picker_dialog',
        scope: $scope
      });

      // dialog.closePromise.then(function (data) {
      //   $scope.cancelUpload();
      // });
    };

    $scope.openDeleteAlbumQ = function (_album) {
      $scope.del_album = _album;

      dialog = ngDialog.open({
        template: '/modules/missions/client/views/deleteAlbum.html',
        className: 'deleteQ_dialog',
        scope: $scope
      });
    };

    $scope.openDeletePhotoQ = function (_album, _photo) {
      $scope.del_album_photo = _album;
      $scope.del_photo = _photo;

      dialog = ngDialog.open({
        template: '/modules/missions/client/views/deletePhoto.html',
        className: 'deleteQ_dialog',
        scope: $scope
      });
    };

    $scope.openPhotoCaption = function (_album, _photo) {
      $scope._album_photo = _album;
      $scope._photo = _photo;
      $scope._photo.caption = decodeURIComponent($scope._photo.caption);

      dialog = ngDialog.open({
        template: '/modules/missions/client/views/photoCaption.html',
        className: 'textQ_dialog',
        scope: $scope
      });
    };

    $scope.openAlbumName = function (_album) {
      $scope._album = _album;

      var dialog = ngDialog.open({
        template: '/modules/missions/client/views/albumName.html',
        className: 'textQ_dialog',
        scope: $scope
      });
    };

    // Create new Album
    $scope.create = function () {
      // Create new Album object
      var album = new Albums({
        name: this.name,
        order: $scope.albums.length + 1
      });

      // Redirect after save
      album.$save(function (response) {
        $location.path('albums');
      }, function (errorResponse) {
        console.log(errorResponse.data.message);
      });
    };

    // Remove existing Album
    $scope.delete = function (album) {
      $scope.incLoading();
      ngDialog.closeAll();
      var albumDel = new DeleteAlbum();

      if (album) {
        albumDel.$update({
          albumsId: album._id
        }, function (res) {
          var ind;
          for (var i = 0; i < $scope.albums.length; i++) {
            if ($scope.albums[i]._id === res._id) {
              ind = i;
            }
            if ($scope.albums[i].order > album.order && $scope.albums[i]._id !== res._id) {
              $scope.albums[i].order--;
              $scope.albums[i].$update();
            }
          }
          $scope.albums.splice(ind, 1);
          $scope.decLoading();
        });
      } else {
        console.log('Album not here');
      }
    };

    // Update album name
    $scope.updateAlbum = function (album) {
      $scope.incLoading();
      ngDialog.close(dialog);
      album.$update(function (res) {
        $scope.decLoading();
      });
    };

    // Update photo caption
    $scope.updateCaption = function (album, photo) {
      $scope.incLoading();
      ngDialog.closeAll();

      if (!photo.caption)
        photo.caption = '';

      album.$update(function (res) {
        $scope.decLoading();
      });
    };

    // Update Mission Order
    var updateOrder = function (album) {
      $scope.incLoading();
      album.$update(function (res) {
        $scope.decLoading();
      });
    };

    //increment order for record
    $scope.incOrder = function (album) {
      if (album.order < $scope.albums.length) {
        var currID = album._id;
        album.order = album.order + 1;
        var currOrder = album.order;

        for (var i = 0; i < $scope.albums.length; i++) {
          if ($scope.albums[i].order === currOrder && $scope.albums[i]._id !== currID) {
            $scope.albums[i].order = $scope.albums[i].order - 1;
            // Update both albums
            updateOrder($scope.albums[i]);
            updateOrder(album);
            return;
          }
        }
      }
      console.log('album is currently at the end');
    };

    //decrement order for record
    $scope.decOrder = function (album) {
      console.log($scope.loading.running);
      if (album.order > 1) {
        var currID = album._id;
        album.order = album.order - 1;
        var currOrder = album.order;

        for (var i = 0; i < $scope.albums.length; i++) {
          if ($scope.albums[i].order === currOrder && $scope.albums[i]._id !== currID) {
            $scope.albums[i].order = $scope.albums[i].order + 1;
            // Update both albums
            updateOrder($scope.albums[i]);
            updateOrder(album);
            return;
          }
        }
      }
      console.log('album is currently at the beginning');
    };

    //increment order for record
    $scope.incPhotoOrder = function (album, photo) {
      if (photo.pic_order < album.gallery.length) {
        photo.pic_order = photo.pic_order + 1;
        var currOrder = photo.pic_order;

        for (var i = 0; i < album.gallery.length; i++) {
          if (album.gallery[i].pic_order === currOrder && album.gallery[i]._id !== photo._id) {
            album.gallery[i].pic_order = album.gallery[i].pic_order - 1;
            // Update albums
            updateOrder(album);
            return;
          }
        }
      }
      console.log('Photo is currently at the end');
    };

    //increment pic_order for record
    $scope.decPhotoOrder = function (album, photo) {
      if (photo.pic_order > 1) {
        photo.pic_order = photo.pic_order - 1;
        var currOrder = photo.pic_order;

        for (var i = 0; i < album.gallery.length; i++) {
          if (album.gallery[i].pic_order === currOrder && album.gallery[i]._id !== photo._id) {
            album.gallery[i].pic_order = album.gallery[i].pic_order + 1;
            // Update albums
            updateOrder(album);
            return;
          }
        }
      }
      console.log('Photo is currently at the beginning');
    };

    // Find a list of Albums
    $scope.find = function () {
      $scope.albums = Albums.query();
      // Dropboxapi.oauth();
    };

    // Find existing Mission
    $scope.findOne = function () {
      $scope.album = Albums.get({
        albumsId: $stateParams.albumsId
      });

      $scope.album.$promise.then(function (data) {
        $scope.album = data;

      });
    };

    // Photo Upload Process
    // Create file uploader instance
    $scope.uploader = new FileUploader({
      alias: 'newAlbumPicture',
      method: 'POST'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    //upload progress
    $scope.uploader.onProgressAll = function (progress) {
      $scope.progress.position = progress;
    };

    // Called before the user selected a new picture file
    $scope.uploader.onBeforeUploadItem = function (item) {
      item.url = 'api/albums/' + $scope.album._id + '/' + width + '/' + height + '/' + caption;
    };

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);
        $scope.imageURL = fileItem._file.name;

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            var img = new Image();
            img.src = fileReaderEvent.target.result;
            width = img.width;
            height = img.height;
            console.log(img.width + ' x ' + img.height);
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {


      for (var i = 0; i < $scope.albums.length; i++) {
        if ($scope.albums[i]._id === response._id) {
          angular.copy(response, $scope.albums[i]);
          break;
        }
      }

      $timeout(function () {
        // $scope.progress.position = 100;
        $scope.progress.class = 'progress-bar-success';
      });
      $timeout(function () {
        ngDialog.closeAll();
      }, 1000);

      $scope.decLoading();
      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      ngDialog.closeAll();
      // Clear upload buttons
      $scope.cancelUpload();

      $scope.errorLoading('Upload Error');

      // Show error message
      $scope.error = response.message;
      console.log($scope.error);
    };

    // Change user profile picture
    $scope.uploadAlbumPicture = function () {
      // $scope.incLoading();
      // $scope.progress.state = true;
      // caption = encodeURIComponent(this.caption);

      // Start upload
      // $scope.uploader.upload();



      var store = new StoreRecord();

      Dropboxapi.save($scope.newImage, function (res) {
        DropboxHostapi.share(res, function (res) {
          console.log(res);
          res.albumsId = $scope.album._id;
          StoreRecord.store(res, function (res) {
            console.log(res);
          });
        });
      });


    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
    };


    //Delete photo from paragraph
    $scope.deleteAlbumPicture = function (album, photo) {
      $scope.incLoading();
      ngDialog.closeAll();
      var deletePhoto = new DeleteAlbumPhoto();
      var pIndex;

      for (var i = 0; i < album.gallery.length; i++) {
        if (album.gallery[i]._id === photo._id) {
          pIndex = i;
          break;
        }
      }

      deletePhoto.$update({
        albumsId: album._id,
        photosIndex: pIndex
      }, function (res) {
        console.log(res);
        angular.copy(res, album);
        $scope.decLoading();
      });
    };
  }
]);
