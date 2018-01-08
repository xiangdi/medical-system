/**
 * middleware
 */
const { _, checkPage, checkPageSize, config } = require('./utils.js');
const db = require('./db');
const cache = require('../controller/cache');

// dump JSON
exports.middleware = async function (ctx, next) {
  // parse request params
  ctx.parseParams = function () {
    const pageNumber = checkPage(ctx.checkBody('page').value)
    const pageSize = checkPageSize(ctx.checkBody('pageSize').value)

    const empId = _.get(ctx.session, 'user.id') || ''
    const ipAddress = ctx.ip

    return {
      pageNumber,
      pageSize,
      empId,
      ipAddress,
    }
  }

  // add error
  ctx.addError = function (k, v) {
    if (!ctx.errors) {
      ctx.errors = []
    }
    let e = {}
    e[k] = v
    ctx.errors.push(e)
    return ctx
  }
  
  // get error
  ctx.getError = function(k) {
    if (!ctx.errors) {
      return;
    }
    var arr = ctx.errors;
    var obj;
    if(k){
      obj = arr.find((element)=>{
        return element.hasOwnProperty(k);
      });
    }
    // 没有找到k对应的obj,或者没有k,取得默认第一个
    if(!obj){
      obj = arr[0];
      k = Object.keys(obj)[0];
    }
    var name = k;
    var message = obj[k];
    return {
      name,
      message
    };
  };

  // dump json
  ctx.dumpJSON = function (...rest) {
    let status = 0
    let msg
    let data = null

    for (let i = 0; i < rest.length; i++) {
      let arg = rest[i]
      if (arg instanceof Error) {
        let err = arg
        status = err.status || err.statusCode || status
        continue
      }
      switch (typeof arg) {
        case 'string':
          msg = arg
          break
        case 'number':
          status = arg
          break
        case 'object':
          data = arg
          break
        default:
          break
      }
    }

    ctx.body = {
      status: status || 0,
      message: msg || 'success',
      data: data || null,
    }
    return ctx
  }
  return next()
}

exports.state = async(ctx, next) => {
  const session = ctx.session;
  
  // init state
  ctx.state = {
    isLogin: false,
    debug: config.debug,
    user: null,
    session: ctx.session,
    path: ctx.path
  };

  // user state
  if (session.isLogin) {
    ctx.state.isLogin = true;
    ctx.state.user = ctx.session.user;
  }
  await Promise.all([
    session.isLogin ? cache.get_state(session.user.id) : null
  ]).then(function(values) {
    ctx.state.userState = values[0];
    //logger.debug('getUserState:', values[1]);
  }, function(error) {
    //logger.debug('app.user.state', error);
  });
  
  return next();
}

// X-Response-Time
exports.XResponseTime = async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms}ms`)
}
