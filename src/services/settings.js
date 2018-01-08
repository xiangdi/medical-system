import { request, config } from 'utils'

export async function getEmpInfo (params) {
  let _url = '/api/account/setting'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

export async function updateEmpInfo (params) {
  let _url = '/api/account/setting/empInfo'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

export async function mobile (params) {
  let _url = '/api/account/setting/mobile'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

export async function password (params) {
  let _url = '/api/account/setting/password'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

