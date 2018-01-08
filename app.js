/**
 * app
 */
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const Koa = require('koa')

const staticServe = require('koa-static')
const bodyParser = require('koa-body')

const sessionStore = require('koa-session')
const redisStore = require('koa-redis')
const validate = require('koa-validate')

const router = require('./controller/index.js')
const middleware = require('./lib/middleware.js')
const service = require('./service/index.js')

const { config } = require('./lib/utils.js')

const { host, port } = config

const app = new Koa()

app.name = config.name
app.keys = config.keys
app.env = config.env
app.proxy = true

service(app)
// mount validate
validate(app)

// XResponseTime
app.use(middleware.XResponseTime)

// middleware
app.use(middleware.middleware)

// session
app.use(sessionStore(
  Object.assign({},
    config.session, { store: redisStore(config.sessionStore) }
  ),
  app
))

// body parser
app.use(bodyParser(config.bodyParser))

// init state
app.use(middleware.state)

router(app)
  .use(staticServe('./dist'))

if (!config.debug && cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  // master server start
  app.listen(port, host, () => {
    console.log(`[INFO] Server running on http://${host}:${port}`)
  })
}
