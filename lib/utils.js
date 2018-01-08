const _ = require('lodash')
const moment = require('moment')
const accounting = require('accounting')

const config = require('../config')

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE_NUMBER = 1

exports.config = config

exports._ = _
exports.lodash = _
exports.moment = moment
exports.formatNumber = accounting.formatNumber
exports.toFixed = accounting.toFixed
exports.reMobile = /^1[3|4|5|7|8|9][0-9]{9}$/;

// checkPage
exports.checkPage = (number, def) => {
  const radix = 10
  def = def && parseInt(def, radix) || DEFAULT_PAGE_NUMBER
  number = parseInt(number, radix) || def
  if (number < 1) {
    number = def
  }
  return number
}

// checkPageSize
exports.checkPageSize = (number, def) => {
  const radix = 10
  def = def && parseInt(def, radix) || DEFAULT_PAGE_SIZE
  number = parseInt(number, radix) || def
  if (number < 1 || number > 200) {
    number = def
  }
  return number
}

exports.fileType = /(\.(gif|jpg|jpeg|bmp|swf|html|htm|png|js|css|ico|map|eot|svg|ttf|woff|woff2))$/i
