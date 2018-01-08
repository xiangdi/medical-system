/**
 * order
 * */
const debug = require('debug')('controller:user')
const _ = require('lodash')

const order = async (ctx, next) => {
  await next()
}

order.list = async (ctx, next) => {
  const service = ctx.service.order

  const {
    empId,
    ipAddress,
    pageNumber,
    pageSize,
  } = ctx.parseParams()

  const searchTime = ctx.checkBody('searchTime').value || []
  const user = ctx.state.user
  const role = _.get(user, 'permissions.role') || ''
  const isStaff = role == 'staff'
  const query = {
    empId,
    ipAddress,
    orderNo: ctx.checkBody('orderNo').value - 0 || '',
    sourceValue: isStaff ? user.empCode : ctx.checkBody('sourceValue').value,
    orderStatus: ctx.checkBody('orderStatus').value || '',
    empName: isStaff ? user.empName : ctx.checkBody('empName').value,
    userSearchName: ctx.checkBody('userSearchName').value || '',
    userSearchValue: ctx.checkBody('userSearchValue').value || '',
    productName: ctx.checkBody('productName').value || '',
    productType: ctx.checkBody('productType').value || '',
    timeSearchName: ctx.checkBody('timeSearchName').value || '',
    startTime: searchTime[0] || '',
    endTime: searchTime[1] || '',
    isInvite: ctx.checkBody('isInvite').value,
    orgId: ctx.checkBody('orgId').value - 0 || '',
    pageNumber,
    pageSize,
  }
  let ret
  let orderTotal
  let data

  try {
    values = await Promise.all([
      service.query(query, 'list'),
      service.query(query, 'total'),
    ])

    ret = _.get(values, '[0]')
    orderTotal = _.get(values, '[1].orderCount')
    data = {
      dataList: ret,
      orderTotal,
    }
  } catch (error) {
    ctx.body = error
    return
  }
  ctx.dumpJSON(data)
}


order.detail = async (ctx, next) => {
  const service = ctx.service.order

  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  const query = {
    orderNo: ctx.checkParams('id').value,
    empId,
    ipAddress,
  }

  let ret = {}

  try {
    ret = await service.fetch(query)
  } catch (error) {
    ctx.body = error
    return
  }
  ctx.dumpJSON(ret)
}

order.derive = async (ctx, next) => {
  const service = ctx.service.order

  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  const searchTime = ctx.checkBody('searchTime').value || []
  const user = ctx.state.user
  const role = _.get(user, 'permissions.role') || ''
  const isStaff = role == 'staff'
  const query = {
    empId,
    ipAddress,
    orderNo: ctx.checkBody('orderNo').value - 0 || '',
    sourceValue: isStaff ? user.empCode : ctx.checkBody('sourceValue').value,
    orderStatus: ctx.checkBody('orderStatus').value || '',
    empName: isStaff ? user.empName : ctx.checkBody('empName').value,
    userSearchName: ctx.checkBody('userSearchName').value || '',
    userSearchValue: ctx.checkBody('userSearchValue').value || '',
    productName: ctx.checkBody('productName').value || '',
    productType: ctx.checkBody('productType').value || '',
    timeSearchName: ctx.checkBody('timeSearchName').value || '',
    startTime: searchTime[0] || '',
    endTime: searchTime[1] || '',
    isInvite: ctx.checkBody('isInvite').value,
    orgId: ctx.checkBody('orgId').value - 0 || '',
  }

  let ret = {}
  try {
    ret = await service.query(query, 'download')
  } catch (error) {
    throw (error)
  }
  ctx.dumpJSON(ret)
}

module.exports = order
