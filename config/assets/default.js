'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/ng-dialog/css/ngDialog.css',   
        'public/welcome_dialog.css',
        'public/photo_dialog.css',
        'public/solution_dialog.css',
        'public/quotes_dialog.css', 
        'public/picker_dialog.css', 
        'public/pickerp_dialog.css',   
        'public/deleteAlbum_dialog.css',   
        'public/deletePhoto_dialog.css', 
        'public/photoCaption_dialog.css', 
        'public/albumName_dialog.css',
        'public/lib/photoswipe/dist/photoswipe.css',
        'public/lib/photoswipe/dist/default-skin/default-skin.css',
        'public/lib/ngToast/dist/ngToast.min.css',   
        '//fonts.googleapis.com/css?family=Great+Vibes',
        '//fonts.googleapis.com/css?family=Oleo+Script',
        '//fonts.googleapis.com/css?family=Noto+Serif',
        '//fonts.googleapis.com/css?family=Courgette',
        '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css'

      ],
      js: [
        'public/lib/jquery/dist/jquery.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/photoswipe/dist/photoswipe.min.js',
        'public/lib/photoswipe/dist/photoswipe-ui-default.min.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js',
        'public/lib/ngToast/dist/ngToast.min.js',
        'public/lib/ng-dialog/js/ngDialog.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: ['gruntfile.js'],
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};
