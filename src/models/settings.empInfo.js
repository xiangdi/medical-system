/* global window */
import { config } from 'utils'
import * as settingsService from '../services/settings'
import { message } from 'antd'

const { getEmpInfo, updateEmpInfo, mobile, password } = settingsService
const { prefix } = config

export default ({
  namespace: 'settingsEmpInfo',

  state: {
    empInfo: {},
    showModal: false,
    prevUrl: '/account/setting',
  },
  // 进来默认请求页面数据
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/account/setting/empInfo') {
          dispatch({
            type: 'getEmpInfo',
          })
        }
      })
    },
  },

  effects: {

    * getEmpInfo ({ payload = {} }, { call, put }) {
      const data = yield call(getEmpInfo, {})
      if (data.status == 0) {
        yield put({
          type: 'empDetail',
          payload: data.data,
        })
      }
    },

    * updateEmpInfo ({ payload = {} }, { call, put }) {
      try {
        const data = yield call(updateEmpInfo, payload)
        if (data.status !== 0) {
          message.error(data.message)
          return
        }
        yield put({
          type: 'updateShowModal',
          payload: { showModal: true },
        })
      } catch (err) {
        message.error(err)
      }
    },
  },

  reducers: {

    empDetail (state, action) {
      const empInfo = action.payload
      return { ...state, empInfo }
    },

    updateShowModal (state, action) {
      const showModal = action.payload.showModal
      return { ...state, showModal }
    },

    hideModal (state, action) {
      const showModal = false
      return { ...state, showModal }
    },
  },
})
