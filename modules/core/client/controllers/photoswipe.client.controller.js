'use strict';

angular.module('core').controller('photoCtrl', [ '$scope', 
  function ($scope) {

    $scope.slides1 = [{
      src: 'modules/core/client/img/photos/Mike and Troya 2 2016a.jpg',
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
      src: 'modules/core/client/img/photos/Mike & Troya - Lincoln Dinner 3 2010.jpg',
      w: 1824, h: 1368,
      caption: 'Mr. and Mrs. Thomas at the BREC Lincoln Day Dinner'
    },{
      src: 'modules/core/client/img/photos/Mike w Author.jpg',
      w: 1296, h: 968,
      caption: 'Mike with K. Carl Smith; author and political activist'
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
      w: 1536, h: 2048
    },{
      src: 'modules/core/client/img/photos/mike6.jpg',
      w: 1536, h: 2048
    },{
      src: 'modules/core/client/img/photos/mike3.jpg',
      w: 2048, h: 1529
    }];
  }]);