import { request, config } from 'utils'

const { api } = config
// const { userLogin } = api

export async function login (data) {
  let _url = '/api/login';
  return request({
    url: _url,
    method: 'post',
    data,
  })
}
