const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: '首页',
    route: '/dashboard',
  },
  {
    id: '9',
    icon: 'team',
    name: '组织架构',
    route: '/organization',
  },
  {
    id: '2',
    bpid: '1',
    name: '客户管理',
    icon: 'user',
    route: '/user',
  },
  {
    id: '7',
    bpid: '1',
    name: '订单管理',
    icon: 'shopping-cart',
    route: '/order',
  },
  {
    id: '8',
    bpid: '1',
    name: '设置',
    icon: 'setting',
    route: '/setting',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
