'use strict';

angular.module('core').controller('photoCtrl', [ '$scope', 
  function ($scope) {

    $scope.slides1 = [{
      src: 'modules/core/client/img/photos/mike_pa_crop.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike_pa_crop.jpg',
      w: 986, h: 1360
    },{
      src: 'modules/core/client/img/photos/mike_troya.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike_troya.jpg',
      w: 1277, h: 1242,
      caption: 'Mike and Troya Thomas'
    },{
      src: 'modules/core/client/img/photos/thomas_fam.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/thomas_fam.jpg',
      w: 640, h: 376,
      caption: 'Mike\'s parents and siblings'
    },{
      src: 'modules/core/client/img/photos/Mike NAVY.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/Mike NAVY.jpg',
      w: 466, h: 640,
      caption: 'Mike when he was enlisted into the NAVY in 1975'
    },{
      src: 'modules/core/client/img/photos/mike_baby.JPG',
      msrc: 'modules/core/client/img/photos/small_ver/mike_baby.JPG',
      w: 1280, h: 961,
      caption: 'Mike is a family man'
    },{
      src: 'modules/core/client/img/photos/mike_boys.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike_boys.jpg',
      w: 1704, h: 1278,
      caption: 'Mike and his boys - Jason and Michael'
    },{
      src: 'modules/core/client/img/photos/Mike w Author.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/Mike w Author.jpg',
      w: 1296, h: 968,
      caption: 'Mike with K. Carl Smith; author and political activist'
    },{
      src: 'modules/core/client/img/photos/mike_troya2.JPG',
      msrc: 'modules/core/client/img/photos/small_ver/mike_troya2.JPG',
      w: 1224, h: 1145,
      caption: 'Mr. and Mrs. Thomas at the Governor\'s mansion'
    },{
      src: 'modules/core/client/img/photos/mike_plane.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike_plane.jpg',
      w: 1024, h: 768,
      caption: 'A Piper fan'
    },{
      src: 'modules/core/client/img/photos/mike_sandy_jordan.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike_sandy_jordan.jpg',
      w: 540, h: 960,
      caption: 'Mike with his daughter and grandson, Sandy and Jordan'
    },{
      src: 'modules/core/client/img/photos/mike_489th.JPG',
      msrc: 'modules/core/client/img/photos/small_ver/mike_489th.JPG',
      w: 1706, h: 1280,
      caption: 'Mike at the 489th Squadron reunion (Hand is raised)'
    },{
      src: 'modules/core/client/img/photos/Malabar Walk In.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/Malabar Walk In.jpg',
      w: 1296, h: 968,
      caption: 'Mike is a small business owner'
    },{
      src: 'modules/core/client/img/photos/dog_whisperer.png',
      msrc: 'modules/core/client/img/photos/small_ver/dog_whisperer.png',
      w: 506, h: 854,
      caption: 'Mike the dog whisperer'
    },{
      src: 'modules/core/client/img/photos/mike_troya3.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike_troya3.jpg',
      w: 1824, h: 1368,
      caption: 'Mr. and Mrs. Thomas at the BREC Lincoln Day Dinner'
    },{
      src: 'modules/core/client/img/photos/mike1.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike1.jpg',
      w: 640, h: 478
    },{
      src: 'modules/core/client/img/photos/With Aging Matters President and CEO Cindy Flachmeier.jpg',
      msrc: 'modules/core/client/img/photos/With Aging Matters President and CEO Cindy Flachmeier.jpg',
      w: 743, h: 559,
      caption: 'Mike with Cindy Flachmeier, President/CEO of Aging Matters (Meals on Wheels)'
    },{
      src: 'modules/core/client/img/photos/doctor\'s good will foundation board.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/doctor\'s good will foundation board.jpg',
      w: 960, h: 720,
      caption: 'Doctor\'s Goodwill foundation board members'
    }];

    $scope.slides2 = [{
      src: 'modules/core/client/img/photos/mike5.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike5.jpg',
      w: 1394, h: 1158
    },{
      src: 'modules/core/client/img/photos/mike6.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike6.jpg',
      w: 1536, h: 1488
    },{
      src: 'modules/core/client/img/photos/mike3.jpg',
      msrc: 'modules/core/client/img/photos/small_ver/mike3.jpg',
      w: 1485, h: 1203
    }];
  }]);