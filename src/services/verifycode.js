import { request, config } from 'utils'

export async function sendCaptcha (params) {
  let _url = '/api/captcha'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

export async function sendSmsCode (params) {
  let _url = '/api/verifycode/send'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

