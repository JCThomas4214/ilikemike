'use strict';

angular.module('core').directive('twitterwidget', 
	function() {
		return { 
	      restrict: 'E',
	      template: '<a class="twitter-timeline" href="//twitter.com/j_lewisg" data-widget-id="699884518724005888">Tweets by @j_lewisg</a>',
	      link: function(scope, element, attrs) {

	        function run(){
	          !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	          console.log('run script');
	        }

	        run();
	      }
	    };
	});