'use strict';

/**
 * user memo
 */
const request = require('../lib/request.js');
const { config } = require('../lib/utils.js');
const apiBase = config.apiBase;
const ERROR_ACTION_URL = 'ERROR_ACTION_URL';

module.exports = {
  captcha(values) {
    let url = '/sys/genrandcode';
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: apiBase
    });
  },
  sendSmsCode(values, action='def') {
    let map = {
      'verifycode/sms': '/emp/getSMSCode',
      'def': '/emp/getSMSCode'
    };
    let url = action && map[action];
    if (!url) {
      throw new Error(ERROR_ACTION_URL);
    }
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: apiBase
    });
  },
  checkSmsCode(values) {
    let url = '/emp/checkSMSCode';
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: apiBase
    });
  },
};
