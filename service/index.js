'use strict';

/**
 * service
 */
module.exports = (app, config) => {
  const service = app.context.service = {};
  service.settings = require('./settings.js');
  service.user = require('./user.js');
  service.dashboard = require('./dashboard.js');
  service.organization = require('./organization.js');
  service.verifycode = require('./verifycode.js');
  service.order = require('./order.js');
  service.forgot = require('./forgot.js');
  return app;
};
