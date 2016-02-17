'use strict';

angular.module('core').directive('facebookwidget', function() {
  return { 
    restrict: 'E',
    template: '<div class="fb-page" data-href="https://www.facebook.com/MikeThomasForSenate/?fref=ts" data-tabs="timeline" data-width="500" data-height="600" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/MikeThomasForSenate/?fref=ts"><a href="https://www.facebook.com/MikeThomasForSenate/?fref=ts">Mike Thomas For Florida Senate</a></blockquote></div></div>',
    link: function(scope, element, attrs) {

      function run(){
        (function(d, s, id){var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));  // jshint ignore:line
      }

      run();
    }  
  };
});