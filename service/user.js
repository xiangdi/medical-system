

/**
 * user
 */
const request = require('../lib/request')
const { config } = require('../lib/utils')
const db = require('../lib/db')

const redis = db.redis
const ERROR_ACTION_URL = 'ERROR_ACTION_URL'

const API_BASE = config.apiBase

module.exports = {
  login (values) {
    let url = '/sys/login'
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE,
    })
  },
  query (values, action) {
    const map = {
      list: '/user/userList',
      transaction: '/user/userChangeEmpEdit',
      saleList: 'user/getOrganizationEmployee',
    }
    const url = action && map[action]
    if (!url) {
      throw new Error(ERROR_ACTION_URL)
    }
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE,
    })
  },
  fetch (values, action) {
    const map = {
      detail: '/user/searchDetail',
      total: '/user/totalUserNum',
      increase: '/user/increasedNum',
      investUsreNum: '/user/newInvestmentNum',
      expireUsreNum: '/user/expireNum',
      userSearch: '/user/searchUserInfo',
      userDetailInvest: '/user/searchInvestList',
    }
    const url = action && map[action]
    if (!url) {
      throw new Error(ERROR_ACTION_URL)
    }
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE,
    })
  },
  update (values, action) {
    const map = {
      transaction: '/user/userChangeEmp',
    }
    const url = action && map[action]
    if (!url) {
      throw new Error(ERROR_ACTION_URL)
    }
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE,
    })
  },
}
