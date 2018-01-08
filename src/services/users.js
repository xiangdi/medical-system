import { request, config } from 'utils'
import axios from 'axios'
import qs from 'qs'

const { api, apiBase } = config

export async function query (params) {
  let _url = '/api/user'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

export async function fetch (params) {
  let _url = `/api/user/${params.id}`
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  let url = '/api/user/transaction'
  return request({
    url,
    method: 'post',
    data: params,
  })
}

export async function saleQuery (params) {
  let url = '/api/sale/list'
  return request({
    url,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  let url = '/api/sale/update'
  return request({
    url,
    method: 'post',
    data: params,
  })
}

export async function search (params) {
  let _url = '/api/user/search'
  return request({
    url: _url,
    method: 'post',
    data: params,
  })
}
