// db
var redis = require('redis');
var coRedis = require('co-redis');

var utils = require('./utils');

var config = utils.config;
var redisMasterOpt = config.redisMaster;

// redisMaster for write (session other)
var redisMaster = redis.createClient(
      redisMasterOpt.port,
      redisMasterOpt.host,
      redisMasterOpt.options);
// swtich db
redisMaster.select(redisMasterOpt.db);

db.redisMaster = db.redis = coRedis(redisMaster);

// export
module.exports = db;

function db(){
  return async (ctx, next) => {
    // redis read
    // co-redis
    ctx.redis = ctx.redisSlave = db.redisMaster;

    await next();
  };
}