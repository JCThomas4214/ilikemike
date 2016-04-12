'use strict';

angular.module('core').directive('photoswipewidget', ['$timeout', function($timeout) { 
  return { 
    restrict: 'E',
    templateUrl: 'modules/core/client/directives/photoswipe.html',
    link: function(scope, element, attrs) {

      function run(){
        var initPhotoSwipeFromDOM=function(e){for(var t=function(e){for(var t,n,r,i,o=e.childNodes,a=o.length,l=[],d=0;a>d;d++)t=o[d],1===t.nodeType&&(n=t.children[0],r=n.getAttribute('data-size').split('x'),i={ src:n.getAttribute('href'),w:parseInt(r[0],10),h:parseInt(r[1],10) },t.children.length>1&&(i.title=t.children[1].innerHTML),n.children.length>0&&(i.msrc=n.children[0].getAttribute('src')),i.el=t,l.push(i));return l },n=function p(e,t){ return e&&(t(e)?e:p(e.parentNode,t)) },r=function(e,n,r,i){ var o,a,l,d=document.querySelectorAll('.pswp')[0];if(l=t(n),a={ galleryUID:n.getAttribute('data-pswp-uid'),getThumbBoundsFn:function(e){ var t=l[e].el.getElementsByTagName('img')[0],n=window.pageYOffset||document.documentElement.scrollTop,r=t.getBoundingClientRect();return{ x:r.left,y:r.top+n,w:r.width } } },i)if(a.galleryPIDs){ for(var u=0;u<l.length;u++)if(l[u].pid==e){ a.index=u;break } }else a.index=parseInt(e,10)-1;else a.index=parseInt(e,10);isNaN(a.index)||(r&&(a.showAnimationDuration=0),o=new PhotoSwipe(d,PhotoSwipeUI_Default,l,a),o.init()) },i=function(e){ e=e||window.event,e.preventDefault?e.preventDefault():e.returnValue=!1;var t=e.target||e.srcElement,i=n(t,function(e){ return e.tagName&&'FIGURE'===e.tagName.toUpperCase() });if(i){ for(var o,a=i.parentNode,l=i.parentNode.childNodes,d=l.length,u=0,p=0;d>p;p++)if(1===l[p].nodeType){ if(l[p]===i){ o=u;break }u++ }return o>=0&&r(o,a),!1 } },o=function(){ var e=window.location.hash.substring(1),t={ };if(e.length<5)return t;for(var n=e.split('&'),r=0;r<n.length;r++)if(n[r]){ var i=n[r].split('=');i.length<2||(t[i[0]]=i[1]) }return t.gid&&(t.gid=parseInt(t.gid,10)),t },a=document.querySelectorAll(e),l=0,d=a.length;d>l;l++)a[l].setAttribute('data-pswp-uid',l+1),a[l].onclick=i;var u=o();u.pid&&u.gid&&r(u.pid,a[u.gid-1],!0,!0) };initPhotoSwipeFromDOM('.my-gallery'); // jshint ignore:line
      }

      $timeout(run);
    }  
  };
}]);