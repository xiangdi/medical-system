import { request, config } from 'utils'

export async function query (params) {
  let _url = '/api/forgot/check'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  let _url = '/api/forgot'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}
