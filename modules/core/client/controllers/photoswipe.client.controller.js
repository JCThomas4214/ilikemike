'use strict';

angular.module('core').controller('photoCtrl', [ '$scope', 
  function ($scope) {

    $scope.slides1 = [{
      src: 'modules/core/client/img/photos/mike_troya.jpg',
      w: 1277, h: 1242,
      caption: 'Mike and Troya Thomas'
    },{
      src: 'modules/core/client/img/photos/thomas_fam.JPG',
      w: 640, h: 480,
      caption: 'Mike\'s parents and siblings'
    },{
      src: 'modules/core/client/img/photos/Mike NAVY.jpg',
      w: 466, h: 640,
      caption: 'Mike when he was enlisted into the NAVY in 1975'
    },{
      src: 'modules/core/client/img/photos/mike_troya2.JPG',
      w: 1224, h: 1145,
      caption: 'Mr. and Mrs. Thomas the Governor\'s mansion'
    },{
      src: 'modules/core/client/img/photos/Mike w Author.jpg',
      w: 1296, h: 968,
      caption: 'Mike with K. Carl Smith; author and political activist'
    },{
      src: 'modules/core/client/img/photos/mike_boys.JPG',
      w: 1704, h: 1278,
      caption: 'Mike and the boys'
    },{
      src: 'modules/core/client/img/photos/mike_plane.jpg',
      w: 1024, h: 768,
      caption: 'Mike ready to fly'
    },{
      src: 'modules/core/client/img/photos/mike_shuttle.JPG',
      w: 1642, h: 1232,
      caption: 'Mike at the suttle pad'
    },{
      src: 'modules/core/client/img/photos/mike_489th.JPG',
      w: 1706, h: 1280,
      caption: 'Mike at the 489th Squadron reunion (Hand is raised)'
    },{
      src: 'modules/core/client/img/photos/Malabar Walk In.jpg',
      w: 1296, h: 968,
      caption: 'Mike is a shareholder and Manager for the Malabar Medical Walk-in Clinic'
    },{
      src: 'modules/core/client/img/photos/Dog Whisperer 8 16 15 - crop.png',
      w: 506, h: 854,
      caption: 'Mike the dog whisperer'
    }];

    $scope.slides2 = [{
      src: 'modules/core/client/img/photos/mike1.jpg',
      w: 640, h: 478
    },{
      src: 'modules/core/client/img/photos/mike5.jpg',
      w: 1394, h: 1158
    },{
      src: 'modules/core/client/img/photos/mike6.jpg',
      w: 1536, h: 1488
    },{
      src: 'modules/core/client/img/photos/mike3.jpg',
      w: 1485, h: 1203
    }];
  }]);