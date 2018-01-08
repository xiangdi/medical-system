/**
 * user
 * */
const _ = require('lodash')
const ErrorStatus = require('../lib/status')
const ErrMsg = require('../lib/errormsg')
const util = require('../lib/utils')

exports.sendCaptha = async (ctx, next) => {
  const service = ctx.service.verifycode

  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  let data = {
    empId,
    ipAddress,
  }

  try {
    const ret = await service.captcha(data)
    const {
      base64,
      code,
    } = ret
    ctx.session.captcha = code.toLowerCase()
    ctx.session.captchacount = 0
    ctx.type = 'image/png'
    // ctx.body = new Buffer(base64, 'base64');
    ctx.dumpJSON({
      base64: ret.base64,
    })
  } catch (error) {
    // ctx.dumpJSON(ErrorStatus.SERVER_FAIL, error)
    ctx.body = error
  }
}

exports.verifyCaptcha = async (ctx, next) => {
  ctx.session.captchacount = ctx.session.captchacount || 0
  ctx.session.captchacount++
  const code = _.get(ctx.session, 'captcha', '100000')
  const captcha = ctx.checkBody('captcha').notEmpty(ErrMsg.lenCaptcha).trim().toLowercase().value
  const count = ctx.session.captchacount
  const maxCount = 10
  if (count > maxCount) {
    ctx.addError('captcha', ErrMsg.expireCaptcha)
    return await next()
  }
  if (ctx.errors || code !== captcha) {
    ctx.addError('captcha', ErrMsg.isCaptcha)
    return await next()
  }
  await next()
}

exports.sendSmsCode = async (ctx, next) => {
  const service = ctx.service.verifycode

  const ACTIONS = {
    setting: { shouldCheckMobile: true, shouldCheckCaptcha: false, type: 'REGISTER' },
    forgot: { shouldCheckMobile: true, shouldCheckCaptcha: true, type: 'RESETPASSWORD' },
  }
  const DEFAULT_ACTION = 'forgot'
  const CODE_TYPES = {
    sms: 'verifycode/sms',
    voice: 'verifycode/voice',
  }
  const DEFAULT_CODE_TYPE = 'sms'
  const DEFAULT_ERROR_MSG = ErrMsg.sendVerifyCodeError
  const CAPTCHA_MAX_TRY_TIMES = 10

  const {
    empId,
    ipAddress,
    platform,
  } = ctx.parseParams()
  const { isLogin } = ctx.state

  const last = (_.get(ctx.session, 'lastsms') - 0) || 0
  const count = ~~ctx.session.captchacount || 0
  const interval = 60 * 1000 // 60sec
  const now = Date.now()
  const query = {
    empId,
    ipAddress,
    platform,
  }

  let action = ctx.checkBody('action').value || ctx.checkParams('action').value || ctx.state.action
  let codeType = ctx.checkBody('type').value
  let userMobile = isLogin && _.get(ctx.state, 'user.mobile', null)
  if (!action || action.length < 3) {
    ctx.dumpJSON(ErrorStatus.FAIL, DEFAULT_ERROR_MSG)
    return
  }
  if (!action || !(action in ACTIONS)) {
    action = DEFAULT_ACTION
  }
  let {
    shouldCheckMobile,
    shouldCheckCaptcha,
    type,
  } = ACTIONS[action]

  let serviceAction
  let tip
  let ret

  // 验证码类型
  query.type = type
  // captcha max try count
  if (shouldCheckCaptcha && (count > CAPTCHA_MAX_TRY_TIMES)) {
    ctx.dumpJSON(ErrorStatus.CAPTCHA_EXPIRE)
    return
  }
  if (!shouldCheckCaptcha && ctx.errors && count) {
    ctx.session.captchacount--
    // no need check captcha , clear captcha error
    ctx.errors = null
  }
  // echo verifyCode error
  if (ctx.errors) {
    let error = ctx.getError()
    ctx.dumpJSON(ErrorStatus.FAIL, error.message)
    return
  }
  // check time interval
  if ((now - last) < interval) {
    ctx.dumpJSON(ErrorStatus.FAIL, ErrMsg.quickSmsCode)
    return
  }
  // 提交的mobile
  if (shouldCheckMobile) {
    query.mobile = ctx.checkBody('mobile').notEmpty(tip = ErrMsg.isMobile).match(util.reMobile, tip).value
  } else if (userMobile) { // 客户的mobile
    query.mobile = userMobile
  } else {
    ctx.throw(ErrorStatus.LOGIN_REQUIRED)
    return
  }
  // validate err
  if (ctx.errors) {
    let error = ctx.getError()
    ctx.dumpJSON(ErrorStatus.FAIL, error.message)
    return
  }

  if (!codeType || !(codeType in CODE_TYPES)) {
    codeType = DEFAULT_CODE_TYPE
  }
  serviceAction = CODE_TYPES[codeType]

  ctx.session.lastsms = now
  try {
    ret = await service.sendSmsCode(query, serviceAction)
  } catch (error) {
    // ctx.dumpJSON(ErrorStatus.FAIL, error)
    ctx.body = error
    return
  }
  ctx.dumpJSON(ret)
}
