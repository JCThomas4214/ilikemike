'use strict';

angular.module('missions').controller('AlbumsController', ['$scope', '$location', '$window', '$timeout', '$stateParams', 'Albums', 'StoreAlbumRecord',
  'DeleteAlbum', 'DeleteAlbumPhoto', 'Dropboxapi', 'DropboxHostapi', 'DropboxDeleteapi', 'FileUploader', 'ngDialog',
  function ($scope, $location, $window, $timeout, $stateParams, Albums, StoreAlbumRecord, DeleteAlbum, DeleteAlbumPhoto, Dropboxapi, DropboxHostapi,
    DropboxDeleteapi, FileUploader, ngDialog) {
    // Controller Logic

    var active = false;
    var dialog;
    $scope.album = [];


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

      angular.copy(_album, $scope.album);

      dialog = ngDialog.open({
        template: '/modules/missions/client/views/pickerPDialogFormat.html',
        className: 'picker_dialog',
        scope: $scope
      });
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
      if (!active) {
        active = true;
        // Create new Album object
        var album = new Albums({
          name: this.name,
          order: $scope.albums.length + 1
        });

        // Redirect after save
        album.$save(function (response) {
          active = false;
          $location.path('albums');
        }, function (errorResponse) {
          console.log(errorResponse.data.message);
        });
      }
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
    $scope.uploadAlbumPicture = function () {
      $scope.incLoading();
      $scope.progress.state = true;

      // Start upload
      if (!active && $scope.newImage.imageName) {
        active = true;
        $scope.progress.position = 20;
        Dropboxapi.save($scope.newImage, function (res) {
          $scope.progress.position = 60;
          DropboxHostapi.share(res, function (res) {
            $scope.progress.position = 80;
            console.log(res);
            res.albumsId = $scope.album._id;
            StoreAlbumRecord.store(res, function (res) {

              $timeout(function () {
                $scope.progress.position = 100;
                $scope.progress.class = 'progress-bar-success';
              });
              $timeout(function () {
                ngDialog.close(dialog);
              }, 1000);

              console.log(res);
              for (var i = 0; i < $scope.albums.length; i++) {
                if ($scope.albums[i]._id === res._id) $scope.albums[i] = res;
              }
              active = false;
              $scope.decLoading();
            });
          });
        });
      }

    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
    };


    //Delete photo from paragraph
    $scope.deleteAlbumPicture = function (album, photo) {
      if (!active) {
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

        var image_info = {
          photo_path: photo.ftpsrc
        };

        DropboxDeleteapi.delete(image_info, function (res) {
          console.log(res);
          deletePhoto.$update({
            albumsId: album._id,
            photosIndex: pIndex
          }, function (res) {
            console.log(res);
            angular.copy(res, album);
            $scope.decLoading();
            active = false;
          });
        });

      }
    };
  }
]);
