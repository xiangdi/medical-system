'use strict';

//const { log4js } = require('../lib/util');

var db = require('../lib/db');
var redis = db.redis;

exports.get_state= async(id) => {
  if ( !id ) {
    return null;
  }
  var key = 'EMP:'+id;
  var data = await redis.hgetall(key);
  return data;
};