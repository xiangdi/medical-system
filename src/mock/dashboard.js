import { color } from '../utils/theme'

const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

const Dashboard = Mock.mock({
  user: {
    name: 'zuiidea',
    email: 'zuiiidea@.gmail.com',
    sales: 3241,
    sold: 3556,
    avatar: 'http://tva4.sinaimg.cn/crop.0.0.996.996.180/6ee6a3a3jw8f0ks5pk7btj20ro0rodi0.jpg',
  },
})

module.exports = {
  [`GET ${apiPrefix}/dashboard`] (req, res) {
    res.json(Dashboard)
  },
}
