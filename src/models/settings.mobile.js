/* global window */
import { config } from 'utils'
import * as settingsService from '../services/settings'
import * as verifycodeService from '../services/verifycode'
import { message } from 'antd'

const { mobile } = settingsService
const { sendSmsCode } = verifycodeService
const { prefix } = config

export default ({
  namespace: 'settingsMobile',

  state: {
    showModal: false,
    prevUrl: '/account/setting',
    count: 60,
    smsCodeText: '获取短信验证码',
    disabled: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/account/setting/empInfo') {

        }
      })
    },
  },

  effects: {

    * mobile ({ payload = {} }, { call, put }) {
      const data = yield call(mobile, payload)
      if (data && data.status == 0) {
        yield put({
          type: 'updateShowModal',
          payload: { showModal: true },
        })
      }
    },

    * sendSmsCode ({ payload }, { call, put }) {
      payload.action = 'setting'
      const { value, countDown } = payload

      // 倒计时结束触发启用
      const data = yield call(sendSmsCode, payload)
      if (data && data.status == 0) {
        yield put({ type: 'disabledSendSmsCode' })
        countDown()
      }
      // 失败的处理
      if (data && !!data.status) {
        message.error(data.message)
      }
    },
  },

  reducers: {

    updateShowModal (state, action) {
      const showModal = action.payload.showModal
      return { ...state, showModal }
    },

    hideModal (state, action) {
      const showModal = false
      return { ...state, showModal }
    },

    countdown (state) {
      let { count, smsCodeText, disabled } = state
      if (count <= 0) {
        count = 60
        smsCodeText = '获取短信验证码'
        disabled = !disabled
      } else {
        count--
        smsCodeText = `${count}s后再次获取`
      }

      return { ...state, count, smsCodeText, disabled }
    },

    disabledSendSmsCode (state, action) {
      const disabled = !state.disabled
      return { ...state, disabled }
    },
  },
})
