/**
 * user
 * */
exports.checkIdentity = async (ctx, next) => {
  const service = ctx.service.forgot
  const verifycodeService = ctx.service.verifycode

  let {
    empId,
    ipAddress,
  } = ctx.parseParams()

  let data = {
    empCode: empId || ctx.checkBody('empId').value,
    ipAddress,
    mobile: ctx.checkBody('mobile').value,
    smscode: ctx.checkBody('smscode').value,
    captcha: ctx.checkBody('captcha').value,
  }
  let smsData = {
    smsCode: data.smscode,
    mobile: data.mobile,
  }
  // 校验短验，
  try {
    await verifycodeService.checkSmsCode(smsData)
  } catch (error) {
    ctx.body = error._response
    return
  }
  try {
    var ret = await service.query(data)
  } catch (error) {
    ctx.body = error._response
    return
  }
  ctx.dumpJSON(ret)
}

exports.updatePassword = async (ctx, next) => {
  const service = ctx.service.forgot

  const {
    ipAddress,
  } = ctx.parseParams()
  let data = {
    ipAddress,
    empCode: ctx.checkBody('empId').value,
    password: ctx.checkBody('newPassword').value,
    repeatPwd: ctx.checkBody('confirm').value,
    mobile: ctx.checkBody('mobile').value,
  }
  try {
    let ret = await service.updatePassword(data)
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.body = error
  }
}
