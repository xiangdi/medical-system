/* global window */
import { config } from 'utils'
import * as settingsService from '../services/settings'
import { message } from 'antd';

const { getEmpInfo } = settingsService
const { prefix } = config

export default ({
  namespace: 'settings',

  state: {
    empInfo: {},
  },
  //进来默认请求页面数据
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/account/setting') {
          dispatch({
            type: 'getEmpInfo'
          })
        }
      })
    },
  },

  effects: {
  
    * getEmpInfo ({ payload = {} }, { call, put }) {
      const data = yield call(getEmpInfo, payload);
      if (data.status == 0) {
        yield put({
          type: 'empDetail',
          payload: data.data
        })
      }
    },
    
  },

  reducers: {
  
    empDetail (state, action) {
      const empInfo = action.payload;
      return { ...state, empInfo}
    },
  },
})
