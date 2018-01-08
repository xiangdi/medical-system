import { request, config } from 'utils'
import qs from 'qs'

const { api, apiBase } = config
const { dashboard } = api

module.exports = {
  query(params) {
    return request({
      url: dashboard,
      method: 'get',
      data: params,
    })
  },
  tradQuery(params) {
    const _url = '/api/dashboard/trad';
    return request({
      url: _url,
      method: 'post',
      data: qs.stringify(params),
    })
  },
}
