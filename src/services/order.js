import { request, config } from 'utils'
import qs from 'qs'

const { api } = config
const { order } = api

export async function query (params) {
  return request({
    url: '/api/order',
    method: 'post',
    data: params,
  })
}

export async function fetch (params) {

  return request({
    url: '/api/order/'+params.id,
    method: 'post',
    data: params,
  })
}

export async function download (params) {
  return request({
    url: '/api/order/derive',
    method: 'post',
    data: params,
  })
}
