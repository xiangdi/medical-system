const Router = require('koa-router')

const dashboard = require('./dashboard.js')
const user = require('./user.js')
const menu = require('./menus.js')
const forgot = require('./forgot.js')
const verifycode = require('./verifycode.js')
const settings = require('./settings.js')
const organization = require('./organization.js')
const order = require('./order.js')
const { _, fileType } = require('../lib/utils')

const router = new Router()

// router
router
  .get('*', async (ctx, next) => {
    let path = ctx.path
    if(_.startsWith(path, '/api') || _.startsWith(path, '/upload') || fileType.test(path) || path === '/'){
      await next()
    }else{
      ctx.redirect('/')
    }
  })

  .post('/api/user/info', user.info)
  // login
  .post('/api/login', user.loginPost)
  .post('/api/logout', user.logout)
  // organization
  .post('/api/organization', organization.list)

  // user
  .post('/api/user', user.list)
  .post('/api/user/transaction', user.transaction)
  .post('/api/user/search', user.userSearch)
  .post('/api/user/:id', user.detail)
  .post('/api/sale/list', user.saleList)
  .post('/api/sale/update', user.transactionUpdate)
  // menu
  .post('/api/menus', menu.list)

  // order
  .post('/api/order', order.list)
  .post('/api/order/derive', order.derive)
  .post('/api/order/:id', order.detail)


  .post('/api/dashboard/trad', dashboard.trad)
  .post('/api/forgot/check', forgot.checkIdentity)
  .post('/api/forgot', forgot.updatePassword)
  .post('/api/captcha', verifycode.sendCaptha)
  .post('/api/verifycode/send', verifycode.verifyCaptcha, verifycode.sendSmsCode)
  .post('/api/account/setting', settings.empInfo)
  .post('/api/account/setting/empInfo', settings.updateEmpInfo)
  .post('/api/account/setting/mobile', settings.mobile)
  .post('/api/account/setting/password', settings.password)


module.exports = (app) => {
  app
    .use(router.routes())
    .use(router.allowedMethods())
  return app
}
