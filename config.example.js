var path = require('path');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 8001;
var host = process.env.HOST || '0.0.0.0';

var DEBUG = (env !== 'production');
var global_locals_for_all_pages = {
  site_name: 'CRM管理系统',
  site_title: '',
  site_keywords: '',
  site_description: ''
};

// db 0:null , 1: cache, 2:web-sesion, 3:mgmt-session
var redisMaster = {
  host: '192.168.1.27',
  port: 6379,
  db: 11,
  options: {
    auth_pass: 'HoomSun1',
  },
};
var redisSession = {
  host: '192.168.1.27',
  port: 6379,
  db: 12,
  auth_pass: 'HoomSun1'
};

module.exports = {
  name: 'crm',
  keys: ['crm secret key'],
  host: host,
  port: port,
  debug: DEBUG,
  static: path.join(__dirname, 'public'),
  session: {
    key: 'sid',
    maxAge: 2 * 60 * 60 * 1000,
  },
  sessionStore: redisSession,
  redisMaster: redisMaster,
  bodyParser: {
    multipart: true
  },
  pug: {
    viewPath: './view',
    debug: false,
    pretty: DEBUG,
    compileDebug: DEBUG,
    locals: global_locals_for_all_pages,
    helperPath: [
      { 'UIHelper': path.resolve(__dirname, './util/helper.js') },
      { _: require('lodash') }
    ],
  },
  apiBase: 'http://192.168.1.27:8021'
};