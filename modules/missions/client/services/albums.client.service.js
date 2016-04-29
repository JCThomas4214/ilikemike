'use strict';

angular.module('missions')
  .factory('PublicAlbums', ['$resource',

    function ($resource) {
      // Albums service logic
      // ...

      // Public API
      return $resource('api/albums/public', {}, {
        update: {
          method: 'GET'
        }
      });
    }
  ]);

angular.module('missions')
  .factory('Albums', ['$resource',

    function ($resource) {
      // Albums service logic
      // ...

      // Public API
      return $resource('api/albums/:albumsId', {
        albumsId: '@_id'
      }, {
        update: {
          method: 'PATCH'
        }
      });
    }
  ]);

angular.module('missions')
  .factory('DeleteAlbum', ['$resource',
    function ($resource) {
      // Missions service logic
      // ...

      // Public API
      return $resource('api/albums/:albumsId/delete', {
        albumsId: '@_album_id'
      }, {
        update: {
          method: 'DELETE'
        }
      });
    }
  ]);

angular.module('missions')
  .factory('DeleteAlbumPhoto', ['$resource',
    function ($resource) {
      // Missions service logic
      // ...

      // Public API
      return $resource('api/albums/:albumsId/:photosIndex', {
        albumsId: '@_album_id',
        photosIndex: '@_photo_id'
      }, {
        update: {
          method: 'POST'
        }
      });
    }
  ]);
