'use strict';

angular.module('core').controller('photoCtrl', 
  function () {
    var vm = this;

    vm.opts = {
      index: 0
    };

    vm.slides = [{
      src: 'modules/core/client/img/photos/Mike and Troya 2 2016a.jpg',
      w: 510, h: 500
    },{
      src: 'modules/core/client/img/photos/thomas_fam.JPG',
      w: 650, h: 500
    },{
      src: 'modules/core/client/img/photos/Dog Whisperer 8 16 15 - crop.png',
      w: 300, h: 500
    },{
      src: 'modules/core/client/img/photos/Mike & Troya - Lincoln Dinner 3 2010.jpg',
      w: 640, h: 500
    },{
      src: 'modules/core/client/img/photos/Mike w Author.jpg',
      w: 640, h: 500
    },{
      src: 'modules/core/client/img/photos/Malabar Walk In.jpg',
      w: 640, h: 500
    },{
      src: 'modules/core/client/img/photos/Mike NAVY.jpg',
      w: 380, h: 500
    }];

    vm.showGallery = function (i) {
      if(angular.isDefined(i)) {
        vm.opts.index = i;
      }
      vm.open = true;
    };

    vm.closeGallery = function () {
      vm.open = false;
    };
  });