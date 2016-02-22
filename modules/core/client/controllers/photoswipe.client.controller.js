'use strict';

angular.module('core').controller('photoCtrl', [ '$scope', 
  function ($scope) {

    $scope.slides1 = [{
      src: 'modules/core/client/img/photos/Mike and Troya 2 2016a.jpg',
      w: 1277, h: 1242
    },{
      src: 'modules/core/client/img/photos/thomas_fam.JPG',
      w: 640, h: 480
    },{
      src: 'modules/core/client/img/photos/Dog Whisperer 8 16 15 - crop.png',
      w: 506, h: 854
    },{
      src: 'modules/core/client/img/photos/Mike & Troya - Lincoln Dinner 3 2010.jpg',
      w: 1824, h: 1368
    },{
      src: 'modules/core/client/img/photos/Mike w Author.jpg',
      w: 1296, h: 968
    },{
      src: 'modules/core/client/img/photos/Malabar Walk In.jpg',
      w: 1296, h: 968
    },{
      src: 'modules/core/client/img/photos/Mike NAVY.jpg',
      w: 466, h: 640
    }];

    $scope.slides2 = [{
      src: 'modules/core/client/img/photos/mike1.jpg',
      w: 640, h: 478
    },{
      src: 'modules/core/client/img/photos/mike5.jpg',
      w: 1536, h: 2048
    },{
      src: 'modules/core/client/img/photos/mike6.jpg',
      w: 1536, h: 2048
    },{
      src: 'modules/core/client/img/photos/mike3.jpg',
      w: 2048, h: 1529
    }];
  }]);