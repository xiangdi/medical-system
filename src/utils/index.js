/* global window */
import accounting from 'accounting'
import classnames from 'classnames'
import lodash from 'lodash'
import config from './config'
import request from './request'
import { color } from './theme'
import checkRules from './checkRules'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
const parseInvestStatus = (status) => {
  let investStatus = {
    0: '未投资',
    1: '投资中',
    2: '已退出',
  }
  return investStatus[status]
}

const parseRoleStatus = (id) => {
  let ret = {}
  let keys = ['ADMIN', 'EDIFACT', 'MANAGER', 'STAFF']
  keys.forEach((k) => {
    let item = k.toLowerCase()
    if (id === item) {
      ret[item] = true
    } else {
      ret[item] = false
    }
  })
  return ret
}

const orderStatus = (status) => {
  let planStatus = {
    INPROGRESS: '持有中',
    EXITED: '已退出',
    EXITING: '退出中',
  }
  return planStatus[status]
}

const productType = (status) => {
  let productStatus = {
    PLAN: '计划',
    LOAN: '散标',
    LOAN_TRANSFER: '债转',
  }
  return productStatus[status]
}

const parseUtmSourceType = (status) => {
  let utmSourceType = {
    'from-android': '手机',
    'from-ios': '手机',
    'from-h5': '手机',
    'from-website': '电脑（PC）',
  }
  return utmSourceType[status]
}

const parseEmpStatus = (status) => {
  let empStatus = {
    ON_JOB: '在职',
    QUIT_JOB: '离职',
  }
  return empStatus[status]
}

module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  parseInvestStatus,
  parseRoleStatus,
  orderStatus,
  productType,
  parseUtmSourceType,
  parseEmpStatus,
  formatNumber: accounting.formatNumber,
  toFixed: accounting.toFixed,
  checkRules,
}
