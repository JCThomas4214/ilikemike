'use strict';

angular.module('missions').directive('fileread', [function () {
  return {
    scope: {
      fileread: '='
    },
    link: function (scope, element, attrs) {
      // Fileread directive logic
      element.bind('change', function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            var img = new Image();
            img.src = loadEvent.target.result;
            scope.fileread.image = loadEvent.target.result;
            scope.fileread.width = img.width;
            scope.fileread.height = img.height;
            // console.log(loadEvent.target.result);
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
        scope.fileread.imageName = changeEvent.target.files[0].name;
      });
    }
  };
}]);
