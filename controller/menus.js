

/**
 * menus
 * */
const debug = require('debug')('controller:menus')

exports.list = async (ctx, next) => {
  let database = [
    {
      id: '1',
      icon: 'laptop',
      name: '首页',
      route: '/dashboard',
    },
    {
      id: '2',
      icon: 'usergroup-add',
      name: '组织架构',
      route: '/organization',
    },
    {
      id: '3',
      name: '客户',
      icon: 'team',
    },
    {
      id: '31',
      mpid: '3',
      name: '客户管理',
      route: '/user',
    },
    {
      id: '32',
      mpid: '3',
      name: '客户查询',
      route: '/user/search',
    },
    {
      id: '33',
      mpid: '-1',
      bpid: '3',
      name: '客户异动',
      route: '/user/transaction',
    },
    {
      id: '34',
      mpid: '-1',
      bpid: '31',
      name: '客户详情',
      icon: 'user',
      route: '/user/detail/:id',
    },
    {
      id: '5',
      name: '订单管理',
      icon: 'file-text',
      route: '/order',
    },
    {
      id: '51',
      mpid: '-1',
      bpid: '5',
      name: '订单详情',
      route: '/order/:id',
    },
    {
      id: '6',
      name: '设置',
      icon: 'setting',
      route: '/account/setting',
    },
    {
      id: '61',
      mpid: '-1',
      bpid: '6',
      name: '个人信息修改',
      route: '/account/setting/empInfo',
    },
    {
      id: '62',
      mpid: '-1',
      bpid: '6',
      name: '修改手机号',
      route: '/account/setting/mobile',
    },
    {
      id: '63',
      mpid: '-1',
      bpid: '6',
      name: '修改密码',
      route: '/account/setting/password',
    },
  ]
  ctx.dumpJSON(database)
}
