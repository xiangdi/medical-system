'use strict';

/**
 * organization
 */
const request = require('../lib/request');
const { config } = require('../lib/utils');
const ERROR_ACTION_URL = 'ERROR_ACTION_URL';

const API_BASE = config.apiBase

module.exports = {
  fetch(values) {
    let url = '/org/list';
    if (!url) {
      throw new Error(ERROR_ACTION_URL);
    }
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE
    });
  }
};