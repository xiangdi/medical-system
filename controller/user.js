// import { try } from './C:/Users/hxb/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bluebird';

/**
 * user
 * */
const debug = require('debug')('controller:user')
const _ = require('lodash')
const { adminUsers } = require('../lib/enums')
const cache = require('./cache')


exports.list = async (ctx, next) => {
  const service = ctx.service.user

  const {
    empId,
    ipAddress,
    pageNumber,
    pageSize,
  } = ctx.parseParams()

  const searchTime = ctx.checkBody('searchTime').value || []

  const statisticsData = {
    empId,
    ipAddress,
    hasEmp: ctx.checkBody('hasEmp').value || '',
    orgId: ctx.checkBody('orgId').value || '',
  }
  const query = {
    empId,
    ipAddress,
    hasEmp: ctx.checkBody('hasEmp').value || '',
    orgId: ctx.checkBody('orgId').value || '',
    empInfo: ctx.checkBody('empInfo').value || '',
    empInfoType: ctx.checkBody('empInfoType').value || '',
    userInfo: ctx.checkBody('userValue').value || '',
    userInfoType: ctx.checkBody('userInfoType').value || '',
    startTime: searchTime[0] || '',
    endTime: searchTime[1] || '',
    userStatus: ctx.checkBody('userStatus').value || '',
    pageNumber,
    pageSize,
  }
  let ret
  let userTotal
  let increasedUserNum
  let investUserNum
  let expireUserNum
  let data

  try {
    values = await Promise.all([
      service.query(query, 'list'),
      service.fetch(statisticsData, 'total'),
      service.fetch(statisticsData, 'increase'),
      service.fetch(statisticsData, 'investUsreNum'),
      service.fetch(statisticsData, 'expireUsreNum'),
    ])

    ret = _.get(values, '[0]')
    userTotal = _.get(values, '[1].totalUserNum')
    increasedUserNum = _.get(values, '[2].increasedUserNum')
    investUserNum = _.get(values, '[3].newInvestmentNum')
    expireUserNum = _.get(values, '[4].expireNum')

    data = {
      userList: ret,
      userTotal,
      increasedUserNum,
      investUserNum,
      expireUserNum,
    }
  } catch (error) {
    ctx.body = error
    return
  }
  ctx.dumpJSON(data)
}

exports.info = async (ctx, next) => {
  const user = ctx.state.user
  const service = ctx.service.user
  const permissions = _.get(ctx.session, 'user.permissions') || ''
  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  let ret = await cache.get_state(empId)
  const data = {
    user: ret,
    permissions,
    isLogin: ctx.session.isLogin,
  }
  ctx.dumpJSON(data)
}

exports.loginPost = async (ctx, next) => {
  const service = ctx.service.user

  let userItem
  let ret
  let roleid

  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  let query = {
    empId,
    ipAddress,
    empCode: ctx.checkBody('username').value,
    password: ctx.checkBody('password').value,
  }
  try {
    ret = await service.login(query)
    roleid = _.get(ret, 'roleId') - 0 || 1
    ctx.session.isLogin = true
    ctx.session.user = {
      id: _.get(ret, 'empId') - 0 || 0,
      roleId: roleid,
      empName: _.get(ret, 'empName') || '',
      mobile: _.get(ret, 'mobile') - 0 || '',
      lastLoginTime: _.get(ret, 'lastLoginTime') - 0 || 0,
      empCode: _.get(ret, 'empCode') - 0 || 0,
      time: Date.now(),
    }

    userItem = adminUsers.filter(_ => _.id === roleid)
    if (userItem.length > 0) {
      ctx.session.user.permissions = userItem[0].permissions
    }
  } catch (error) {
    ctx.body = error._response
    return
  }

  ctx.dumpJSON(ctx.session)
}

exports.logout = async (ctx, next) => {
  ctx.session.isLogin = false
  ctx.session.user = {}
  ctx.dumpJSON(ctx.session)
}

exports.detail = async (ctx) => {
  const service = ctx.service.user

  const {
    empId,
    ipAddress,
    pageNumber,
    pageSize,
  } = ctx.parseParams()

  const query = {
    empId,
    ipAddress,
    pageNumber,
    pageSize,
    userId: ctx.checkParams('id').value || 0,
  }
  let userInfo
  let data
  let investRecord
  try {
    values = await Promise.all([
      service.fetch(query, 'detail'),
      service.fetch(query, 'userDetailInvest'),
    ])
    userInfo = _.get(values, '[0]')
    investRecord = _.get(values, '[1]')
    data = {
      userDetailInfo: [_.get(userInfo, 'userInfo')],
      accountInfo: [_.get(userInfo, 'accountInfo')],
      investRecord,
    }
  } catch (error) {
    ctx.body = error
    return
  }
  ctx.dumpJSON(data)
}

exports.transaction = async (ctx) => {
  const service = ctx.service.user
  const {
    empId,
    ipAddress,
  } = ctx.parseParams()
  let userIds = ctx.checkBody('userId').value || []
  userIds = userIds.join(',')
  const query = {
    empId,
    userIds,
    ipAddress,
  }
  let ret
  try {
    ret = await service.query(query, 'transaction')
  } catch (error) {
    ctx.body = error
    return
  }

  ctx.dumpJSON(ret)
}

exports.saleList = async (ctx) => {
  const service = ctx.service.user
  const {
    empId,
    ipAddress,
  } = ctx.parseParams()
  const query = {
    empId,
    ipAddress,
    orgId: ctx.checkBody('orgId').value || '',
  }
  let ret
  try {
    ret = await service.query(query, 'saleList')
  } catch (error) {
    ctx.body = error
    return
  }
  ctx.dumpJSON(ret)
}

exports.userSearch = async (ctx) => {
  const service = ctx.service.user
  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  const query = {
    empId,
    ipAddress,
    userInfoType: ctx.checkBody('empInfoType').value || 0,
    userInfo: ctx.checkBody('empInfo').value || '',
  }

  let ret
  try {
    ret = await service.fetch(query, 'userSearch')
  } catch (error) {
    ctx.body = error
    return
  }
  ctx.dumpJSON(ret)
}
exports.transactionUpdate = async (ctx) => {
  const service = ctx.service.user
  const {
    empId,
    ipAddress,
  } = ctx.parseParams()
  let ret
  const query = {
    empId,
    ipAddress,
    userIds: ctx.checkBody('userIds').value,
    remark: ctx.checkBody('reason').value || '',
    orgId: ctx.checkBody('orgId').value || '',
    sourceValue: ctx.checkBody('empCode').value || '',
  }
  try {
    ret = await service.update(query, 'transaction')
  } catch (error) {
    ctx.body = error
    return
  }
  ctx.dumpJSON(ret)
}
