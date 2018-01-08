const _ = require('lodash')

exports.empInfo = async (ctx, next) => {
  const service = ctx.service.settings

  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  let data = {
    empId,
    ipAddress,
  }

  try {
    let ret = await service.query(data)
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.body = error
  }
}

exports.updateEmpInfo = async (ctx, next) => {
  const service = ctx.service.settings

  const {
    empId,
    ipAddress,
  } = ctx.parseParams()
  let data = {
    empId,
    ipAddress,
    qq: ctx.checkBody('qq').value,
    email: ctx.checkBody('email').value,
    postCode: ctx.checkBody('postCode').value,
    address: ctx.checkBody('address').value,
  }
  try {
    let ret = await service.updateEmpInfo(data)
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.body = error
  }
}

exports.mobile = async (ctx, next) => {
  const service = ctx.service.settings

  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  let data = {
    empId,
    ipAddress,
    smscode: ctx.checkBody('smscode').value,
    mobile: ctx.checkBody('mobile').value,
  }
  try {
    let ret = await service.mobile(data)
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.body = error
  }
}

exports.password = async (ctx, next) => {
  const service = ctx.service.settings

  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  let data = {
    empId,
    ipAddress,
    oldPasswd: ctx.checkBody('oldPassword').value,
    passwd: ctx.checkBody('newPassword').value,
    rePasswd: ctx.checkBody('confirm').value,
    mobile: ctx.checkBody('mobile').value,
  }

  try {
    let ret = await service.password(data)
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.body = error
  }
}
