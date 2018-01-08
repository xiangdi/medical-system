'use strict';

/**
 * user memo
 */
const request = require('../lib/request.js');
const { config } = require('../lib/utils.js');
const apiBase = config.apiBase;
module.exports = {
  query(values) {
    let url = '/emp/detail';
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: apiBase
    });
  },
  updateEmpInfo(values) {
    let url = '/emp/updateEmployeeInfo';
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: apiBase
    });
  },
  mobile(values) {
    let url = '/emp/updateMobile';
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: apiBase
    });
  },
  password(values) {
    let url = '/emp/updatePassword';
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: apiBase
    });
  }
};
