'use strict';

/**
 * order
 */
const request = require('../lib/request');
const { config } = require('../lib/utils');

const API_BASE = config.apiBase

module.exports = {
  query (values, action) {
    var map = {
      'list': '/invest/list',
      'total': '/invest/listStat',
      'download': '/invest/export',
    };
    var url = action && map[action];
    if (!url) {
      throw new Error(ERROR_ACTION_URL);
    }
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE,
    })
  },

  fetch (values) {
    let url = '/invest/searchOrderDetails'
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE,
    })
  },
};
