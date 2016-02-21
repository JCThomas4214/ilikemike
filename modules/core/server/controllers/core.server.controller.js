'use strict';

var validator = require('validator');
var nodemailer = require('nodemailer');
var generator = require('xoauth2').createXOAuth2Generator({
  user: 'mikeforflasenate@gmail.com',
  clientId: '446944948375-v68mcs3mmv22760ph9bkloculunp59mi.apps.googleusercontent.com',
  clientSecret: '4VTManev5OXkLGyg_yPRgk_M',
  refreshToken: '1/4ddjdt4h43zb74nrxFy1K3sZL0yk_80t3wgpKa_yFsbBactUREZofsF9C7PrpE-j'
});
// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
  console.log('New token for %s: %s', token.user, token.accessToken);
});
// login
var transporter = nodemailer.createTransport(({
  service: 'gmail',
  auth: {
    user: 'mikeforflasenate',
    pass: 'campaign',
    xoauth2: generator
  }
}));

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {

  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: validator.escape(req.user.profileImageURL),
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName)
    };
  }

  res.render('modules/core/server/views/index', {
    user: safeUserObject
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};

/**
 * Send and Email to Mike when contact form is submitted
 */
exports.recieveMail = function (req, res) {

  var data = req.body;

  transporter.sendMail({
    from: data.contact_email,
    to: 'mikeforflasenate@gmail.com',
    subject: 'New subscriber',
    text: data.contact_name + ' has just subscribed! \nEmail: ' + data.contact_email
  });

  res.json(data);

};

/**
 * Send and Email to Sub when contact form is submitted
 */
exports.sendMail = function (req, res) {

  var data = req.body;

  transporter.sendMail({
    from: '"Mike Thomas for Senate" <mikeforflasenate@gmail.com>',
    to: data.contact_email,
    subject: 'Mike Thomas for Florida Senate 2016',
    text: 'Thank you so much, ' + data.contact_name + ', for subscribing to the Mike Thomas Campaign news Letter!'
  });

  res.json(data);

};

/**
 * Send and volunteer Email to Mike when volunteer form is submitted
 */
exports.volunteer_recieveMail = function (req, res) {

  var data = req.body;

  transporter.sendMail({
    from: data.contact_email,
    to: 'mikeforflasenate@gmail.com',
    subject: 'New volunteer',
    text: data.contact_name + ' has just signed up to volunteer! \nEmail: ' + data.contact_email + '\nPhone: ' + data.contact_phone
  });

  res.json(data);

};

/**
 * Send and volunteer Email to sub when volunteer form is submitted
 */
exports.volunteer_sendMail = function (req, res) {

  var data = req.body;

  transporter.sendMail({
    from: '"Mike Thomas for Senate" <mikeforflasenate@gmail.com>',
    to: data.contact_email,
    subject: 'Mike Thomas Campaign Volunteers',
    text: 'Thank you so much, ' + data.contact_name + ', for signing up to volunteer for the Mike Thomas Campaign! \nWe will periodically email you when volunteer positions open.'
  });

  res.json(data);

};
