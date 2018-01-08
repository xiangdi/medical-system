/* global window */
import { config } from 'utils'
import * as settingsService from '../services/settings'
import { message } from 'antd'
const { getEmpInfo, password } = settingsService

export default ({
  namespace: 'settingsPassword',

  state: {
    showModal: false,
    prevUrl: '/account/setting',
    name: '',
  },
  // 进来默认请求页面数据
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/account/setting/password') {
          dispatch({
            type: 'getEmpInfo',
          })
        }
      })
    },
  },

  effects: {

    * password ({ payload = {} }, { call, put }) {
      const data = yield call(password, payload)
      if (data && data.status == 0) {
        yield put({
          type: 'updateShowModal',
          payload: { showModal: true },
        })
      }
    },

    * getEmpInfo ({ payload = {} }, { call, put }) {
      const data = yield call(getEmpInfo, {})
      if (data.status == 0) {
        yield put({
          type: 'empDetail',
          payload: data.data.empDetail,
        })
      }
    },
  },

  reducers: {

    empDetail (state, action) {
      const name = action.payload.name
      return { ...state, name }
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
