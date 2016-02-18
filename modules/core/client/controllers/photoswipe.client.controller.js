'use strict';

angular.module('core').controller('photoCtrl', 
  function () {
    var vm = this;

    vm.opts = {
      index: 0
    };

    vm.slides = [{
      src: 'modules/core/client/img/photos/mike1.jpg',
      w: 700, h: 500
    },{
      src: 'modules/core/client/img/photos/mike5.jpg',
      w: 400, h: 500
    },{
      src: 'modules/core/client/img/photos/mike6.jpg',
      w: 400, h: 500
    },{
      src: 'modules/core/client/img/photos/mike3.jpg',
      w: 700, h: 500
    }];

    vm.showGallery = function (i) {
      // if(angular.isDefined(i)) {
      //   vm.opts.index = i;
      // }
      vm.open = true;
    };

    vm.closeGallery = function () {
      vm.open = false;
    };
  });