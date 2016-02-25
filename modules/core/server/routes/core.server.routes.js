'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);

  app.route('/contact-form-to-mike').post(core.recieveMail);
  app.route('/contact-form-to-sub').post(core.sendMail);

  app.route('/volunteer-form-to-mike').post(core.volunteer_recieveMail);
  app.route('/volunteer-form-to-sub').post(core.volunteer_sendMail);

};