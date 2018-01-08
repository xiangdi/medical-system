import { request, config } from 'utils'
import qs from 'qs'

module.exports = {
  query(params) {
    const _url = '/api/organization';

    return request({
      url: _url,
      method: 'post',
      data: qs.stringify(params),
    })
  },
}