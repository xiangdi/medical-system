import { request, config } from 'utils'

const { api } = config
const { user, userLogout, userLogin } = api

export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  let _url = '/api/logout'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

export async function query (params) {
  let _url = '/api/user/info'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}
