import { request, config } from 'utils'

export async function query (params) {
  let _url = '/api/menus'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}
