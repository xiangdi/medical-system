/* global window */
import { config } from 'utils'
import * as forgotService from '../services/forgot'
import * as verifycodeService from '../services/verifycode'
import { message } from 'antd'

const { query, update } = forgotService
const { sendSmsCode, sendCaptcha } = verifycodeService

export default ({
  namespace: 'forgot',

  state: {
    currentStep: 0,
    count: 60,
    smsCodeText: '获取短信验证码',
    inputInfo: {},
    imgDataUri: '',
    disabled: false,
  },
  // 进来默认请求图片
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/forgot') {
          dispatch({
            type: 'initStep',
          })
          dispatch({
            type: 'sendCaptcha',
          })
        }
      })
    },
  },

  effects: {

    * checkIdentity ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data && !data.status) {
        yield put({
          type: 'changeStep',
          payload,
        })
        yield put({
          type: 'saveEmpInfo',
          payload,
        })
      }
    },

    * update ({ payload }, { select, call, put }) {
      const checkIdentityInfo = yield select(({ forgot }) => forgot.inputInfo)
      const completeInfo = { ...payload, ...(checkIdentityInfo.payload) }
      const data = yield call(update, completeInfo)
      if (data && !data.status) {
        yield put({
          type: 'changeStep',
          payload,
        })
      }
    },

    * sendCaptcha ({ payload = {} }, { call, put }) {
      const data = yield call(sendCaptcha)
      if (data) {
        yield put({
          type: 'changeImgDataUri',
          payload: {
            imgDataUri: data.data.base64,
          },
        })
      }
    },

    * sendSmsCode ({ payload = {} }, { call, put }) {
      // 触发禁用，
      payload.action = 'forgot'
      yield put({ type: 'disabledSendSmsCode' })
      // 倒计时结束触发启用
      const data = yield call(sendSmsCode, payload)
      // 成功失败的处理
      if (data && !!data.status) {
        message.error(data.message)
        yield put({
          type: 'sendCaptcha',
        })
      }
    },
  },

  reducers: {

    changeStep (state) {
      const currentStep = state.currentStep += 1
      return { ...state, currentStep }
    },

    initStep (state) {
      return {
        ...state,
        currentStep: 0,
      }
    },

    changeImgDataUri (state, { payload }) {
      return { ...state, ...payload }
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

    saveEmpInfo (state, action) {
      const inputInfo = action
      return { ...state, inputInfo }
    },
  },
})
